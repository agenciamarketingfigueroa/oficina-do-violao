import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const target = (await (await fetch('http://127.0.0.1:9223/json/list')).json()).find((x) => x.type === 'page');
const ws = new WebSocket(target.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
ws.onmessage = ({ data }) => {
  const response = JSON.parse(data);
  if (!response.id) return;
  const request = pending.get(response.id);
  pending.delete(response.id);
  response.error ? request.reject(response.error) : request.resolve(response.result);
};
await new Promise((ok, fail) => { ws.onopen = ok; ws.onerror = fail; });
const call = (method, params = {}) => new Promise((ok, fail) => {
  const nextId = ++id;
  pending.set(nextId, { resolve: ok, reject: fail });
  ws.send(JSON.stringify({ id: nextId, method, params }));
});
const evaluate = async (expression) => (await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value;

await call('Emulation.setDeviceMetricsOverride', { width: 900, height: 900, deviceScaleFactor: 1, mobile: false });
await call('Page.navigate', { url: `file://${root}/ebook/index.html` });
await new Promise((ok) => setTimeout(ok, 1200));
const ebook = await evaluate(`(() => { const pages=[...document.querySelectorAll('.page')]; return {count:pages.length,overflow:pages.map((p,i)=>({page:i+1,extra:p.scrollHeight-p.clientHeight})).filter(x=>x.extra>2),missingImages:[...document.images].filter(x=>!x.complete||!x.naturalWidth).map(x=>x.src)} })()`);
await call('Runtime.evaluate', { expression: 'document.querySelector(".page[data-page=24]").scrollIntoView()' });
await new Promise((ok) => setTimeout(ok, 200));
let shot = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
writeFileSync('/private/tmp/sequencia-ebook.png', Buffer.from(shot.data, 'base64'));

await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await call('Page.navigate', { url: `file://${root}/index.html` });
await new Promise((ok) => setTimeout(ok, 1400));
await evaluate(`Promise.all([...document.images].filter(x=>x.loading!=='lazy').map(x=>x.decode().catch(()=>null)))`);
const mobile = await evaluate(`(() => { const r=s=>{const n=document.querySelector(s),b=n.getBoundingClientRect();return {top:b.top,bottom:b.bottom,width:b.width}};return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,headline:r('.hero h1'),mockup:r('.hero-art'),price:r('.hero-offer'),cta:r('.hero .cta'),whatsapp:document.querySelector('[data-whatsapp]').href,missingImages:[...document.images].filter(x=>x.loading!=='lazy'&&(!x.complete||!x.naturalWidth)).map(x=>x.src)} })()`);
shot = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
writeFileSync('/private/tmp/sequencia-mobile.png', Buffer.from(shot.data, 'base64'));
await call('Emulation.setDeviceMetricsOverride', { width: 1366, height: 900, deviceScaleFactor: 1, mobile: false });
await call('Page.navigate', { url: `file://${root}/index.html` });
await evaluate(`Promise.all([...document.images].filter(x=>x.loading!=='lazy').map(x=>x.decode().catch(()=>null)))`);
const desktop = await evaluate(`({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,missingImages:[...document.images].filter(x=>x.loading!=='lazy'&&(!x.complete||!x.naturalWidth)).map(x=>x.src)})`);
shot = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
writeFileSync('/private/tmp/sequencia-desktop.png', Buffer.from(shot.data, 'base64'));
console.log(JSON.stringify({ ebook, mobile, desktop }, null, 2));
ws.close();

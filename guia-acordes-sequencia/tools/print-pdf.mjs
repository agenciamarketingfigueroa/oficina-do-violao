import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const page = (await (await fetch('http://127.0.0.1:9223/json/list')).json()).find((x) => x.type === 'page');
if (!page) throw new Error('Chrome CDP não encontrado na porta 9223.');
const ws = new WebSocket(page.webSocketDebuggerUrl);
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
await call('Emulation.clearDeviceMetricsOverride');
await call('Page.navigate', { url: `file://${root}/ebook/index.html` });
await new Promise((ok) => setTimeout(ok, 2500));
const pages = await call('Runtime.evaluate', { expression: 'document.querySelectorAll(".page").length', returnByValue: true });
const result = await call('Page.printToPDF', { printBackground: true, preferCSSPageSize: true, displayHeaderFooter: false });
writeFileSync(`${root}/ebook/guia-acordes-sequencia.pdf`, Buffer.from(result.data, 'base64'));
console.log(`PDF salvo com ${pages.result.value} páginas HTML.`);
ws.close();

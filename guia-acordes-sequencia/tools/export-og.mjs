import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const target = (await (await fetch('http://127.0.0.1:9223/json/list')).json()).find((x) => x.type === 'page');
const ws = new WebSocket(target.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
ws.onmessage = ({ data }) => {
  const reply = JSON.parse(data);
  if (!reply.id) return;
  const request = pending.get(reply.id);
  pending.delete(reply.id);
  reply.error ? request.reject(reply.error) : request.resolve(reply.result);
};
await new Promise((ok, fail) => { ws.onopen = ok; ws.onerror = fail; });
const call = (method, params = {}) => new Promise((ok, fail) => {
  const nextId = ++id;
  pending.set(nextId, { resolve: ok, reject: fail });
  ws.send(JSON.stringify({ id: nextId, method, params }));
});
await call('Emulation.setDeviceMetricsOverride', { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
await call('Page.navigate', { url: `file://${root}/assets/og-guia.svg` });
await new Promise((ok) => setTimeout(ok, 900));
const shot = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
writeFileSync(`${root}/assets/og-guia.png`, Buffer.from(shot.data, 'base64'));
console.log('Criado assets/og-guia.png (1200 × 630).');
ws.close();

const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const http = require('node:http');
const { createRequire } = require('node:module');
let chromium;
try { ({ chromium } = require('playwright-core')); }
catch { ({ chromium } = createRequire(process.execPath)('playwright-core')); }

const root = path.resolve(__dirname, '../..');
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp' };
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = path.resolve(root, '.' + pathname);
    if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403).end(); return; }
    if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html');
    res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
    res.end(await fs.readFile(file));
  } catch { res.writeHead(404).end(); }
});

(async () => {
  assert.equal(await fs.readFile(path.join(root, 'de-ferias/index.html'), 'utf8'), await fs.readFile(path.join(root, 'de-ferias-com-o-violao/quiz/index.html'), 'utf8'), 'Manter as entradas sincronizadas');
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = 'http://127.0.0.1:' + server.address().port;
  const query = '?utm_source=instagram&utm_medium=paid_social&utm_campaign=teste_quiz&utm_content=video_1&utm_term=violao&sck=quiz%7Cvideo_1&src=anuncio&fbclid=qa-test';
  let browser;
  try {
    browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
    for (const [name, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844], ['small-mobile', 320, 640]]) {
      const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: name === 'mobile' ? 'reduce' : 'no-preference' });
      await context.route(/https:\/\/(connect|www)\.facebook\.net\/|https:\/\/www\.facebook\.com\//, route => route.abort());
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('response', response => { if (response.url().startsWith(origin) && response.status() >= 400) errors.push(response.status() + ' ' + response.url()); });
      const ids = ['nivel', 'dificuldade', 'frustracao', 'objetivo', 'video', 'suporte', 'grupo', 'preco'];
      const waitAt = id => page.waitForFunction(expected => document.querySelector('[data-quiz]').dataset.question === expected && !document.querySelector('[data-options] button').disabled, id);
      const choose = async (answer, next) => {
        await page.locator('[data-answer="' + answer + '"]').click();
        if (next) await waitAt(next);
        else await page.locator('[data-offer]').waitFor({ state: 'visible' });
      };
      // Ambos os endereços entregam o quiz, sem outra navegação de documento.
      for (const route of ['/de-ferias/', '/de-ferias-com-o-violao/quiz/']) {
        const navigations = [];
        const onRequest = request => { if (request.isNavigationRequest()) navigations.push(request.url()); };
        page.on('request', onRequest);
        await page.goto(origin + route + query + '#inscricao');
        await waitAt('nivel');
        assert.equal(page.url(), origin + route + query + '#inscricao');
        assert.equal(navigations.length, 1);
        assert.equal(await page.locator('meta[http-equiv="refresh"]').count(), 0);
        page.off('request', onRequest);
      }
      await page.goto(origin + '/de-ferias/' + query);
      await page.evaluate(() => document.fonts.ready);
      await waitAt('nivel');
      assert.equal(await page.locator('[data-offer]').isVisible(), false);
      assert.match(await page.locator('[data-question-title]').innerText(), /Antes de começarmos, quero te conhecer um pouco melhor\.[\s\S]*Em qual nível você está no violão\?/);
      assert.equal(await page.locator('[data-options] button').count(), 4);
      const snapshots = [];
      const checkQuestion = async (index) => {
        assert.equal(await page.locator('[data-quiz]').getAttribute('data-question'), ids[index]);
        assert.equal(await page.locator('[data-progress]').getAttribute('aria-valuenow'), String(index));
        assert.equal(await page.locator('[data-offer]').isVisible(), false);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
        const lastOption = await page.locator('[data-options] button').last().boundingBox();
        assert.ok(lastOption.y + lastOption.height <= height, 'Todas as respostas devem caber na tela: ' + ids[index] + ' / ' + name);
        return page.locator('[data-question-area]').innerText();
      };
      snapshots.push(await checkQuestion(0));
      await page.screenshot({ path: path.join(__dirname, 'qa-quiz-' + name + '.png'), fullPage: true });
      await page.locator('[data-answer="zero"]').dblclick({ delay: 35 });
      await waitAt('dificuldade');
      snapshots.push(await checkQuestion(1));
      await choose('dedos', 'frustracao');
      // Voltar conserva a escolha e não duplica a resposta por clique rápido.
      await page.locator('[data-back]').click();
      await waitAt('dificuldade');
      assert.equal(await page.locator('[data-answer="dedos"]').getAttribute('aria-pressed'), 'true');
      await choose('dedos', 'frustracao');
      snapshots.push(await checkQuestion(2));
      await choose('soltos', 'objetivo');
      snapshots.push(await checkQuestion(3));
      await page.locator('[data-answer="musica"]').focus();
      await page.keyboard.press('Space');
      await waitAt('video');
      snapshots.push(await checkQuestion(4));
      assert.equal(await page.locator('[data-question-title]').innerText(), 'Aprender através de aulas em vídeo te ajudaria?');
      assert.equal(await page.locator('[data-video-mockup]').isVisible(), true);
      assert.match(await page.locator('[data-video-mockup] figcaption').innerText(), /Mais de 27 aulas em vídeo/);
      assert.equal(await page.locator('[data-feature]').count(), 0);
      assert.equal(await page.locator('[data-answer="sim"]').innerText(), 'Quero acessar as 27 aulas de violão\n→');
      await page.screenshot({ path: path.join(__dirname, 'qa-quiz-feature-' + name + '.png'), fullPage: true });
      await choose('ao-vivo', 'suporte');
      assert.equal(await page.locator('[data-video-mockup]').isVisible(), false);
      snapshots.push(await checkQuestion(5));
      assert.equal(await page.locator('[data-chat-mockup="suporte"]').isVisible(), true);
      assert.match(await page.locator('[data-chat-mockup="suporte"] figcaption').innerText(), /Suporte direto com o professor[\s\S]*WhatsApp/);
      await page.screenshot({ path: path.join(__dirname, 'qa-quiz-support-' + name + '.png'), fullPage: true });
      await choose('sim', 'grupo');
      snapshots.push(await checkQuestion(6));
      assert.equal(await page.locator('[data-chat-mockup="suporte"]').isVisible(), false);
      assert.equal(await page.locator('[data-chat-mockup="grupo"]').isVisible(), true);
      await page.screenshot({ path: path.join(__dirname, 'qa-quiz-group-' + name + '.png'), fullPage: true });
      await choose('participar', 'preco');
      snapshots.push(await checkQuestion(7));
      assert.equal(await page.locator('[data-chat-mockup="grupo"]').isVisible(), false);
      assert.equal(await page.locator('[data-quiz-price]').isVisible(), true);
      assert.equal(await page.locator('[data-quiz-price] [data-original-price]').innerText(), 'R$ 147');
      assert.equal(await page.locator('[data-quiz-price] [data-price]').innerText(), 'R$ 47');
      await page.screenshot({ path: path.join(__dirname, 'qa-quiz-price-' + name + '.png'), fullPage: true });
      await choose('comecar');
      assert.equal(await page.locator('[data-quiz]').isVisible(), false);
      assert.equal(await page.locator('[data-live-note]').isVisible(), true);
      assert.match(await page.locator('[data-result-copy]').innerText(), /movimentos/);
      assert.equal(await page.locator('[data-offer] [data-price]').first().innerText(), 'R$ 47');
      assert.equal(await page.locator('[data-offer] [data-original-price]').innerText(), 'R$ 147');
      assert.equal(await page.locator('.quiz-limited').innerText(), 'Oferta por tempo limitado');
      const price = await page.locator('[data-offer] [data-price]').first().boundingBox();
      assert.ok(price.y > 0 && price.y + price.height < height);
      for (const href of await page.locator('[data-checkout]').evaluateAll(links => links.map(link => link.href))) {
        const checkout = new URL(href);
        assert.equal(checkout.host, 'pay.hotmart.com');
        assert.equal(checkout.searchParams.get('off'), 'rxe4p9o9');
        assert.equal(checkout.searchParams.get('checkoutMode'), '10');
        for (const [key, value] of new URLSearchParams(query)) assert.equal(checkout.searchParams.get(key), value);
      }
      await page.locator('.vac-teacher img').scrollIntoViewIfNeeded();
      await page.waitForFunction(() => document.querySelector('.vac-teacher img').naturalWidth > 0);
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.screenshot({ path: path.join(__dirname, 'qa-quiz-offer-' + name + '.png'), fullPage: false });
      await page.locator('[data-checkout]').first().evaluate(link => link.addEventListener('click', event => event.preventDefault()));
      await page.locator('[data-checkout]').first().click();
      // Respostas diferentes mantêm as mesmas perguntas, textos e ordem.
      await page.locator('[data-review]').click();
      await waitAt('nivel');
      const alternate = ['musicas', 'ajuda', 'nenhum', 'lazer', 'repetir', 'sozinho', 'individual', 'detalhes'];
      for (let index = 0; index < ids.length; index++) {
        const copy = await checkQuestion(index);
        // Marcadores de seleção são a única diferença visual permitida.
        assert.equal(copy.replaceAll('✓', '→'), snapshots[index].replaceAll('✓', '→'));
        await choose(alternate[index], ids[index + 1]);
      }
      assert.equal(await page.locator('[data-live-note]').isVisible(), false);
      assert.equal(await page.locator('[data-level-note]').isVisible(), true);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      const events = await page.evaluate(() => window.fbq.queue.map(args => Array.from(args)));
      assert.equal(events.filter(item => item[0] === 'init' && item[1] === '306814880237849').length, 1);
      for (const event of ['PageView', 'QuizStart', 'QuizComplete', 'ViewContent', 'InitiateCheckout']) {
        assert.equal(events.filter(item => item[1] === event).length, 1, event + ' sem duplicação');
      }
      assert.deepEqual(errors, []);
      console.log(JSON.stringify({ viewport: name, questions: 8, fixedSequence: true, directEntry: true, answersAboveFold: true, keyboard: true, tracking: 'UTM/SCK/fbclid preservados', errors }));
      await context.close();
    }
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });

const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const http = require('node:http');
let chromium;
try { ({ chromium } = require('playwright-core')); }
catch { ({ chromium } = require('C:/Users/Felipe/AppData/Local/OpenAI/Codex/runtimes/cua_node/45309f9050f7314b/bin/node_modules/playwright-core')); }

const root = path.resolve(__dirname, '../..');
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp' };
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = path.resolve(root, `.${pathname}`);
    if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403).end(); return; }
    if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html');
    res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
    res.end(await fs.readFile(file));
  } catch { res.writeHead(404).end(); }
});

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  let browser;
  try {
    browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
    for (const [name, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844], ['small-mobile', 320, 740]]) {
      const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: name === 'mobile' ? 'reduce' : 'no-preference' });
      // QA registra a fila do pixel sem enviar visitas ou conversões de teste à Meta.
      await context.route(/https:\/\/(connect|www)\.facebook\.net\/|https:\/\/www\.facebook\.com\//, route => route.abort());
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      const query = '?utm_source=instagram&utm_medium=paid_social&utm_campaign=teste_quiz&utm_content=video_1&utm_term=violao&sck=quiz%7Cvideo_1&src=anuncio';
      if (name === 'desktop') {
        for (const [shortPath, destination] of [
          ['/de-ferias/', '/de-ferias-com-o-violao/quiz/'],
          ['/de-ferias-v2/', '/de-ferias-com-o-violao/'],
        ]) {
          await page.goto(`${origin}${shortPath}${query}#inscricao`);
          await page.waitForURL(url => url.pathname === destination);
          const redirected = new URL(page.url());
          assert.equal(redirected.pathname, destination);
          assert.equal(redirected.search, query);
          assert.equal(redirected.hash, '#inscricao');
        }
      }
      await page.goto(`${origin}/de-ferias-com-o-violao/quiz/${query}`);
      await page.evaluate(() => document.fonts.ready);
      const questionIds = ['nivel', 'dificuldade', 'objetivo', 'video', 'suporte', 'grupo'];
      const waitAt = step => page.waitForFunction(expected => document.querySelector('[data-quiz]').dataset.question === expected && !document.querySelector('[data-options] button').disabled, questionIds[step - 1]);
      const choose = async (answer, nextStep) => {
        await page.locator(`[data-answer="${answer}"]`).click();
        if (nextStep) await waitAt(nextStep);
        else await page.locator('[data-offer]').waitFor({ state: 'visible' });
      };
      assert.equal(await page.locator('[data-offer]').isVisible(), false);
      assert.equal(await page.locator('[data-question-title]').innerText(), 'Como está seu aprendizado no violão hoje?');
      assert.equal(await page.locator('[role="progressbar"], [data-step], [data-progress], .quiz-intro').count(), 0);
      assert.equal(await page.locator('[data-options] button').count(), 3);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      await page.screenshot({ path: path.join(__dirname, `qa-quiz-${name}.png`), fullPage: true });
      // Um clique duplo não pode responder também à próxima pergunta.
      await page.locator('[data-answer="zero"]').dblclick({ delay: 35 });
      await waitAt(2);
      assert.match(await page.locator('[data-question-help]').innerText(), /Começar do zero/);
      await choose('dedos', 3);
      assert.match(await page.locator('[data-question-help]').innerText(), /movimentos ainda estão se encaixando/);
      await page.locator('[data-back]').click();
      await waitAt(2);
      assert.equal(await page.locator('[data-answer="dedos"]').getAttribute('aria-pressed'), 'true');
      await page.locator('[data-back]').click();
      await waitAt(1);
      assert.equal(await page.locator('[data-answer="zero"]').getAttribute('aria-pressed'), 'true');
      await choose('zero', 2);
      await choose('dedos', 3);
      await page.locator('[data-answer="musica"]').focus();
      await page.keyboard.press('Space');
      await waitAt(4);
      assert.match(await page.locator('[data-question-help]').innerText(), /De Férias com o Violão tem 27 aulas gravadas em vídeo/);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      await page.screenshot({ path: path.join(__dirname, `qa-quiz-feature-${name}.png`), fullPage: true });
      await choose('ao-vivo', 5);
      assert.match(await page.locator('[data-question-help]').innerText(), /suporte do professor/);
      await choose('sim', 6);
      assert.match(await page.locator('[data-question-help]').innerText(), /grupo de alunos/);
      assert.equal(await page.locator('[data-offer]').isVisible(), false);
      await choose('participar');
      assert.equal(await page.locator('[data-quiz]').isVisible(), false);
      assert.equal(await page.locator('[data-offer]').isVisible(), true);
      assert.equal(await page.locator('[data-live-note]').isVisible(), true);
      assert.match(await page.locator('[data-result-copy]').innerText(), /movimentos/);
      assert.match(await page.locator('[data-result-title]').innerText(), /do zero/);
      assert.match(await page.locator('[data-offer] > section').first().getAttribute('class'), /quiz-offer/);
      assert.equal(await page.locator('[data-price]').first().innerText(), 'R$ 47');
      const price = await page.locator('[data-price]').first().boundingBox();
      assert.ok(price.y > 0 && price.y + price.height < height, 'Preço deve aparecer sem rolagem');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'Sem rolagem horizontal');
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
      await page.screenshot({ path: path.join(__dirname, `qa-quiz-offer-${name}.png`), fullPage: false });
      await page.locator('[data-checkout]').first().evaluate(link => link.addEventListener('click', event => event.preventDefault()));
      await page.locator('[data-checkout]').first().click();
      await page.locator('[data-review]').click();
      await waitAt(1);
      for (let step = 0; step < 6; step += 1) {
        await page.locator('[data-options] button[aria-pressed="true"]').click();
        if (step < 5) await waitAt(step + 2);
        else await page.locator('[data-offer]').waitFor({ state: 'visible' });
      }
      const events = await page.evaluate(() => window.fbq.queue.map(args => Array.from(args)));
      assert.equal(events.filter(item => item[0] === 'init' && item[1] === '306814880237849').length, 1);
      for (const event of ['PageView', 'QuizStart', 'QuizComplete', 'ViewContent', 'InitiateCheckout']) {
        assert.equal(events.filter(item => item[1] === event).length, 1, `${event} sem duplicação ao rever respostas`);
      }
      assert.deepEqual(errors, []);
      console.log(JSON.stringify({ viewport: name, questions: 6, autoAdvance: true, keyboard: true, doubleClickGuard: true, reducedMotion: name === 'mobile', priceAboveFold: true, tracking: 'UTM/SCK preservados', pixelEvents: events.map(item => item[1]), errors }));
      await context.close();
    }
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });

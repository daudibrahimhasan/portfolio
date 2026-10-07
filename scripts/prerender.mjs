import { chromium } from 'playwright';
import { readFile, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const port = 4174;
const server = spawn(process.execPath, ['server.mjs'], {
  cwd: root, env: { ...process.env, PORT: String(port) }, stdio: 'pipe'
});
let browser;
try {
  await new Promise((ok, fail) => {
    server.stdout.once('data', ok);
    server.once('error', fail);
    server.once('exit', code => fail(new Error('Preview server exited: ' + code)));
  });
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  for (const route of ['', 'engineer/', 'researcher/']) {
    const file = resolve(root, route, 'index.html');
    let source = await readFile(file, 'utf8');
    await page.goto('http://127.0.0.1:' + port + '/' + route, { waitUntil: 'networkidle' });
    await page.waitForSelector('#dc-root h1', { timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    const snapshot = await page.evaluate(() => {
      const clone = document.querySelector('#dc-root').cloneNode(true);
      clone.removeAttribute('id');
      clone.querySelectorAll('script, iframe, audio, video').forEach(el => el.remove());
      clone.querySelectorAll('*').forEach(el => {
        for (const attr of [...el.attributes]) {
          if (/^on/i.test(attr.name)) el.removeAttribute(attr.name);
        }
      });
      const css = [...document.head.querySelectorAll('style')].map(el => el.outerHTML).join('');
      return (css + clone.outerHTML).replace(/[ \t]+$/gm, '');
    });
    if (!snapshot.includes('Daud') || snapshot.includes('{{')) {
      throw new Error('Incomplete pre-render for ' + route);
    }
    source = source.replace(/<!-- prerender:start -->[\s\S]*?<!-- prerender:end -->\s*/g, '');
    source = source.replace(/<noscript>[\s\S]*?<\/noscript>/g, '');
    source = source.replace('<body>', '<body>\n<!-- prerender:start -->\n<div id="prerender-content">' + snapshot + '</div>\n<!-- prerender:end -->');
    await writeFile(file, source);
    console.log('Pre-rendered /' + route);
  }
} finally {
  await browser?.close();
  server.kill();
}

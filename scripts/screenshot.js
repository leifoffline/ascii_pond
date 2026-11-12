// Usage: node scripts/screenshot.js [file=index.html] [out=shot.png] [width=1440] [height=900] [waitMs=4000]
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const [file='index.html', out='shot.png', w='1440', h='900', wait='4000'] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width:+w, height:+h }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('file://' + path.resolve(file) + '#fixed');
  await page.waitForTimeout(+wait);
  await page.screenshot({ path: out });
  await browser.close();
  console.log(errors.length ? 'Page errors:\n' + errors.join('\n') : 'No page errors');
  console.log('Saved', out);
})();

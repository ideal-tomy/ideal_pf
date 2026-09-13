import {chromium} from 'playwright';
import assert from 'node:assert/strict';

const b = await chromium.launch({headless: true, channel: 'msedge'});
try {
  const p = await b.newPage({viewport: {width: 390, height: 844}});
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://127.0.0.1:4173/?view=all');
  await p.waitForTimeout(400);
  const m = await p.locator('.catalog-card').first().evaluate(e => {
    const a = e.querySelector('.catalog-art');
    const body = e.querySelector('.catalog-card-body');
    const img = e.querySelector('img');
    const cs = getComputedStyle(body);
    const ratios = [...document.querySelectorAll('.catalog-card')].slice(0, 8).map(card => {
      const h = card.getBoundingClientRect().height;
      const bh = card.querySelector('.catalog-card-body').getBoundingClientRect().height;
      return bh / h;
    });
    return {
      card: e.getBoundingClientRect().height,
      art: a.getBoundingClientRect().height,
      body: body.getBoundingClientRect().height,
      bodyPos: cs.position,
      bodyZ: cs.zIndex,
      backdrop: cs.backdropFilter || cs.webkitBackdropFilter,
      borderTop: cs.borderTopWidth,
      padTop: parseFloat(cs.paddingTop),
      img: img.getBoundingClientRect().height,
      ratio: body.getBoundingClientRect().height / e.getBoundingClientRect().height,
      ratios
    };
  });
  assert.equal(await p.locator('.catalog-card').count(), 28);
  assert.equal(await p.locator('.catalog-status').count(), 0);
  assert.equal(m.card, m.art);
  assert.equal(m.bodyPos, 'absolute');
  assert(m.bodyZ === '2');
  assert(String(m.backdrop).includes('blur'));
  assert(parseFloat(m.borderTop) > 0);
  assert(m.padTop <= 18);
  assert(m.ratio > 0.27 && m.ratio < 0.33, JSON.stringify(m));
  assert(m.ratios.every(r => Math.abs(r - m.ratio) < 0.01), JSON.stringify(m));
  assert.deepEqual(errs, []);
  await p.screenshot({path: 'docs/catalog-review/catalog-overlay-390.png'});
  await p.setViewportSize({width: 1280, height: 844});
  await p.goto('http://127.0.0.1:4173/?view=all');
  await p.waitForTimeout(300);
  await p.screenshot({path: 'docs/catalog-review/catalog-overlay-1280.png'});
  console.log(m);
} finally {
  await b.close();
}

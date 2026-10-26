'use strict';
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

(async function () {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:8765/index.html#portfolio', { waitUntil: 'domcontentloaded' });
    const expected = ['Floristería Magno', 'Dra. Yerena Riso', 'Misión Jardines'];

    for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
      await page.setViewportSize(viewport);
      const cards = page.locator('#portfolio .project-card');
      assert.equal(await cards.count(), expected.length, 'Deben existir las tres tarjetas.');

      for (let i = 0; i < expected.length; i++) {
        const card = cards.nth(i);
        await card.scrollIntoViewIfNeeded();
        const read = () => card.evaluate(element => {
          const info = element.querySelector('.portfolio-info');
          const visual = element.querySelector('.project-visual');
          const heading = info.querySelector('h3');
          const description = info.querySelector('p');
          const link = info.querySelector('.project-link');
          const detail = info.querySelector('[data-project-details]');
          const css = getComputedStyle(info);
          const infoBox = info.getBoundingClientRect();
          const imageBox = visual.getBoundingClientRect();
          return {
            heading: heading.textContent.trim(),
            description: description.textContent.trim(),
            opacity: css.opacity, visibility: css.visibility, position: css.position,
            bottom: css.bottom, transform: css.transform,
            belowImage: infoBox.top >= imageBox.bottom - 4,
            infoHeight: infoBox.height, linkWidth: link.getBoundingClientRect().width,
            detailWidth: detail.getBoundingClientRect().width,
            display: css.display
          };
        });

        // No hover: all information must be visible, not positioned off-canvas.
        await page.mouse.move(0, 0);
        let state = await read();
        assert.equal(state.heading, expected[i]);
        assert(state.description.length > 15, state.heading + ': sin descripción');
        assert.equal(state.opacity, '1', state.heading + ': invisible sin hover');
        assert.equal(state.visibility, 'visible');
        assert.equal(state.position, 'relative');
        assert.equal(state.bottom, 'auto');
        assert(state.belowImage, state.heading + ': texto superpuesto a la imagen');
        assert(state.infoHeight > 170, state.heading + ': tarjeta colapsada');
        assert(state.linkWidth > 30 && state.detailWidth > 30, state.heading + ': acciones ocultas');

        // On hover the old overlay animation must NOT return.
        await card.hover();
        state = await read();
        assert.equal(state.opacity, '1');
        assert.equal(state.position, 'relative');
        assert.equal(state.bottom, 'auto');
        assert(state.belowImage, state.heading + ': cambia a overlay con hover');
      }
      console.log('PASS', viewport.width, 'px — three always-visible cards');
    }
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });

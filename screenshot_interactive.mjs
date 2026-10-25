import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    // Dark mode desktop
    console.log('Taking dark mode desktop screenshot...');
    const page1 = await browser.newPage();
    await page1.setViewport({ width: 1280, height: 800 });
    await page1.goto('https://mahmoudnaoum.github.io/', { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page1.click('button');
    await new Promise(resolve => setTimeout(resolve, 500));
    await page1.screenshot({ path: '/opt/cursor/artifacts/screenshots/live-desktop-dark.png' });
    await page1.close();
    console.log('Dark mode desktop done');

    // Case study dialog
    console.log('Taking case study screenshot...');
    const page2 = await browser.newPage();
    await page2.setViewport({ width: 1280, height: 800 });
    await page2.goto('https://mahmoudnaoum.github.io/', { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 1000));
    const cards = await page2.$$('div[class*="rounded-lg"]');
    if (cards.length > 2) {
      await cards[2].click();
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    await page2.screenshot({ path: '/opt/cursor/artifacts/screenshots/live-case-study.png' });
    await page2.close();
    console.log('Case study done');

    // Dark mode mobile
    console.log('Taking dark mode mobile screenshot...');
    const page3 = await browser.newPage();
    await page3.setViewport({ width: 390, height: 844 });
    await page3.goto('https://mahmoudnaoum.github.io/', { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page3.click('button');
    await new Promise(resolve => setTimeout(resolve, 500));
    await page3.screenshot({ path: '/opt/cursor/artifacts/screenshots/live-mobile-dark.png' });
    await page3.close();
    console.log('Dark mode mobile done');

    console.log('All screenshots saved!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();

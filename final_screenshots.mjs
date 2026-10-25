import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    // Desktop - Full page
    console.log('Taking desktop screenshot (1280x800)...');
    const page1 = await browser.newPage();
    await page1.setViewport({ width: 1280, height: 800 });
    await page1.goto('https://mahmoudnaoum.github.io/', { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(resolve => setTimeout(resolve, 2000));
    await page1.screenshot({ path: '/opt/cursor/artifacts/screenshots/final-desktop.png', fullPage: false });
    await page1.close();
    console.log('Desktop done');

    // Mobile
    console.log('Taking mobile screenshot (390x844)...');
    const page2 = await browser.newPage();
    await page2.setViewport({ width: 390, height: 844 });
    await page2.goto('https://mahmoudnaoum.github.io/', { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(resolve => setTimeout(resolve, 2000));
    await page2.screenshot({ path: '/opt/cursor/artifacts/screenshots/final-mobile.png', fullPage: false });
    await page2.close();
    console.log('Mobile done');

    // Desktop scrolled to pricing
    console.log('Taking desktop pricing section...');
    const page3 = await browser.newPage();
    await page3.setViewport({ width: 1280, height: 800 });
    await page3.goto('https://mahmoudnaoum.github.io/', { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(resolve => setTimeout(resolve, 2000));
    await page3.evaluate(() => {
      document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' });
    });
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page3.screenshot({ path: '/opt/cursor/artifacts/screenshots/final-desktop-pricing.png' });
    await page3.close();
    console.log('Pricing done');

    console.log('All screenshots saved!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();

import { chromium } from "playwright";

async function test() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const logs = [];
  page.on("console", (msg) => logs.push({ type: msg.type(), text: msg.text() }));
  page.on("pageerror", (err) => logs.push({ type: "pageerror", text: err.message, stack: err.stack }));

  console.log("Navigating to /admin ...");
  await page.goto("http://127.0.0.1:3000/admin", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);

  console.log("Clicking Super Admin card...");
  await page.locator('div:has-text("Full system control")').last().click();
  await page.waitForTimeout(2000);

  console.log("URL after click:", page.url());
  console.log("Body text after click:\n", (await page.innerText("body")).slice(0, 600));

  console.log("Errors in logs:", logs.filter(l => l.type === 'error' || l.type === 'pageerror'));
  await page.screenshot({ path: "screenshots/test-card-click.png" });
  await browser.close();
}

test().catch(console.error);

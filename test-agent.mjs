import { chromium } from "playwright";

async function test() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const logs = [];
  page.on("console", (msg) => logs.push({ type: msg.type(), text: msg.text() }));
  page.on("pageerror", (err) => logs.push({ type: "pageerror", text: err.message, stack: err.stack }));

  console.log("Navigating to http://127.0.0.1:3000/admin ...");
  await page.goto("http://127.0.0.1:3000/admin", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);

  console.log("Clicking Agent card...");
  await page.locator('div:has-text("Work the leads assigned to you")').last().click();
  await page.waitForTimeout(3000);

  console.log("URL:", page.url());
  const text = await page.innerText("body");
  console.log("Body text snippet:\n", text.slice(0, 500));
  console.log("Is empty?", text.trim().length === 0);

  console.log("Page errors:", logs.filter(l => l.type === 'pageerror'));
  await page.screenshot({ path: "screenshots/test-agent.png" });
  await browser.close();
}

test().catch(console.error);

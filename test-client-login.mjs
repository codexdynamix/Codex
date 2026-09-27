import { chromium } from "playwright";

async function test() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const logs = [];
  page.on("console", (msg) => logs.push({ type: msg.type(), text: msg.text() }));
  page.on("pageerror", (err) => logs.push({ type: "pageerror", text: err.message, stack: err.stack }));

  console.log("Navigating to http://127.0.0.1:3000/login ...");
  await page.goto("http://127.0.0.1:3000/login", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);
  console.log("URL:", page.url());
  console.log("Login page text snippet:\n", (await page.innerText("body")).slice(0, 300));

  console.log("Clicking Sign in button...");
  await page.click("button[type='submit']");
  await page.waitForTimeout(3000);

  console.log("URL after Sign in:", page.url());
  const bodyText = await page.innerText("body");
  console.log("Body text on destination:\n", bodyText.slice(0, 500));
  console.log("Is body empty / blank?", bodyText.trim().length === 0);

  console.log("Page errors:", logs.filter(l => l.type === 'pageerror'));
  console.log("Console errors:", logs.filter(l => l.type === 'error'));
  await page.screenshot({ path: "screenshots/test-client-login.png" });
  await browser.close();
}

test().catch(console.error);

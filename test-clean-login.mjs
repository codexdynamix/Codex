import { chromium } from "playwright";

async function test() {
  const browser = await chromium.launch();
  const context = await browser.newContext(); // fresh session, no storage
  const page = await context.newPage();
  const logs = [];
  page.on("console", (msg) => logs.push({ type: msg.type(), text: msg.text() }));
  page.on("pageerror", (err) => logs.push({ type: "pageerror", text: err.message, stack: err.stack }));

  console.log("1. Navigating to /admin with clean storage...");
  await page.goto("http://127.0.0.1:3000/admin", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);

  console.log("2. Clicking Super Admin portal card...");
  await page.locator('div:has-text("Full system control")').last().click();
  await page.waitForTimeout(2000);

  console.log("URL after clicking Super Admin card:", page.url());
  const bodyText1 = await page.innerText("body");
  console.log("Body text snippet:\n", bodyText1.slice(0, 300));

  console.log("3. Looking for login form / button...");
  const signInBtn = await page.$("button[type='submit']");
  if (signInBtn) {
    console.log("Found submit button text:", await signInBtn.innerText());
    console.log("Clicking submit button...");
    await signInBtn.click();
    await page.waitForTimeout(3000);
    console.log("URL after clicking login:", page.url());
    const bodyText2 = await page.innerText("body");
    console.log("Body text after login:\n", bodyText2.slice(0, 500));
    console.log("Is body empty / blank?", bodyText2.trim().length === 0);
  } else {
    console.log("No submit button found!");
  }

  console.log("Page errors:", logs.filter(l => l.type === 'pageerror'));
  console.log("Console errors:", logs.filter(l => l.type === 'error'));
  await page.screenshot({ path: "screenshots/clean-login.png" });
  await browser.close();
}

test().catch(console.error);

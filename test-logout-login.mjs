import { chromium } from "playwright";

async function test() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const logs = [];
  page.on("console", (msg) => logs.push({ type: msg.type(), text: msg.text() }));
  page.on("pageerror", (err) => logs.push({ type: "pageerror", text: err.message, stack: err.stack }));

  console.log("1. Navigating to /admin ...");
  await page.goto("http://127.0.0.1:3000/admin", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);

  console.log("2. Clicking Super Admin card...");
  await page.locator('div:has-text("Full system control")').last().click();
  await page.waitForTimeout(2000);
  console.log("Current URL:", page.url());

  console.log("3. Clicking Logout...");
  const logoutBtn = await page.$("button:has-text('Logout')");
  if (logoutBtn) {
    await logoutBtn.click();
    await page.waitForTimeout(2000);
    console.log("After logout, URL:", page.url());
    console.log("Body text snippet:\n", (await page.innerText("body")).slice(0, 400));
  } else {
    console.log("Logout button not found!");
  }

  console.log("4. Now looking for Sign In / Login button...");
  const signInBtn = await page.$("button[type='submit']");
  if (signInBtn) {
    console.log("Found submit button, text:", await signInBtn.innerText());
    console.log("Clicking Sign In...");
    await signInBtn.click();
    await page.waitForTimeout(3000);
    console.log("URL after Sign In:", page.url());
    console.log("Body text after Sign In:\n", (await page.innerText("body")).slice(0, 500));
  } else {
    console.log("Submit button not found on login page!");
  }

  console.log("Page errors:", logs.filter(l => l.type === 'pageerror'));
  await page.screenshot({ path: "screenshots/test-logout-login.png" });
  await browser.close();
}

test().catch(console.error);

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
  }, 5000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 5000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  }, 5000);

  describe("New tests Github page ", () => {
    beforeEach(async () => {
      await page.goto("https://github.com");
    });
    
    test("Should check Pricing page", async () => {
      await page.goto("https://github.com/pricing");
      const title = await page.title();
      expect(title).toEqual("Pricing · Plans for every developer · GitHub")
    }, 5000);

    test("Click on button Start a free enterprise trial title", async () => {
      const btn =await page.$("body > div.logged-out.env-production.page-responsive.header-overlay.home-campaign > div.application-main > main > div:nth-child(1) > div.px-3.home-campaign-hero > div > div > div.col-11.text-left.pl-2.pl-sm-0.mt-n4 > div.d-flex.flex-column.flex-md-row > a");
      await btn.click();
      await page.waitForSelector('body > div.logged-out.env-production.page-responsive > div.application-main > main > div > div.mb-4.mb-md-8.container-xl > h1');
      const title = await page.title();
      expect(title).toEqual("Choose an Enterprise plan · GitHub")
    }, 5000);

    test("Check page docs", async () => {
      await page.goto("https://docs.github.com/ru");
      const title = await page.title();
      expect(title).toEqual("GitHub Docs")
      }, 5000);
});
});

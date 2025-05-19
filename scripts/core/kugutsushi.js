const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { executablePath } = require('puppeteer');
const { Env } = require('./env');

/**
 * 傀儡師
 */
class Kugutsushi {
  async start() {
    puppeteer.use(StealthPlugin());
    const options = Env.htbEnv === 'ci'
      ? { headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] }
      : { headless: false };
    this.browser = await puppeteer.launch({
      channel: 'chrome',
      executablePath: executablePath(),
      ...options,
    });
    this.page = await this.browser.newPage();
  }

  async show(url) {
    await this.page.goto(url);
  }

  async type(selector, text) {
    await this.page.waitForSelector(selector, { visible: true });
    await this.page.$eval(selector, (e) => { e.value = ''; });
    await this.page.type(selector, text);
  }

  async replaceFormText(selector, text) {
    await this.page.waitForSelector(selector, { visible: true });
    await this.page.$eval(selector, (e) => { e.value = ''; });
    await this.page.$eval(selector, (e, c) => { e.value = c; }, text);
  }

  async chooseFormImage(selector, filePath) {
    const [fileChooser] = await Promise.all([
      this.page.waitForFileChooser(),
      this.page.click(selector),
    ]);
    await fileChooser.accept([filePath]);
  }

  async setFormCheckbox(selector, checked) {
    await this.page.$eval(selector, (e, c) => { e.checked = c; }, checked);
  }

  async update(selector) {
    const form = await this.page.$(selector);
    await Promise.all([
      this.page.waitForNavigation(),
      form.evaluate((f) => { f.submit(); }),
    ]);
  }

  async click(selector) {
    await this.page.click(selector);
  }

  async stop() {
    await this.browser.close();

    this.browser = null;
    this.page = null;
  }
}

exports.Kugutsushi = Kugutsushi;

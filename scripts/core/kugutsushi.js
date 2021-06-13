const puppeteer = require('puppeteer');
const { Env } = require('./env');

/**
 * 傀儡師
 */
class Kugutsushi {
  async start() {
    const options = Env.htbEnv === 'ci'
      ? { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
      : { headless: false };
    this.browser = await puppeteer.launch(options);
    this.page = await this.browser.newPage();
  }

  async show(url) {
    await this.page.goto(url);
  }

  async replaceFormText(selector, text) {
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

  async wait(milliseconds = 5000) {
    await this.page.waitForTimeout(milliseconds);
  }

  async stop() {
    await this.browser.close();

    this.browser = null;
    this.page = null;
  }
}

exports.Kugutsushi = Kugutsushi;

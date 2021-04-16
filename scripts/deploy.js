'use strict';

const Env = require('./core/env').Env
const Utils = require('./core/utils').Utils

const puppeteer = require('puppeteer');

const themeName = Utils.getFileContent('./resources/theme-name.hatena');
const revision = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString().trim();
const themeDescription = Utils.getFileContent('./resources/description.hatena')
  .replace(':REVISION:', revision);
const themeCss = Utils.getFileContent('./public/style.min.css');

(async () => {
  let browser;
  if (Env.htbEnv === 'ci') {
    browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  } else {
    browser = await puppeteer.launch({ headless: false });
  }
  const page = await browser.newPage();

  // はてなブログのログインページを表示する
  await page.goto('https://www.hatena.ne.jp/login');

  // はてなブログにログインする
  const loginForm = await page.$('form[action="/login"]');
  await page.type('input[name="name"]', Env.name);
  await page.type('input[name="password"]', Env.password);
  await Promise.all([
    page.waitForNavigation(),
    loginForm.evaluate(form => form.submit()),
  ]);
  await page.waitForTimeout(5000);

  // テーマストア編集画面を表示する
  await page.goto('https://blog.hatena.ne.jp/-/store/theme/' + Env.themeUuid + '/edit');

  // テーマを更新する
  const themeForm = await page.$('#form-update-theme');
  const update = async (selector, content) => {
    await page.$eval(selector, (e) => e.value = '');
    await page.$eval(selector, (e, content) => e.value = content, content);
  }
  await update('input[name=name]', themeName);
  await update('textarea[name=description]', themeDescription);
  await update('textarea[name=css]', themeCss);
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click('#theme-screenshot'),
  ]);
  await fileChooser.accept(['./resources/screenshot.png']);
  await page.$eval('input[name="accept_tos"]', check => check.checked = true);
  await Promise.all([
    page.waitForNavigation(),
    themeForm.evaluate(form => form.submit()),
  ]);

  // ブラウザを閉じる
  await browser.close();
})();

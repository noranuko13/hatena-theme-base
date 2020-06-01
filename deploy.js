'use strict';

const name = getEnv('HATENA_NAME');
const password = getEnv('HATENA_PASSWORD');
const themeUuid = getEnv('HATENA_THEME_UUID');

const fs = require('fs');
const cheerio = require('cheerio');
const requestPromise = require('request-promise');
const jar = requestPromise.jar();


Promise.resolve()
  .then(function(){
    // はてなブログにログインする
    return requestPromise(initOptions({
      method: 'POST',
      url: 'https://www.hatena.ne.jp/login',
      jar: jar,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      form: {
        'name': name,
        'password': password,
      },
      transform: function () {
        return jar;
      }
    }));
  })
  .then(function(jar){
    // テーマストア編集画面を表示する
    return requestPromise(initOptions({
      method: 'GET',
      url: 'http://blog.hatena.ne.jp/-/store/theme/' + themeUuid + '/edit',
      jar: jar,
      transform: function (body) {
        return cheerio.load(body);
      },
    }));
  })
  .then(function($) {
    const rkm = $('#form-update-theme input[name="rkm"]').val();
    const rkc = $('#form-update-theme input[name="rkc"]').val();

    // テーマを更新する
    return requestPromise(initOptions({
      method: 'POST',
      url: 'http://blog.hatena.ne.jp/-/store/theme/' + themeUuid,
      jar: jar,
      headers: {
        'content-type': 'multipart/form-data'
      },
      formData: {
        'name': getFileContent('./resources/theme-name.hatena'),
        'description': getFileContent('./resources/description.hatena'),
        'css': getFileContent('./public/style.min.css'),
        'screenshot': {
          value: fs.createReadStream('./resources/screenshot.png'),
          options: {
            filename: 'image.png',
            contentType: 'image/png'
          }
        },
        'accept_tos': 1,
        'rkm': rkm,
        'rkc': rkc
      }
    }));
  })
  .catch(error => console.error('resolve: ' + error))
;


/**
 * 環境変数の取得
 * @param envValue
 * @returns {string}
 */
function getEnv(envValue) {
  if (process.env[envValue] === undefined) {
    throw new Error(`${envValue} is undefined`);
  }
  return process.env[envValue];
}

/**
 * ファイル内容の取得
 * @param path
 * @returns {string}
 */
function getFileContent(path) {
  return fs.readFileSync(path, { encoding: 'utf-8' })
}

/**
 * オプションの初期化
 * @param options
 * @returns {*}
 */
function initOptions(options) {
  options.followAllRedirects = true;
  options.timeout = 30 * 1000;

  return options;
}

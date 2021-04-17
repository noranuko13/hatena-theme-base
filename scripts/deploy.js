const { Env } = require('./core/env');
const { Theme } = require('./core/theme');
const { Kugutsushi } = require('./core/kugutsushi');

(async () => {
  const kugutsushi = new Kugutsushi();

  // ブラウザを開く
  await kugutsushi.start();

  // はてなブログのログインページからログインする
  await kugutsushi.show('https://www.hatena.ne.jp/login');
  await kugutsushi.replaceFormText('input[name="name"]', Env.name);
  await kugutsushi.replaceFormText('input[name="password"]', Env.password);
  await kugutsushi.update('form[action="/login"]');
  await kugutsushi.wait();

  // テーマストア編集画面からテーマを更新する
  await kugutsushi.show(`https://blog.hatena.ne.jp/-/store/theme/${Env.themeUuid}/edit`);
  await kugutsushi.replaceFormText('input[name=name]', Theme.name);
  await kugutsushi.replaceFormText('textarea[name=description]', Theme.description);
  await kugutsushi.replaceFormText('textarea[name=css]', Theme.css);
  await kugutsushi.chooseFormImage('#theme-screenshot', Theme.screenshot);
  await kugutsushi.setFormCheckbox('input[name="accept_tos"]', true);
  await kugutsushi.update('#form-update-theme');

  // ブラウザを閉じる
  await kugutsushi.stop();
})();

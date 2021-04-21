require('dotenv').config();
const { Logger } = require('./logger');

/**
 * 環境変数
 */
class Env {
  /**
   * @returns {string} はてなIDまたはメールアドレス
   */
  static get name() {
    return Env.get('HATENA_NAME', [
      'はてなにログインする時に入力するはてなIDまたはメールアドレスです。',
    ]);
  }

  /**
   * @returns {string} パスワード
   */
  static get password() {
    return Env.get('HATENA_PASSWORD', [
      'はてなにログインする時に入力するパスワードです。',
    ]);
  }

  /**
   * @returns {string} はてなテーマUUID
   */
  static get themeUuid() {
    return Env.get('HATENA_THEME_UUID', [
      'URLに含まれているテーマ毎に固有の値です。',
      'https://blog.hatena.ne.jp/-/store/theme/これ',
    ]);
  }

  /**
   * @returns {string} 環境(ci,dev)
   */
  static get htbEnv() {
    return Env.get('HTB_ENV', [
      'CircleCIには『ci』を設定します。',
      '開発環境で『dev』を指定すると、ブラウザを起動しながら動作確認できます。',
    ]);
  }

  /**
   * @param {string} name 環境変数の名前
   * @param {string[]} descriptions 環境変数の説明
   * @returns {string} 環境変数の値
   */
  static get(name, descriptions) {
    const value = process.env[name];
    if (value === undefined || value === '') {
      Logger.warn(`${name}が定義されていません`,
        ['.envファイルに記述するか、環境変数として設定して下さい。'].concat(descriptions));
      process.exit(1);
    }
    return value;
  }
}

exports.Env = Env;

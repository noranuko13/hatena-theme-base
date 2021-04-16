require('dotenv').config();

/**
 * 環境変数
 */
class Env {
  /**
   * @returns {string} はてなIDまたはメールアドレス
   */
  static get name() {
    return process.env.HATENA_NAME;
  }

  /**
   * @returns {string} パスワード
   */
  static get password() {
    return process.env.HATENA_PASSWORD;
  }

  /**
   * @returns {string} はてなテーマUUID
   */
  static get themeUuid() {
    return process.env.HATENA_THEME_UUID;
  }

  /**
   * @returns {string} 環境(ci,dev)
   */
  static get htbEnv() {
    return process.env.HTB_ENV;
  }
}

exports.Env = Env;

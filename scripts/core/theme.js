const dayjs = require('dayjs');
const { Utils } = require('./utils');
const { Env } = require('./env');

/**
 * テーマ
 */
class Theme {
  /**
   * @returns {string} テーマ名
   */
  static get name() {
    return Utils.getFileContent('./resources/theme-name.hatena');
  }

  /**
   * @returns {string} テーマの説明
   */
  static get description() {
    const revision = Env.htbEnv === 'dev' ? dayjs().format('YYYY-MM-DD HH:mm:ss') : Utils.getRevision();
    return Utils.getFileContent('./resources/description.hatena')
      .replace(':REVISION:', revision);
  }

  /**
   * @returns {string} CSSのソースコード
   */
  static get css() {
    return Utils.getFileContent('./public/style.min.css');
  }

  /**
   * @returns {string} スクリーンショット
   */
  static get screenshot() {
    return './resources/screenshot.png';
  }
}

exports.Theme = Theme;

const { Utils } = require('./utils');

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
    return Utils.getFileContent('./resources/description.hatena')
      .replace(':REVISION:', Utils.getRevision());
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

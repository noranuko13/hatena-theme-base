const fs = require('fs');

/**
 * ユーティリティ
 */
class Utils {
  /**
   * @param {string} path ファイルパス
   * @returns {string} ファイル内容
   */
  static getFileContent(path) {
    return fs.readFileSync(path, { encoding: 'utf-8' });
  }
}

exports.Utils = Utils;

const fs = require('fs');
const { execSync } = require('child_process');

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

  /**
   * @returns {string} リビジョン
   */
  static getRevision() {
    return execSync('git rev-parse --short HEAD').toString().trim();
  }

  static async wait(milliseconds = 5000) {
    await new Promise((resolve) => { setTimeout(resolve, milliseconds); });
  }
}

exports.Utils = Utils;

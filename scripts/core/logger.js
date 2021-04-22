/**
 * ログ
 */
class Logger {
  /**
   * @param {string} title タイトル
   * @param {string[]} messages メッセージ
   */
  static warn(title, messages = []) {
    Logger.log('33', `[注意] ${title}`, messages);
  }

  /**
   * @param {string} title タイトル
   * @param {string[]} messages メッセージ
   */
  static info(title, messages = []) {
    Logger.log('34', `[情報] ${title}`, messages);
  }

  /**
   * @param {string} color ログの色(ANSI escape code)
   * @param {string} title ログのタイトル
   * @param {string[]} messages ログのメッセージ
   */
  static log(color, title, messages = []) {
    /* eslint-disable no-console */
    console.log(`\x1b[${color}m${title}\x1b[0m`);
    console.group();
    messages.forEach((message) => {
      console.log(`・${message}`);
    });
    /* eslint-enable no-console */
  }
}

exports.Logger = Logger;

class Logger {
  static warn(title, messages) {
    Logger.log('33', `[注意] ${title}`, messages);
  }

  static log(color, title, messages) {
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

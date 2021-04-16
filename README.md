# Hatena Theme Base


## 概要

- はてなブログの自作デザインテーマのベース


## 開発
Install [Node.js](https://nodejs.org/ja/).

### node-sass
- [sass/node-sass](https://github.com/sass/node-sass)

```
$ npm run watch
> node-sass src/style.scss public/style.css --watch --output-style expanded
```

### Web Server for Chrome
- Server
  - [Web Server for Chrome - Chrome ウェブストア](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)

- Choose Folder: hatena-theme-base/public, Enter Port: 3000
  - [http://127.0.0.1:3000/style.css](http://127.0.0.1:3000/style.css)

### はてなブログ
- デザイン > {}デザインCSS

```
@import url("http://127.0.0.1:3000/style.css");
```


## デプロイ

### CircleCI
| 環境変数          | 内容                           |
| ----------------- | ------------------------------ |
| HATENA_NAME       | はてなID または メールアドレス |
| HATENA_PASSWORD   | パスワード                     |
| HATENA_THEME_UUID | はてなテーマUUID               |
| HTB_ENV           | ci                             |


## ライセンス

- MIT License

### Libraries
- [HTML5 Reset Stylesheet _ HTML5 Doctor](http://html5doctor.com/html-5-reset-stylesheet/)

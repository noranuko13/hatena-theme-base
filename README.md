# Hatena Theme Base


## 概要

- はてなブログの自作デザインテーマのベース


## 開発

### Node.js
- [Node.js](https://nodejs.org/ja/)

```
$ node -v
v10.16.0
$ npm -v
6.5.0
```

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


## ライセンス

- MIT License

### Libraries
- [HTML5 Reset Stylesheet _ HTML5 Doctor](http://html5doctor.com/html-5-reset-stylesheet/)

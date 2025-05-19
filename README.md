# Hatena Theme Base

> [!IMPORTANT]
> CircleCI deploy support has ended.  
> We currently have no plans to migrate to another CI tool. Please deploy manually from your local environment as needed.
> This is due to the frequent occurrence of deployment failures on CircleCI, despite working well in local environments.


## 概要

- はてなブログの自作デザインテーマのベース


## 開発

Install [Node.js](https://nodejs.org/ja/).

Then, ```npm run dev:watch``` and ```npm run dev:server```.

- [style.css](http://127.0.0.1:3000/style.css)
  - [style.css.map](http://127.0.0.1:3000/style.css.map)

### はてなブログ

- デザイン > {}デザインCSS

```
@import url("http://127.0.0.1:3000/style.css");
```


## デプロイ

### CircleCI

| 環境変数 | 内容 |
| ----------------- | ------------------------------ |
| HATENA_NAME | はてなID または メールアドレス |
| HATENA_PASSWORD | パスワード |
| HATENA_THEME_UUID | はてなテーマUUID |
| HTB_ENV | ci |


## ライセンス

- MIT License


### Libraries

- [HTML5 Reset Stylesheet _ HTML5 Doctor](http://html5doctor.com/html-5-reset-stylesheet/)

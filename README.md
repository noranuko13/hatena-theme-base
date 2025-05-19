# Hatena Theme Base

> [!IMPORTANT]
> CircleCI deploy support has ended.  
> We currently have no plans to migrate to another CI tool. Please deploy manually from your local environment as needed.
> This is due to the frequent occurrence of deployment failures on CircleCI, despite working well in local environments.

Automatic update of Hatena Blog theme store


## Setup

Install [Node.js](https://nodejs.org/ja/).

```shell
$ npm install
```


## Development

```shell
# Console A: Watch SCSS and Rebuild CSS
$ npm run dev:watch
```

```shell
# Console B: Start the server
$ npm run dev:server
```

- はてなブログ 管理画面
  - デザイン > カスタマイズ > 高度な設定 {}デザインCSS

```css
@import url("http://127.0.0.1:3000/style.css");
```


## Deploy

Set up environment variables,

```shell
$ cp .env.example .env
```

| 環境変数 | 内容 |
| --- | --- |
| HATENA_NAME | はてなID または メールアドレス |
| HATENA_PASSWORD | パスワード |
| HATENA_THEME_UUID | はてなテーマUUID |
| HTB_ENV | dev |

Then,

```shell
$ npm run prod:build
$ node scripts/deploy.js
```


## License

- MIT License


### Libraries

- [HTML5 Reset Stylesheet _ HTML5 Doctor](http://html5doctor.com/html-5-reset-stylesheet/)

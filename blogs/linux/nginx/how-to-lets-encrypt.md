---
title: 【Linux】 CentOS7 + Nginx + Let’s Encrypt
date: 2020-11-06
# sidebar: true
tags:
  - Nginx
  - Let’s Encrypt
  - Centos 7
categories:
  - Linux
---

## はじめに

対象環境は `CentOS 7` です｡

## Nginx 環境構築手順

- [【Linux】 CentOS7 + Nginx Install](https://tabiya.dev/blogs/linux/nginx/how-to-nginx-install.html)

## Let’s Encrypt の導入方法

作業自体は､すべて root ユーザー で作業しています｡

### EPEL リポジトリのインストール

```bash
# yum -y install epel-release
```

### Let’s Encrypt クライアント ｢certbot｣ をインストール

```bash
# yum -y install certbot python2-certbot-nginx

// search を使うとインストール可能なパッケージ一覧が表示されます｡
# yum search certbot
```

### certbot実行時にnginxの再起動を実行

```bash
sed -i /etc/sysconfig/certbot \
-e "/^PRE_HOOK/ s/\"\"/\"--pre-hook 'systemctl stop nginx'\"/" \
-e "/^POST_HOOK/ s/\"\"/\"--post-hook 'systemctl restart nginx'\"/" \
-e "/^RENEW_HOOK/ s/\"\"/\"--renew-hook 'systemctl restart nginx'\"/"
```

### certbot コマンドで証明書の取得

```bash
# certbot certonly --webroot \
-w /usr/share/nginx/html/test80 \
-d www.example.com \
-m example@example.com \
--agree-tos -n
```

### 証明書が保存されている場所について

```bash
# ls -a /etc/letsencrypt/live/www.example.com/

.  ..  README  cert.pem  chain.pem  fullchain.pem  privkey.pem
```

## HTTPS の設定

HTTPS でアクセス出来るように設定をしています｡

### 443 番ポートでアクセスする先の作成

```bash
// ディレクトリの作成
# mkdir /usr/share/nginx/html/test443

// アクセスする先のファイルを作成
# vim /usr/share/nginx/html/test443/index.html
```

```html
<html>
  <body>
    <div style="width: 100%; font-size: 40px; font-weight: bold; text-align: center;">
      Nginx:443 Test Page
    </div>
  </body>
</html>
```

### 鍵 の場所指定など

```bash
// sample_ssl じゃなくても大丈夫
# vim /etc/nginx/conf.d/sample_ssl.conf
```

```vim
server {
  listen  443 ssl;
  server_name  www.example.com;
  root  /usr/share/nginx/html/test443;
  ssl_certificate  /etc/letsencrypt/live/www.example.com/fullchain.pem;
  ssl_certificate_key  /etc/letsencrypt/live/www.example.com/privkey.pem;
}
```

### HTTP アクセスを HTTPS リダイレクトへ

こちらの記述は自由です｡

server 内に｢`return 301 https://$host$request_uri;`｣を記述するだけです｡

```bash
# vim /etc/nginx/conf.d/default.conf
```

```vim
server {
    listen       80;
    #server_name  localhost;
    server_name www.example.com;
    return 301 https://$host$request_uri;

    location / {
        root   /usr/share/nginx/html/test80;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

### Nginx の再起動または再読み込み

環境に合わせて実行

```bash
// 再起動 : stop => start
# systemctl restart nginx

// リロード : 設定ファイルの再読み込み
# systemctl reload nginx
```

### ブラウザーからサーバーにアクセス

[![Image from Gyazo](https://i.gyazo.com/9cf90db7a63175a5ca6cfd15fabea34c.png)](https://gyazo.com/9cf90db7a63175a5ca6cfd15fabea34c)

以上で､CentOS7 の Nginx & Let’s Encrypt の導入方法でした｡

迷った際は､とりあえず `nginx -t` を実行してみましょう｡

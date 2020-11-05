---
title: 【Linux】 CentOS7 + Nginx Install
date: 2020-11-05
# sidebar: true
tags:
  - Nginx
categories:
  - Linux
---

## 1. はじめに

---

対象環境は `CentOS 7` です｡

## 2. 初期設定など

---

### 2.1. セキュリティグループ 外し

---

CentOS 7 で実施している場合は下記を実施

```sh
//ファイアーウォールの停止/自動停止
# systemctl stop firewalld ; systemctl disable firewalld

// SELinuxの無効
# sed -i -e "s/enforcing/disabled/g" /etc/selinux/config

// 最新/便利な物の導入/再起動
# yum -y update ; yum -y groupinstall base ; reboot
```

### 2.2. Nginx サーバーの設定など

---

設定に異常が無いか確認する際は､下記のコマンドを実行

```sh
# nginx -t

nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### 2.3. リポジトリ情報の設定

---

CentOS 7では､公式のyumリポジトリにnginxが無いため､ [nginx 公式](http://nginx.org/en/linux_packages.html)が用意しているリポジトリを追加します｡

```sh
# vim /etc/yum.repos.d/nginx.repo

[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/mainline/centos/7/$basearch/
gpgcheck=0
enabled=1
```

## 3. インストール編

---

### 3.1. Nginx をインストール可能か確認

---

```sh
# yum info nginx

読み込んだプラグイン:fastestmirror, langpacks
Loading mirror speeds from cached hostfile
 * base: mirrors.cat.net
 * extras: mirrors.cat.net
 * updates: mirrors.cat.net
nginx                    | 2.9 kB  00:00:00
nginx/x86_64/primary_db  | 154 kB  00:00:02
利用可能なパッケージ
名前: nginx
アーキテクチャー   : x86_64
エポック          : 1
バージョン        : 1.17.3
リリース          : 1.el7.ngx
容量             : 767 k
リポジトリー      : nginx/x86_64
要約             : High performance web server
URL             : http://nginx.org/
ライセンス        : 2-clause BSD-like license
説明             : nginx [engine x] is an HTTP and reverse proxy server, as well as
                : a mail proxy server.
```

### 3.2. Nginx のインストール

---

```sh
// Nginx のインストール
# yum -y install nginx

~以下略~

// Nginx のバージョン確認
# nginx -v

nginx version: nginx/1.17.3
```

## 4. 80 番ポートアクセス確認編

---

### 4.1. 80番ポートでアクセスする先の作成

---

```sh
// ディレクトリの作成
# mkdir /usr/share/nginx/html/test80

// アクセスする先のファイルを作成
# vim /usr/share/nginx/html/test80/index.html
```

```html
<html>
  <body>
    <div style="width: 100%; font-size: 40px; font-weight: bold; text-align: center;">
      Nginx:80 Test Page
    </div>
  </body>
</html>
```

### 4.2. サーバーネーム の変更

---

```sh
# vim /etc/nginx/conf.d/default.conf
```

```nginx
server {
    listen       80;
    server_name www.example.com;

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

### 4.3. Nginx 再起動

---

```sh
// エラーが無いかを確認
# nginx -t

// Nginx の再起動
# systemctl restart nginx
```

### 4.4. ブラウザーからサーバーにアクセス

---

[![Image from Gyazo](https://i.gyazo.com/f674a5445dbe0977c071ab3e83cc52c0.png)](https://gyazo.com/f674a5445dbe0977c071ab3e83cc52c0)

ドメインが `.dev` の為､ HTTP がアクセス出来ません･･･(普通のドメインなら HTTP アクセス出来ます｡)

::: tip
- [こんにちは、.dev！](https://developers-jp.googleblog.com/2019/02/dev.html)
- [Google Chromeで.devなどの開発DomainがHTTPSに変更される。](https://qiita.com/lara_bell/items/f7f3c5189530090229ed)
- [Googleがデベロッパー向けドメイン「.dev」の先取りプログラムを開始。優先的にドメイン名を確保可能](https://www.publickey1.jp/blog/19/googledev.html)

## 5. HTTPS の仕方

---

[【Linux】 CentOS7 + Nginx + Let’s Encrypt](https://tabiya.dev/blogs/linux/nginx/how-to-lets-encrypt.html)
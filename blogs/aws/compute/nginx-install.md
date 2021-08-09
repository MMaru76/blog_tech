---
title: AWS Nginx Install
description: Nginx Install
date: 2020-05-24
# sidebar: true
sidebar: "auto"
tags:
  - Nginx
  - EC2
categories:
 - AWS
---

高速 HTTP サーバーソフトウェア ｢Nginx｣ による､Webサーバーのインストールと各種設定方法

## 1.0 Nginx とは

[Nginx 公式ページ](https://nginx.org/en/)

> nginxは、フリーかつオープンソースなWebサーバである。処理性能・高い並行性・メモリ使用量の小ささに焦点を当てて開発されており、HTTP, HTTPS, SMTP, POP3, IMAPのリバースプロキシの機能や、ロードバランサ、HTTPキャッシュなどの機能も持つ。
>
> 参照元 : [Nginx - ウィキペディア](https://ja.wikipedia.org/wiki/Nginx)


## 1.1. Nginx をインストールする前にリポジトリの確認

- 全体での確認

```bash
# amazon-linux-extras
  0  ansible2                 available    \
        [ =2.4.2  =2.4.6  =2.8  =stable ]
  2  httpd_modules            available    [ =1.0  =stable ]
~~~
 38  nginx1                   available    [ =stable ]
~~~
 43  livepatch                available    [ =stable ]
```

- 特定のパッケージが存在するか確認

```bash
# amazon-linux-extras | grep "nginx"
 38  nginx1                   available    [ =stable ]
```

## 1.2. Nginx をインストール

```bash
# amazon-linux-extras install nginx1
================================================================================
 Package                    Arch   Version              Repository         Size
================================================================================
Installing:
 nginx                      x86_64 1:1.16.1-1.amzn2.0.1 amzn2extra-nginx1 556 k
Installing for dependencies:
 dejavu-fonts-common        noarch 2.33-6.amzn2         amzn2-core         64 k
 dejavu-sans-fonts          noarch 2.33-6.amzn2         amzn2-core        1.4 M
 fontconfig                 x86_64 2.13.0-4.3.amzn2     amzn2-core        253 k
 fontpackages-filesystem    noarch 1.44-8.amzn2         amzn2-core         10 k
 gd                         x86_64 2.0.35-26.amzn2.0.2  amzn2-core        147 k
 gperftools-libs            x86_64 2.6.1-1.amzn2        amzn2-core        274 k
 libX11                     x86_64 1.6.7-2.amzn2        amzn2-core        614 k
 libX11-common              noarch 1.6.7-2.amzn2        amzn2-core        164 k
 libXau                     x86_64 1.0.8-2.1.amzn2.0.2  amzn2-core         29 k
 libXpm                     x86_64 3.5.12-1.amzn2.0.2   amzn2-core         57 k
 libxcb                     x86_64 1.12-1.amzn2.0.2     amzn2-core        216 k
 libxslt                    x86_64 1.1.28-5.amzn2.0.2   amzn2-core        243 k
 nginx-all-modules          noarch 1:1.16.1-1.amzn2.0.1 amzn2extra-nginx1  20 k
 nginx-filesystem           noarch 1:1.16.1-1.amzn2.0.1 amzn2extra-nginx1  21 k
 nginx-mod-http-geoip       x86_64 1:1.16.1-1.amzn2.0.1 amzn2extra-nginx1  26 k
 nginx-mod-http-image-filter
                            x86_64 1:1.16.1-1.amzn2.0.1 amzn2extra-nginx1  30 k
 nginx-mod-http-perl        x86_64 1:1.16.1-1.amzn2.0.1 amzn2extra-nginx1  39 k
 nginx-mod-http-xslt-filter x86_64 1:1.16.1-1.amzn2.0.1 amzn2extra-nginx1  29 k
 nginx-mod-mail             x86_64 1:1.16.1-1.amzn2.0.1 amzn2extra-nginx1  57 k
 nginx-mod-stream           x86_64 1:1.16.1-1.amzn2.0.1 amzn2extra-nginx1  83 k

Transaction Summary
================================================================================
Install  1 Package (+20 Dependent packages)

Total download size: 4.3 M
Installed size: 14 M
Is this ok [y/d/N]: y
=> y と入力してEnterを選択

~~~
Installed:
  nginx.x86_64 1:1.16.1-1.amzn2.0.1

Complete!
```

## 1.3. Nginx 起動

```bash
# systemctl start nginx
```

## 1.4. Nginx 起動確認

```bash
# systemctl status nginx
● nginx.service - The nginx HTTP and reverse proxy server
   Loaded: loaded (/usr/lib/systemd/system/nginx.service; disabled; vendor preset: disabled)
   Active: active (running) since Sun 2020-05-24 12:33:20 UTC; 33s ago
  Process: 18182 ExecStart=/usr/sbin/nginx (code=exited, status=0/SUCCESS)
  Process: 18179 ExecStartPre=/usr/sbin/nginx -t (code=exited, status=0/SUCCESS)
  Process: 18178 ExecStartPre=/usr/bin/rm -f /run/nginx.pid (code=exited, status=0/SUCCESS)
 Main PID: 18185 (nginx)
   CGroup: /system.slice/nginx.service
           ├─18185 nginx: master process /usr/sbin/nginx
           └─18187 nginx: worker process

May 24 12:33:20 ip-172-31-40-58.ap-northeast-1.compute.internal systemd[1]: Starting The nginx HTTP and reverse proxy server...
May 24 12:33:20 ip-172-31-40-58.ap-northeast-1.compute.internal nginx[18179]: nginx: the configuration file /etc/nginx/nginx.conf syn...s ok
May 24 12:33:20 ip-172-31-40-58.ap-northeast-1.compute.internal nginx[18179]: nginx: configuration file /etc/nginx/nginx.conf test is...sful
May 24 12:33:20 ip-172-31-40-58.ap-northeast-1.compute.internal systemd[1]: Failed to read PID from file /run/nginx.pid: Invalid argument
May 24 12:33:20 ip-172-31-40-58.ap-northeast-1.compute.internal systemd[1]: Started The nginx HTTP and reverse proxy server.
Hint: Some lines were ellipsized, use -l to show in full.
```

## 1.5. Nginx 自動起動

```bash
# systemctl enable nginx
Created symlink from /etc/systemd/system/multi-user.target.wants/nginx.service to /usr/lib/systemd/system/nginx.service.
```

## 1.6. Nginx 自動起動確認

```bash
# systemctl list-unit-files  -t service | grep "nginx"
nginx.service                                 enabled
```

## 1.7. Webページ 起動確認

任意のWeb ブラウザを起動し､デフォルトページにアクセスをすると動作確認する事が出来ます｡

[![Image from Gyazo](https://i.gyazo.com/f6654d20dd0bdf19971be8175b744489.png)](https://gyazo.com/f6654d20dd0bdf19971be8175b744489)
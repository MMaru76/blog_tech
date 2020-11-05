---
title: 【EC2 Amazon Linux2】WordPressをLEMPでの構築手順
description: WordPress for AmazonLinux2(LEMP) Setup
date: 2020-06-21
# sidebar: true
sidebar: "auto"
tags:
  - Nginx
  - WordPress
  - EC2
categories:
 - AWS
---

LEMP を使った WordPress の簡単な構築手順


## 用語解説

|項目|説明|備考|
|:---:|:---:|:---:|
|$(ドル) |一般ユーザー||
|#(シャープ)|rootユーザー||
|=>|短文の実行結果など||
|----<br>\~hoge\~<br>----|長文の実行結果や編集内容など||
|mysql> |データベース内での実行文||

## 最初の設定など

### パッケージ更新

```sh
$ sudo yum -y update
```

### TimeZone の変更と反映

```sh
$ date
=> UTC
$ sudo timedatectl set-timezone Asia/Tokyo
$ sudo reboot
$ date
=> JST
```

## パッケージ導入~起動編

### 導入パッケージの確認

```sh
$ amazon-linux-extras list | grep nginx
$ amazon-linux-extras list | grep php
```

### 各種パッケージのインストール

```sh
$ sudo amazon-linux-extras install nginx1
$ sudo amazon-linux-extras install php7.4
$ sudo yum install mariadb-server
```

### 各種パッケージのバージョン確認

- nginx

```sh
$ nginx -v
=> nginx version: nginx/1.16.1
```

- php

```sh
$ php-fpm -v
=> PHP 7.4.5 (fpm-fcgi) (built: Apr 23 2020 00:11:38)
```

- mysql

```sh
$ mysql --version
=> mysql  Ver 15.1 Distrib 5.5.64-MariaDB, for Linux (x86_64) using readline 5.1
```

### 各種サービスの起動&自動起動有効化

- nginx
```sh
$ sudo systemctl start nginx
$ sudo systemctl enable nginx
```

- php

```sh
$ sudo systemctl start php-fpm
$ sudo systemctl enable php-fpm
```

- mysql

```sh
$ sudo systemctl start mariadb
$ sudo systemctl enable mariadb
```

## WordPress 導入

### データベース周りの設定

- データベースのパスワード設定などの設定
- データベース内に接続

```sh
$ mysql_secure_installation

----初期セットアップ開始----
Set root password? [Y/n] y
=> root パスワードを設定

Remove anonymous users? [Y/n] y
=> 匿名ユーザーは削除する

Disallow root login remotely? [Y/n] y
=> root のリモートログインは無効とする

Remove test database and access to it? [Y/n] y
=> テストデータベースは削除する

Reload privilege tables now? [Y/n] y
=> 特権情報をリロードする
----初期セットアップ終了----

$ mysql -u root -p
```

- データベース作成

```sql
mysql> create database Oreodb;
mysql> create user OreoUser@localhost identified by 'OreoUserPass@0113';
mysql> grant all on Oreodb.* to OreoUser@localhost identified by 'OreoUserPass@0113';
mysql> flush privileges;
mysql> exit
```

### WordPressのダウンロード

- 作業ディレクトリを作成 
- 最新版のWordPressをDL
- 解凍
- User:Groupの変更
- 不要ファイルを削除
- パスの確認

```sh
$ sudo mkdir -p /var/www/oreo_html
$ cd /var/www/oreo_html/
$ sudo wget https://ja.wordpress.org/latest-ja.tar.gz
$ sudo tar -xzvf latest-ja.tar.gz
$ sudo rm latest-ja.tar.gz
$ cd wordpress
$ pwd
=> /var/www/oreo_html/wordpress
```

### Nginx側設定

- nginx.conf のバックアップ作成
- ドキュメントルートの場所を変更
    - 42行目の root の場所を上記で実行した pwd 結果に置き換える

```sh
$ sudo cp -ip /etc/nginx/nginx.conf /etc/nginx/nginx.conf_20200622
$ sudo vim /etc/nginx/nginx.conf
=> root         /var/www/oreo_html/wordpress;
```

- config ファイルの中身が正しいか確認

```sh
$ sudo nginx -t
=> nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
=> nginx: configuration file /etc/nginx/nginx.conf test is successful
```

- nginx 再起動

```sh
$ sudo systemctl restart nginx
```


### ブラウザにて

- インスタンスのIPを検索
- 【さぁ､始めましょう!】 を選択
[![Image from Gyazo](https://i.gyazo.com/e4eaa88d4a2ba8fbcdf85313c536cdf5.png)](https://gyazo.com/e4eaa88d4a2ba8fbcdf85313c536cdf5)

- 必要な項目を入力
[![Image from Gyazo](https://i.gyazo.com/a86abd0097f81ade1935a8e0f337d111.png)](https://gyazo.com/a86abd0097f81ade1935a8e0f337d111)

- 情報をコピー
[![Image from Gyazo](https://i.gyazo.com/731d7721f9e32c2864aa66ddd6b487c0.png)](https://gyazo.com/731d7721f9e32c2864aa66ddd6b487c0)

- wp-config.phpの作成

```sh
$ sudo vim /var/www/oreo_html/wordpress/wp-config.php
$ sudo chown nginx. -R /var/www/oreo_html/
```

- 必要情報の入力
[![Image from Gyazo](https://i.gyazo.com/2a21890db4af7faf0be865e34a565154.png)](https://gyazo.com/2a21890db4af7faf0be865e34a565154)

## Hello WordPress !

[![Image from Gyazo](https://i.gyazo.com/af1e42c69b3eeac1a5766925751841e7.png)](https://gyazo.com/af1e42c69b3eeac1a5766925751841e7)
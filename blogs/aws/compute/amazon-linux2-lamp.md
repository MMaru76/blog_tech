---
title: LAMP環境セットアップ
description: Amazon Linux 2 で作る LAMP環境
date: 2020-05-24
# 1. sidebar: true
sidebar: "auto"
tags:
  - LAMP
  - Apache
  - EC2
categories:
 - AWS
---

## 1.1. LAMP とは

> LAMPとは、OSであるLinux、WebサーバであるApache HTTP Server、データベースであるMySQL、スクリプト言語であるPerl、PHP、Pythonを総称した頭文字から成る造語である。動的なウェブコンテンツを含むウェブサイトの構築に適した、オープンソースのソフトウェア群である。
>
> 参照元 : [LAMP(ソフトウェアバンドル)](https://ja.wikipedia.org/wiki/LAMP_(%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2%E3%83%90%E3%83%B3%E3%83%89%E3%83%AB))

## 1.2. Apache 編

### 1.2.1. インストール

```bash
# yum -y install httpd
```

### 1.2.2. サービスの起動

```bash
# systemctl start httpd
```

### 1.2.3. 自動起動のON

```bash
# systemctl enable httpd
```

### 1.2.4. 自動起動が有効か確認

```bash
# systemctl is-enabled httpd
=> enable
```

### 1.2.5. configファイルのチェック

```bash
# httpd -t
=> Syntax OK
```

### 1.2.6. configファイルのバックアップ取得

- 日付付きでバックアップ

```bash
# cp /etc/httpd/conf/httpd.conf /etc/httpd/conf/httpd.conf.`date +%Y%m%d_%H-%M-%S`
```

- バックアップ結果

```bash
# ll /etc/httpd/conf/

total 40
-rw-r--r-- 1 root root 11910 May  8 17:01 httpd.conf
-rw-r--r-- 1 root root 11910 May 25 14:17 httpd.conf.20200525_14-17-25
-rw-r--r-- 1 root root 13064 May  8 17:03 magic
```

## 1.3. MariadDB 編

### 1.3.1. インストール

```bash
# yum install -y mariadb-server
```

### 1.3.2. サービスの起動

```bash
# systemctl start mariadb
```

### 1.3.3. 自動起動のON

```bash
# systemctl enable mariadb
```

### 1.3.4. 自動起動が有効か確認

```bash
# systemctl is-enabled mariadb
=> enable
```

### 1.3.5. セキュリティ設定

```bash
# mysql_secure_installation
~~~
=> Set root password? [Y/n] y
=> Remove anonymous users? [Y/n]
=> Disallow root login remotely? [Y/n]
=> Remove test database and access to it? [Y/n] n
=> Reload privilege tables now? [Y/n]
~~~
=> Thanks for using MariaDB!
```

## 1.4. Amazon Linux Extras 編

### 1.4.1. リポジトリの確認

- 取得したいパッケージを grep する

```bash
# amazon-linux-extras | grep "パッケージ名"
=> 沢山出力されるの割愛
```

### 1.4.2. PHP のインストール

- php7.2.0と拡張モジュールをインストール

```bash
# amazon-linux-extras install -y php7.2 lamp-mariadb10.2-php7.2
```

### 1.4.3. PHP バージョンの確認

```bash
# php -v
=> PHP 7.2.30 (cli) (built: May  5 2020 18:04:45) ( NTS )
=> Copyright (c) 1997-2018 The PHP Group
=> Zend Engine v3.2.0, Copyright (c) 1998-2018 Zend Technologies
```

## 1.5. Linux 編

### 1.5.1. グループ追加

```bash
# sudo usermod -a -G apache ec2-user
```

### 1.5.2. 所有権の変更

> 後日､説明を追記致します･･･

```bash
# chmod 2775 /var/www/
```

```bash
↓ 実行前
# ls -alF /var/www/
total 0
drwxr-xr-x  4 ec2-user apache  33 May 25 14:10 ./
drwxr-xr-x 20 root     root   280 May 25 14:10 ../
drwxr-xr-x  2 ec2-user apache   6 May  8 17:04 cgi-bin/
drwxr-xr-x  2 ec2-user apache   6 May  8 17:04 html/

↓実行後
# ls -alF /var/www/
total 0
drwxrwsr-x  4 ec2-user apache  33 May 25 14:10 ./
drwxr-xr-x 20 root     root   280 May 25 14:10 ../
drwxr-xr-x  2 ec2-user apache   6 May  8 17:04 cgi-bin/
drwxr-xr-x  2 ec2-user apache   6 May  8 17:04 html/
```

### 1.5.3. パーミッションの変更

```bash
# find /var/www -type d -exec sudo chmod 2775 {} \;
# find /var/www -type f -exec sudo chmod 0664 {} \;
```

index.php ファイルの配置

```bash
# vim /var/www/html/index.php

<html>
  <body>
    Hello World.<br>
    <?php echo 'oreo'; ?>
  </body>
</html>
```

## 1.6. Webページ 動作確認

任意のWeb ブラウザを起動し､デフォルトページにアクセスをすると動作確認する事が出来ます｡

[![Image from Gyazo](https://i.gyazo.com/30b25c8608ae3a85358b36e53c3b39cb.png)](https://gyazo.com/30b25c8608ae3a85358b36e53c3b39cb)

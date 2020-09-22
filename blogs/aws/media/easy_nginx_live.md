---
title: 【Media系】Live配信サーバの簡単構築
date: 2018-11-28
category: 
# sidebar: true
sidebar: "auto"
tags:
  - Media系
  - nginx
categories:
  - AWS
---

## 0. アイキャッチ画像

[![Image from Gyazo](https://i.gyazo.com/9b2f3133f1b32286744003957b808537.png)](https://gyazo.com/9b2f3133f1b32286744003957b808537)

## 1. 今回の内容について

簡単にHLSとMPEG-DASHの同時出力&録画機能付きのLive配信サーバの構築方法を紹介していきたいと思います｡

::: tip
ここでは､AWSを使用していますが､Azure/GCP/オンプレミスなどでも構築する事が出来ます｡
:::

## 2. Live配信サーバ構築

### 2.1. 環境概要編

- インスタンスのスペック

|項目|値|
|:--:|:--:|
|OS|Amazon Linux2|
|Type|t2.smail|
|Disk|15GB|

- 開放ポート

|項目|値|
|:--:|:--:|
|SSH|22|
|HTTP|80|
|RTMP|1935|

### 2.2. Nginx+nginx-rtmp-moduleのインストール編

#### 2.2.1. 関連パッケージインストール

```sh
# yum -y install git gcc pcre-devel openssl-devel
```

#### 2.2.2. 任意の作業ディレクトリを作成

- 今回は､**/root/works** になります｡

```sh
# mkdir works
```

#### 2.2.3. Nginxダウンロード & Nginx展開

[こちら](https://nginx.org/en/download.html)で環境に合ったバージョンをダウンロード

```sh
# cd ~/works/
# wget https://nginx.org/download/nginx-1.14.0.tar.gz
# tar zxvf nginx-1.14.0.tar.gz
```

#### 2.2.4. nginx-rtmp-moduleをインストール

使用するモジュールは、[NGINX-based Media Streaming Server](https://github.com/arut/nginx-rtmp-module)

- MPEG-DASHとHLS対応のモジュールをクローン

```sh
# cd nginx-1.14.0/
# git clone https://github.com/arut/nginx-rtmp-module.git
# ./configure --add-module=nginx-rtmp-module/
# make
# make install
```

---
---

### 2.3. Nginxの設定編

#### 2.3.1. Config設定

HLS･MPEG-DASH･FLVを何処に出力するかを指定

```sh
# vi /usr/local/nginx/conf/nginx.conf
```

```nginx
worker_processes auto;
error_log  logs/error.log error;

events {
        worker_connections  1024;
}

rtmp_auto_push on;

rtmp {
    server {
        listen 1935;
        access_log logs/rtmp_access.log;
        chunk_size 4096;
        timeout 10s;

        application live {
            live on;

            # HLSの記述欄
            hls on;
            hls_path /var/www/html/hls;
            hls_fragment 10s;

            # MEPG-DASHの記述欄
            dash on;
            dash_path /var/www/html/dash;
            dash_fragment 10s;

            # FLVの記述欄
            record all;
            record_path /var/www/html/flv;
            record_unique on;
        }
    }
}

http {
    server {
        listen  80;
        include mime.types;
        default_type    application/octet-stream;
        server_name localhost;
        add_header  Access-Control-Allow-Origin *;

        location /hls {
            types {
                 application/vnd.apple.mpegurl m3u8;
            }
            root /var/www/html/;
        }
        location /dash {
            types {
                 application/vnd.apple.mpegurl mpd;
            }
            root /var/www/html/;
        }
    }
}
```

#### 2.3.2. FLVの出力ディレクトリの作成

- ディレクトリを作成後にユーザーとグループを**nobody**に変更

```sh
# mkdir -p /var/www/html/flv
# chown nobody. /var/www/html/flv
```

#### 2.3.3. Configの確認

もしOKと表示されていない場合は､記述ミスか､手順ミスのどちらかになります｡

```sh
# /usr/local/nginx/sbin/nginx -t

nginx: the configuration file /usr/local/nginx/conf/nginx.conf syntax is ok
nginx: configuration file /usr/local/nginx/conf/nginx.conf test is successful
```

#### 2.3.4. サービス起動のスクリプトを作成

```sh
# vi /usr/lib/systemd/system/live_nginx.service
```

```vi
[Unit]
Description=nginx - high performance web server
Documentation=http://nginx.org/en/docs/
After=network.target remote-fs.target nss-lookup.target
[Service]
Type=forking
ExecStartPre=/usr/local/nginx/sbin/nginx -t -c /usr/local/nginx/conf/nginx.conf
ExecStart=/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/bin/kill -s TERM $MAINPID
PrivateTmp=true
[Install]
WantedBy=multi-user.target
```

#### 2.3.5. サービス起動 & 自動起動

- 起動

```sh
# systemctl start live_nginx.service
```

- 自動起動

```sh
# systemctl enable live_nginx.service

Created symlink from /etc/systemd/system/multi-user.target.wants/live_nginx.service to /usr/lib/systemd/system/live_nginx.service.
```

- サイトにアクセスして以下の様な画面が表示されていたら起動成功

[![Image from Gyazo](https://i.gyazo.com/6248d2c0391e7c472c00d3a29fcee0c5.png)](https://gyazo.com/6248d2c0391e7c472c00d3a29fcee0c5)

---
---

### 2.4. Playerの準備編

#### 2.4.1. 使用する動画コンテンツ

今回は”Big Buck Bunny”コンテンツを[ダウンロード](http://bbb3d.renderfarming.net/download.html)しました。

---

#### 2.4.2. HLSのPlayer

**player.setSrc("hls/obs_test.m3u8");** の、**hls/obs_test** を自分の配信環境に合わせる

```sh
# vi /usr/local/nginx/html/hp_hls.html
```

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>MediaElement</title>
  <!-- MediaElement style -->
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.9/mediaelementplayer.css" />
</head>

<body>
  <!-- MediaElement -->
  <script src="//cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.9/mediaelement-and-player.js"></script>

  <video id="player" width="640" height="360">
</body>
<script type="text/javascript">

      var player = new MediaElementPlayer('player', {
        success: function(mediaElement, originalNode) {
          console.log("Player initialised");
        }
      });
        player.setSrc("hls/obs_test.m3u8");
</script>

</html>
```

##### 2.4.2.1. Live配信をおこなうと以下の様な感じで表示されます

- ブラウザーの場合

[![Image from Gyazo](https://i.gyazo.com/2f60e8eee8b3de8eecb497d719463d78.png)](https://gyazo.com/2f60e8eee8b3de8eecb497d719463d78)

- iphoneの場合

[![Image from Gyazo](https://i.gyazo.com/fe040f16bc9caf31876c3509bbbbec45.png)](https://gyazo.com/fe040f16bc9caf31876c3509bbbbec45)

#### 2.4.3. MPEG-DASH のPlayer

**player.setSrc("dash/obs_test.mpd");** の、**dash/obs_test** を自分の配信環境に合わせる

```sh
# vi /usr/local/nginx/html/hp_dash.html
```

```html
<html>

<head>
  <meta charset="utf-8">
  <title>MediaElement</title>
  <!-- MediaElement style -->
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.9/mediaelementplayer.css" />
</head>

<body>
  <!-- MediaElements -->
  <script src="//cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.9/mediaelement-and-player.js"></script>

  <video id="player" width="640" height="360">
</body>
<script type="text/javascript">

      var player = new MediaElementPlayer('player', {
        success: function(mediaElement, originalNode) {
          console.log("Player initialised");
        }
      });
        player.setSrc("dash/obs_test.mpd");
</script>

</html>
```

#### 2.4.4. Live配信をおこなうと以下の様な感じで表示されます

[![Image from Gyazo](https://i.gyazo.com/c17a65d30997c531a2cc2b8457989036.png)](https://gyazo.com/c17a65d30997c531a2cc2b8457989036)

#### 2.4.5. 閲覧可能な形式の種類をまとめました

代表的なブラウザーなどで検証閲覧が可能かの検証結果を載せておきます。

> <http://global-IP/"対象のURL">

- PC Chrome

|URL|回答|
|:--|:--:|
|hp_hls.html|OK|
|hp_dash.html|OK|
|hls/obs_test.m3u8|NO|
|dash/obs_test.obs.mpd|NO|

- PC Safari

|項目|値|
|:--|:--:|
|hp_hls.html|OK|
|hp_dash.html|OK|
|hls/obs_test.m3u8|OK|
|dash/obs_test.obs.mpd|NO|

- iPhone(Safari/Chrome)

|項目|値|
|:--|:--:|
|hp_hls.html|OK|
|hp_dash.html|NO|
|hls/obs_test.m3u8|OK|
|dash/obs_test.obs.mpd|NO|

---
---

### 2.5. 配信方法 編

[Open Broadcaster Software](https://obsproject.com/ja)を使用します｡

#### 2.5.1. OBS設定

[![Image from Gyazo](https://i.gyazo.com/e1fd3eebb42833c557267d10335da9c5.png)](https://gyazo.com/e1fd3eebb42833c557267d10335da9c5)

#### 2.5.2. OBS配信

- メディアソースかWebカメラなどを配置したら**配信開始**をクリック!

[![Image from Gyazo](https://i.gyazo.com/1c2f8b39140e4d931713af9f8d74a35b.png)](https://gyazo.com/1c2f8b39140e4d931713af9f8d74a35b)

#### 2.5.3. Live配信を見るには

- HLS の場合

> <http://global-IP/hp_hls.html>

```sh
# ll /var/www/html/hls/

total 10160
-rw-r--r-- 1 nobody nobody 1579200 Aug  5 08:22 obs_test-52.ts
-rw-r--r-- 1 nobody nobody 1571868 Aug  5 08:22 obs_test-53.ts
-rw-r--r-- 1 nobody nobody 1597248 Aug  5 08:22 obs_test-54.ts
-rw-r--r-- 1 nobody nobody 1554196 Aug  5 08:22 obs_test-55.ts
-rw-r--r-- 1 nobody nobody 1566416 Aug  5 08:23 obs_test-56.ts
-rw-r--r-- 1 nobody nobody 1538216 Aug  5 08:23 obs_test-57.ts
-rw-r--r-- 1 nobody nobody  728688 Aug  5 08:23 obs_test-58.ts
-rw-r--r-- 1 nobody nobody     230 Aug  5 08:23 obs_test.m3u8
```

- MPEG-DASH の場合

> <http://global-IP/hp_dash.html>

```sh
# ll /var/www/html/dash/

-rw-r--r-- 1 nobody nobody 3081483 Aug  7 01:09 obs_test-81999.m4v
-rw-r--r-- 1 nobody nobody   88975 Aug  7 01:09 obs_test-91999.m4a
-rw-r--r-- 1 nobody nobody 1243711 Aug  7 01:09 obs_test-91999.m4v
-rw-r--r-- 1 nobody nobody     596 Aug  7 01:08 obs_test-init.m4a
-rw-r--r-- 1 nobody nobody     659 Aug  7 01:08 obs_test-init.m4v
-rw-r--r-- 1 nobody nobody    2094 Aug  7 01:09 obs_test.mpd
-rw-r--r-- 1 nobody nobody   87307 Aug  7 01:09 obs_test-raw.m4a
-rw-r--r-- 1 nobody nobody 1241451 Aug  7 01:09 obs_test-raw.m4v
```

#### 2.5.4. 録画先

設定で **record_unique on** にしているので、ファイル名がかぶる事はありません。

こちらは、次回使用します。

```sh
# ll flv/
total 86852
-rw-r--r-- 1 nobody nobody 32139979 Aug  7 01:09 obs_test-1533604079.flv
-rw-r--r-- 1 nobody nobody  2394599 Aug  7 01:13 obs_test-1533604400.flv
-rw-r--r-- 1 nobody nobody 54398087 Aug  7 01:16 obs_test-1533604410.flv
```

以上で**HLSとMPEG-DASHの手軽なLiveサーバ構築**でした｡

## 3. 最後に

今回のソース一覧は、GitHubにて公開を行なっております。

> [Easy_Live_Nginx_Stream](https://github.com/MMaru76/Easy_Live_Nginx_Stream)

FFMPEGを使用しなくても､Live配信ができる事を知れて勉強になりました｡

Qiita : [Live配信サーバの簡単構築](https://qiita.com/MMaru76/items/e2495a87b871bc9cbefe)

---
title: 【備忘録】【Minecraft】Docker を使った Spigot 鯖の構築手順
description: ちょっと立地なSpigot鯖の構築方法
date: 2021-02-21
category:
# sidebar: true
sidebar: "auto"
tags:
  - CentOS 8
  - Spigot
  - Docker
categories:
  - Minecraft
---

[![Image from Gyazo](https://i.gyazo.com/fa1721c7386d1badde157cfe2f388710.jpg)](https://gyazo.com/fa1721c7386d1badde157cfe2f388710)

## 1. はじめに

オンプレミス環境を想定していますが､クラウドサービス内でも構築可能です｡

その場合は､インストール等のコマンドが多少変わったりします｡(随時ググってください｡)

ゴールとしては､Docker コンテナの中で Minecraft サーバーを稼働して､ホストの中で Nginx を動作させます｡

---

## 2. 事前準備

### 2.1. オンプレミスの場合のみ

SELinux と Firewall は無効にします(**必要な場合は､別途準備が必要です<作成中>**)｡

```sh
sudo sed -i -e "s/enforcing/disabled/g" /etc/selinux/config
sudo systemctl stop firewalld ; sudo systemctl disable firewalld
sudo reboot
```

### 2.2. ポート公開一覧

- 80 : Certbot を実行する際に必須
- 443 : HTTPS ポート
- 25565 : Minecraft ポート

---

## 3. 環境構築

随時自分にあった物を入れてください｡

### 3.1. 必要パッケージのインストール

1. システムのアップデート
2. 必要なパッケージのインストール
   - Python 3 系統
   - Git
   - Nginx
3. Docker インストールと起動

```sh
sudo dnf -y upgrade; sudo dnf module -y install python38;sudo dnf install -y nginx git
curl https://download.docker.com/linux/centos/docker-ce.repo -o /etc/yum.repos.d/docker-ce.repo
sudo sed -i -e "s/enabled=1/enabled=0/g" /etc/yum.repos.d/docker-ce.repo
sudo dnf --enablerepo=docker-ce-stable -y install docker-ce
sudo systemctl enable --now docker
```

### 3.2. Docker のセットアップ

1. Docker バージョン確認
   - `docker-ce-20.10.2-3.el8.x86_64`
2. Docker Login をセットアップ

```sh
sudo rpm -q docker-ce
sudo docker login
```

### 3.3. Docker Compose のセットアップ

1. docker-compose のダウンロード
   - バージョンにあったものをDL -> https://github.com/docker/compose/releases/
2. アクセス権限を付与
3. 一般ユーザーでも操作出来るように操作
   - ユーザー名 : ec2-user など

```sh
curl -L https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/sudo docker-compose
sudo chmod 755 /usr/local/bin/docker-compose
sudo docker-compose --version
sudo usermod -a -G docker ユーザー名
```

### 3.4. SSL のセットアップ

1. シンボリックリンクの設定
2. index.html ファイルを適当な場所に設置
3. 証明書を取得

```sh
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo mkdir -P /var/www/html
sudo vim /var/www/html/index.html
sudo certbot certonly --webroot -w /var/www/html -d 任意のドメイン
```

### 3.5. Minecraft のセットアップ

1. docker-compose ファイルの作成
2. ファイルを定義

```sh
vim ~/minecraft/docker-compose.yml
```

```yaml
version: '2'
services:
    minecraft-server:
        container_name: Minecraft_Spigot_01
        image: itzg/minecraft-server
        ports:
            - "8123:8123"
            # - "19132:19132/udp" # 統合版 用のポート
            - "25565:25565"
        tty: true
        stdin_open: true
        restart: always
        volumes:
            - ./vol01:/vol
        environment:
            EULA: "TRUE"
            VERSION: "1.16.4"
            TYPE: "SPIGOT"
            MAX_MEMORY: "4G"
```

#### 3.5.1. 各項目に対する軽い解説

詳しい説明は､【[docker-minecraft-server](https://github.com/itzg/docker-minecraft-server)】を閲覧

- EULA: "TRUE"
  - 同意
- VERSION: "1.16.4"
  - プレイしたいバージョン
- TYPE: "SPIGOT"
  - プレイしたいタイプを選択
- MAX_MEMORY: "4G"
  - どれだけメモリを割り当てるかを指定

---

## 4. Minecraft Server コマンド

- 起動コマンド

```sh
docker-compose -f /home/ユーザー名/minecraft/docker-compose.yml up -d
```

- 停止コマンド

```sh
docker-compose -f /home/ユーザー名/minecraft/docker-compose.yml down
```

---

## 5. オプション編

ココからは､完全にオプションです｡

### 5.1. 自動起動/停止の設定

- 作業とバックアップディレクトリを作成

```sh
mkdir ~/work ~/be_minecraft
```

- 起動スクリプトの準備
  - `vim ~/work/minecraft_start.sh`
  - (使っていない)

```sh
#!/bin/bash
docker-compose -f /home/ユーザー名/minecraft/docker-compose.yml up -d
```

- 停止スクリプトの準備
  - `vim ~/work/minecraft_stop.sh`
  - (使っていない)

```sh
#!/bin/bash
docker-compose -f /home/ユーザー名/minecraft/docker-compose.yml down
```

- バックアップスクリプトの準備
  - `vim ~/work/minecraft_bc.sh`

```sh
#!/bin/bash
tar cvzf /home/ユーザー名/be_minecraft/vanilla_`date "+%Y%m%d_%H%M%S"`.tar.gz /home/ユーザー名/minecraft/vol01/
```

- ログの削除スクリプトの準備
  - `vim ~/work/minecraft_log_del.sh`

```sh
#!/bin/bash
rm -fr /home/ユーザー名/minecraft/vol01/logs/*
```

- Cron の設定
  - 【0時】と【12時】に再起動
    - 00:00/12:00 : サーバー停止
    - 00:03/12:03 : バックアップ
    - 00:08/12:08 : ログファイルの削除
    - 00:10/12:10 : サーバー起動

```sh
crontab -e

=========================================
0 0 * * * /usr/local/bin/docker-compose -f /home/ユーザー名/minecraft/docker-compose.yml down
3 0 * * * /bin/bash /home/ユーザー名/work/minecraft_bc.sh
8 0 * * * /bin/bash /home/ユーザー名/work/minecraft_log_del.sh
10 0 * * * /usr/local/bin/docker-compose -f /home/ユーザー名/minecraft/docker-compose.yml up -d
0 12 * * * /usr/local/bin/docker-compose -f /home/ユーザー名/minecraft/docker-compose.yml down
3 12 * * * /bin/bash /home/ユーザー名/work/minecraft_bc.sh
8 12 * * * /bin/bash /home/ユーザー名/work/minecraft_log_del.sh
10 12 * * * /usr/local/bin/docker-compose -f /home/ユーザー名/minecraft/docker-compose.yml up -d
=========================================
```

### 5.2. Dynmap を HTTPS で見たい

- HTTPS へ強制リダイレクト用のファイルを準備
  - `vim /etc/nginx/conf.d/minecraft.conf`

```less
server {
  listen 80;
  return 301 https://$host$request_uri;
  server_name ドメイン名;

  location /map/ {
    proxy_pass http://localhost:8123/;
  }
}
```

- HTTPS ファイルの準備
  - `vim /etc/nginx/conf.d/minecraft_ssl.conf`

```less
server {
  ssl_certificate  /etc/letsencrypt/live/ドメイン名/fullchain.pem;
  ssl_certificate_key  /etc/letsencrypt/live/ドメイン名/privkey.pem;

  location /map/ {
    proxy_pass http://localhost:8123/;
  }
}
```

### 5.3. ルーターが再起動して IP が変わった時の自動化

[【Route53】EC2 から自身に付与されたパブリックIP を Route53 に設定したい](https://dev.classmethod.jp/articles/route53-record-ip-change-by-aws-cli/)

### 5.4. NewRelic の導入手順

- docker ファイルの準備
  - `vim ~/minecraft/newrelic-infra.dockerfile`

```yaml
FROM newrelic/infrastructure:latest
ADD newrelic-infra.yml /etc/newrelic-infra.yml
```

- ライセンスキー用のファイルを準備
  - `vim ~/minecraft/newrelic-infra.yml`

```yaml
license_key: ライセンスキーを入力
```

- docker-compose の編集
  - `vim ~/minecraft/docker-compose.yml`

```yaml
version: '2'
services:
    agent:
        container_name: Minecraft_NewRelic_01
        build:
            context: .
            dockerfile: newrelic-infra.dockerfile
        cap_add:
            - SYS_PTRACE
        network_mode: host
        pid: host
        privileged: true
        volumes:
            - "/:/host:ro"
            - "/var/run/docker.sock:/var/run/docker.sock"
        restart: unless-stopped

    minecraft-server:
        container_name: Minecraft_Spigot_01
        image: itzg/minecraft-server
        ports:
            - "8123:8123"
            # - "19132:19132/udp"
            - "25565:25565"
        tty: true
        stdin_open: true
        restart: always
        volumes:
            - ./vol01:/vol
        environment:
            EULA: "TRUE"
            VERSION: "1.16.4"
            TYPE: "SPIGOT"
            MAX_MEMORY: "4G"
```

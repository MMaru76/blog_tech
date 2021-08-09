---
title: 【備忘録】【Steam】Docker を使った Valheim ゲームサーバー構築手順
description: ちょっと立地なSpigot鯖の構築方法
date: 2021-02-24
category:
# sidebar: true
sidebar: "auto"
tags:
  - CentOS 8
  - Docker
  - Steam
  - Linux
categories:
  - Valheim
  - Game Server
---

[![Image from Gyazo](https://i.gyazo.com/668a5b6b710b3e9207113de955a6742b.png)](https://gyazo.com/668a5b6b710b3e9207113de955a6742b)

## 1. はじめに

トロール神ゲーをしたくありませんか?

[![Image from Gyazo](https://i.gyazo.com/1942a991122b7dd9c2709d878951c7d8.png)](https://gyazo.com/1942a991122b7dd9c2709d878951c7d8)

それでは､まず･･･Steam で買ってもろて｡</br>
[Valheim](https://store.steampowered.com/app/892970/Valheim/?l=japanese)

すべてを Docker 化してやりたい｡

ゴールとしては､Docker  コンテナの中で Steam Valheim サーバーを稼働させる｡

---

## 2. 事前準備

### 2.1. オンプレミスの場合のみ

SELinux と Firewall は無効にします(**必要な場合は､別途準備が必要です<作成中>**)｡

```bash
sudo sed -i -e "s/enforcing/disabled/g" /etc/selinux/config
sudo systemctl stop firewalld ; sudo systemctl disable firewalld
sudo reboot
```

### 2.2. ポート公開一覧

- 2456/udp
- 2457/upd
- 2458/udp

---

## 3. 環境構築

随時自分にあった物を入れてください｡

### 3.1. 必要パッケージのインストール

1. システムのアップデート
2. 必要なパッケージのインストール
   - Python 3 系統
   - Git
3. Docker インストールと起動

```bash
sudo dnf -y upgrade; sudo dnf module -y install python38;sudo dnf install -y git
sudo curl https://download.docker.com/linux/centos/docker-ce.repo -o /etc/yum.repos.d/docker-ce.repo
sudo sed -i -e "s/enabled=1/enabled=0/g" /etc/yum.repos.d/docker-ce.repo
sudo dnf --enablerepo=docker-ce-stable -y install docker-ce
sudo systemctl enable --now docker
```

### 3.2. Docker のセットアップ

1. Docker バージョン確認
   - `docker-ce-20.10.2-3.el8.x86_64`
2. Docker Login をセットアップ

```bash
sudo rpm -q docker-ce
sudo docker login
```

### 3.3. Docker Compose のセットアップ

1. docker-compose のダウンロード
   - バージョンにあったものをDL -> https://github.com/docker/compose/releases/
2. アクセス権限を付与
3. 一般ユーザーでも操作出来るように操作
   - ユーザー名 : ec2-user など

```bash
sudo curl -L https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod 755 /usr/local/bin/docker-compose
docker-compose --version
sudo usermod -a -G docker ユーザー名
```

### 3.4. Valheim のセットアップ

1. docker-compose ファイルの作成
2. ファイルを定義

```bash
vim ~/valheim/docker-compose.yml
```

```yaml
version: "3"
services:
  valheim:
    image: mbround18/valheim:latest
    ports:
      - 2456:2456/udp
      - 2457:2457/udp
      - 2458:2458/udp
    environment:
      - PORT=2456
      - NAME="サーバーネーム"
      - WORLD="Dedicated"
      - PASSWORD="パスワード"
      - TZ=Asia/Tokyo
      - PUBLIC=1
      - AUTO_UPDATE=1
      - AUTO_UPDATE_SCHEDULE="0 1 * * *"
      - AUTO_BACKUP=1
      - AUTO_BACKUP_SCHEDULE="* */1 * * *"
      - AUTO_BACKUP_REMOVE_OLD=1
      - AUTO_BACKUP_DAYS_TO_LIVE=3
      - AUTO_BACKUP_ON_UPDATE=1
      - AUTO_BACKUP_ON_SHUTDOWN=1
    volumes:
      - ./valheim_dh/saves:/home/steam/.config/unity3d/IronGate/Valheim
      - ./valheim_dh/server:/home/steam/valheim
      - ./valheim_dh/backups:/home/steam/backups
```

> 現時点の Tree 構造

```bash
$ tree
.
└── docker-compose.yml
```

詳しい項目に対する説明は [mbround18/valheim-docker](https://github.com/mbround18/valheim-docker) リポジトリを確認｡

---

## 4. valheim Server 起動コマンド

- 起動コマンド

```bash
docker-compose -f /home/ユーザー名/valheim/docker-compose.yml up -d
```

- 停止コマンド

```bash
docker-compose -f /home/ユーザー名/valheim/docker-compose.yml down
```

> 現時点の Tree 構造

```html
$ tree
.
├── docker-compose.yml
├── test.log
└── valheim_dh
    ├── backups
    ├── saves
    │   ├── adminlist.txt
    │   ├── bannedlist.txt
    │   ├── permittedlist.txt
    │   ├── prefs
    │   └── worlds
    │       ├── Dedicated.db
    │       ├── Dedicated.db.old
    │       ├── Dedicated.fwl
    │       └── Dedicated.fwl.old
    └── server
        ├── LinuxPlayer_s.debugt
        ├── UnityPlayer.so
        ├── UnityPlayer_s.debug
        ├── Valheim Dedicated Server Manual.pdf
        ├── config.json
        ├── linux64
        │   └── steamclient.so
        ├── logs
        │   ├── auto-backup.out
        │   ├── auto-update.out
        │   ├── output.log
        │   ├── valheim_server.err
        │   └── valheim_server.log
        ├── server_exit.drp
        ├── start_server.sh
        ├── start_server_xterm.sh
        ├── steam_appid.txt
        ├── steamapps
        │   ├── appmanifest_896660.acf
        │   ├── downloading
        │   ├── libraryfolders.vdf
        │   ├── shadercache
        │   └── temp
        ├── steamclient.so
        ├── valheim_server.x86_64
        └── valheim_server_Data
            ├── Managed
            │   └── 省略
            ├── MonoBleedingEdge
            │   └── 省略
            ├── Plugins
            │   └── libsteam_api.so
            ├── Resources
            │   ├── UnityPlayer.png
            │   ├── unity default resources
            │   └── unity_builtin_extra
            ├── app.info
            ├── boot.config
            ├── globalgamemanagers
            ├── globalgamemanagers.assets
            ├── globalgamemanagers.assets.resS
            ├── level0
            ├── level0.resS
            ├── level1
            ├── level2
            ├── level3
            ├── level4
            ├── level4.resS
            ├── resources.assets
            ├── resources.assets.resS
            ├── sharedassets0.assets
            ├── sharedassets0.assets.resS
            ├── sharedassets1.assets
            ├── sharedassets1.assets.resS
            ├── sharedassets1.resource
            ├── sharedassets2.assets
            ├── sharedassets3.assets
            ├── sharedassets3.assets.resS
            ├── sharedassets3.resource
            └── sharedassets4.assets

27 directories, 129 files
```

## 5. データの初期化方法

一部のファイルが root 権限で削除する必要があります｡

```bash
sudo rm -fr valheim_dh/
```
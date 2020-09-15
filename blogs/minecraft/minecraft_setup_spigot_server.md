---
title: 【Minecraft】Spigot鯖構築
description: ちょっと立地なSpigot鯖の構築方法
date: 2020-07-29
category: 
# sidebar: true
sidebar: "auto"
tags:
  - CentOS7
  - Spigot
categories:
  - Minecraft
---

## 1. はじめに

オンプレミス環境を想定していますが､クラウドサービス内でも構築可能です｡

- $ : 一般ユーザー
- \# : root ユーザー
- === : ファイルの中身
- mincraft> : Minecraft のコンソール内

## 2. ソースコードの全体

説明なんて不要だから､ちゃちゃっと初めたい人向け

```sh
$ cd /opt/minecraft/
$ wget https://hub.spigotmc.org/jenkins/job/BuildTools/lastSuccessfulBuild/artifact/target/BuildTools.jar
$ java -jar BuildTools.jar
$ cp spigot-X.XX.X.jar server.jar
$ vim start.sh
================================================================
#!/bin/sh
java -Xmx2048M -Xms1024M -jar /opt/minecraft/server.jar nogui
================================================================

$ chmod +x start.sh
$ sh start.sh
$ sed -i -e "s/eula=false/eula=true/g" eula.txt
$ sh start.sh
minecraft> stop
$ sudo vim /etc/systemd/system/minecraft_server.service
================================================================
[Unit]
Description= Minecraft Server
After=network-online.target

[Service]
ExecStart= /bin/bash /opt/minecraft/start.sh
WorkingDirectory=/opt/minecraft
Restart=always
User=TestUser
Group=TestUser

[Install]
WantedBy=multi-user.target
================================================================

$ sudo systemctl daemon-reload
$ sudo systemctl restart minecraft_server.service
$ sudo systemctl status minecraft_server.service
```

## 3. 事前準備

### 3.1. オンプレミスの場合のみ

SELinux と Firewall は無効にします(必要な場合は､別途準備が必要です<作成中>)｡

```sh
$ sudo sed -i -e "s/enforcing/disabled/g" /etc/selinux/config
$ sudo systemctl stop firewalld ; sudo systemctl disable firewalld
$ sudo reboot
```

## 4. 環境構築

### 4.1. 必要パッケージのインストール

1. Java と Git のインストール
2. Java のバージョン確認

```sh
$ sudo yum -y install java git
$ java -version
=> openjdk version "1.8.0_252"
=> OpenJDK Runtime Environment (build 1.8.0_252-b09)
=> OpenJDK 64-Bit Server VM (build 25.252-b09, mixed mode)
```


### 4.2. 作業ディレクトリとファイルの準備

1. ディレクトリを作成
   - /opt/minecraft
2. User.Groupの変更
   - TestUser を任意のユーザー名に変更

```sh
$ sudo mkdir /opt/minecraft
$ sudo chown TestUser. /opt/minecraft/
```

### 4.3. 各種ファイルの準備

1. ディレクトリの移動
   - /opt/minecraft
2. Spigot 本体の取得
3. 必要なファイル等の取得
4. 【spigot-X.XX.X.jar】ファイルを【server.jar】へ変更
5. `start.sh` ファイルを作成

```sh
$ cd /opt/minecraft/
$ wget https://hub.spigotmc.org/jenkins/job/BuildTools/lastSuccessfulBuild/artifact/target/BuildTools.jar
$ java -jar BuildTools.jar
$ cp spigot-X.XX.X.jar server.jar
$ touch start.sh
```

### 4.4. 実行ファイルの準備

好きなエディターで ```start.sh``` を編集

- 最小メモリの指定
  - Xms1024M
- 最大メモリの指定
  - Xmx2048M

```sh
#!/bin/sh
#screen -AmdS maikura java -Xmx10240M -Xms1024M -jar /opt/minecraft/server.jar nogui
java -Xmx2048M -Xms1024M -jar /opt/minecraft/server.jar nogui
```

### 4.5. 実行

1. `start.sh` に対して実行権限を付与
2. `start.sh` を実行して､自動的に止まらせる
3. 規約書に同意
4. 再度 `start.sh` を実行
5. 各種生成が完了したら､`stop` と入力して一旦サーバを止める

```sh
$ chmod +x start.sh
$ sh start.sh
$ sed -i -e "s/eula=false/eula=true/g" eula.txt
$ sh start.sh
minecraft> stop
```

### 4.6. 自動化

- Minecraft ようの Unit 定義ファイルを新規作成

```sh
sudo vim /etc/systemd/system/minecraft_server.service
```

- 記述内容

```vim
[Unit]
Description= Minecraft Server
After=network-online.target

[Service]
ExecStart= /bin/bash /opt/minecraft/start.sh
WorkingDirectory=/opt/minecraft
Restart=always
User=TestUser
Group=TestUser

[Install]
WantedBy=multi-user.target
```

1. デーモンリロード
2. Unit が Service として認識されたか確認
3. Minecraft サーバーを起動 ON
4. Minecraft サーバーを自動起動 ON

```sh
$ sudo systemctl daemon-reload
$ sudo systemctl list-unit-files --type=service | grep "minecraft_server"
$ sudo systemctl start minecraft_server.service
$ sudo systemctl enable minecraft_server.service
```

---

## 5. 余分な実装

こちらは特に解説は無いです｡将来的に実装する予定ですが､現状全く使っていないです｡

```sh
touch movecp.sh
chmod +x movecp.sh
```

```sh
LASTLOG=`tail -n 1 /opt/minecraft/logs/latest.log`
LOGDIR=/opt/minecraft/logs/
INFO_LOG=$LOGDIR"info_minecraft.log"
UUID_LOG=$LOGDIR"uuid_minecraft.log"
WARN_LOG=$LOGDIR"warn_minecraft.log"
ERROR_LOG=$LOGDIR"error_minecraft.log"
UNKNOWN_LOG=$LOGDIR"unknown_minecraft.log"


if [[ $LASTLOG == *"UUID"* ]]
then
    echo `date` : $LASTLOG >> $UUID_LOG

elif [[ $LASTLOG == *"WARN"* || $LASTLOG == *"warn"* ]]
then
    echo `date` : $LASTLOG >> $WARN_LOG

elif [[ $LASTLOG == *"ERROR"* || $LASTLOG == *"error"* ]]
then
    echo `date` : $LASTLOG >> $ERROR_LOG

else
    echo `date` : $LASTLOG >> $UNKNOWN_LOG

fi
```
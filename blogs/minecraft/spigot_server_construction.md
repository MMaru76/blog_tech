---
title: 【作成中】【Minecraft】Spigot鯖構築
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

## はじめに<br>[Introduction.]

オンプレミス環境を想定していますが､クラウドサービス内でも構築可能です｡<br>The system is designed for an on-premise environment, but can also be built within a cloud service.

## ソースコードの全体<br>[The whole of the source code]

- $ : 一般ユーザー / General User
- \# : root ユーザー / Super User
- === : ファイルの中身 / file contents
- mincraft> : Minecraftのコンソール内 / In the console of Minecraft

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

## 事前準備<br>[AdvancePreparation]

### オンプレミスの場合のみ<br>[On-premise only]

SELinux と Firewall は無効にします(必要な場合は､別途準備が必要です<作成中>)｡
> Disable SELinux and Firewall (if you need it, you need to prepare it separately \<in the making>).

```sh
$ sudo sed -i -e "s/enforcing/disabled/g" /etc/selinux/config 
$ sudo systemctl stop firewalld ; sudo systemctl disable firewalld
$ sudo reboot
```

## 環境構築<br>[Construction of the Environment]

### 必要パッケージのインストール<br>[Installing the required packages]

- Java と Git のインストール / Installing Java and Git
  
```sh
$ sudo yum -y install java git
$ java -version
=> openjdk version "1.8.0_252"
=> OpenJDK Runtime Environment (build 1.8.0_252-b09)
=> OpenJDK 64-Bit Server VM (build 25.252-b09, mixed mode)
```


### 作業ディレクトリとファイルの準備

- ディレクトリを作成
  - /opt/minecraft
- User.Groupの変更
  - TestUser を任意のユーザー名に変更
- サーバーのデータを取得

```sh
$ sudo mkdir /opt/minecraft
$ sudo chown TestUser. /opt/minecraft/
```

### 各種ファイルの準備

- ディレクトリの移動
  - /opt/minecraft
- Spigot 本体の取得
- 必要なファイル等の取得
- 【spigot-X.XX.X.jar】ファイルを【server.jar】へ変更

```sh
$ cd /opt/minecraft/
$ wget https://hub.spigotmc.org/jenkins/job/BuildTools/lastSuccessfulBuild/artifact/target/BuildTools.jar
$ java -jar BuildTools.jar
$ cp spigot-X.XX.X.jar server.jar
$ touch start.sh
```

### 実行ファイルの準備

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

### 実行

- start.shに対して実行権限を付与

```sh
$ chmod +x start.sh
$ sh start.sh
$ sed -i -e "s/eula=false/eula=true/g" eula.txt
$ sh start.sh
minecraft> stop
```

### 自動化
```sh
sudo vim /etc/systemd/system/minecraft_server.service
```

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

```sh
$ sudo systemctl daemon-reload
$ sudo systemctl restart minecraft_server.service
$ sudo systemctl status minecraft_server.service
```

## 余分な実装

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
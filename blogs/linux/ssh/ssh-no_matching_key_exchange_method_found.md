---
title: 【Linux SSH】ssh no matching key exchange method found.
date: 2020-06-04
# 1. sidebar: true
sidebar: "auto"
tags:
  - SSH
categories:
  - Linux
---

Mac でssh接続をした時 no matching key exchange method found. Their offer diffie-hellman-group-exchange-sha1,diffie-hellman-group1-sha1 に見る記事｡

## 環境

- macOS Catalina
  - バージョン 10.15.5（19F101）
- MacBook Pro (13-inch, 2016, Four Thunderbolt 3 Ports)
- プロセッサ
  - 3.1 GHz デュアルコアIntel Core i5
- メモリ
  - 16 GB 2133 MHz LPDDR3
- グラフィック
  - Intel Iris Graphics 550 1536 MB

## エラー内容

```sh
$ ssh ユーザ名@IPアドレス

Unable to negotiate with (IPアドレス) port 22: 
no matching key exchange method found. 
Their offer: diffie-hellman-group-exchange-sha1,diffie-hellman-group1-sha1
```

## 解決方法

```~/.ssh/config``` ファイルを開いて3行目~5行目を追加

```sh{3,4,5}
$ vim ~/.ssh/config

Host *
Ciphers +3des-cbc,aes128-cbc,aes192-cbc,aes256-cbc
KexAlgorithms +diffie-hellman-group1-sha1
```

### 新規でconfig作成の場合

新規で作成する場合はPermissionを設定する必要がある

```sh
$ chmod 600 ~/.ssh/config
```

### 権限などの確認

```sh
$ ls -al ~/.ssh/config
-rw------- 1 ユーザー名 グループ名 58 May 30 22:16 /home/ユーザー名/.ssh/config
```

## 再度接続

設定とPermissionの操作が出来たら再度接続確認をしてみると､接続できるかと思います｡

```sh
$ ssh ユーザ名@IPアドレス

The authenticity of host 'IPアドレス' can't be established.
RSA key fingerprint is SHA256:秘密.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'IPアドレス' (RSA) to the list of known hosts.
ユーザ名@IPアドレス's password:
Last login: Sat May 30 21:53:13 2020 from 接続元
[ユーザ名@IPアドレス ~]$
```
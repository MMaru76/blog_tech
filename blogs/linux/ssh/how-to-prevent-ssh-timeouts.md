---
title: 【Linux SSH】タイムアウトを防ぐ方法
date: 2019-08-19
# sidebar: true
sidebar: "auto"
tags:
  - SSH
categories:
  - Linux
---

[![Image from Gyazo](https://i.gyazo.com/96564743f375cc1ac66479a73998bbc8.png)](https://gyazo.com/96564743f375cc1ac66479a73998bbc8)

## 1. はじめに

EC2のインスタンスに対してSSH接続してる最中に､パソコンの前から離れる事があると思いますが､例えばトイレから帰ってきたら･･･

```bash
packet_write_wait: Connection to xxx.yyy.aaa.ooo port 22: Broken pipe
```

接続が切れてる？！って事がよくあると思うので対策方法を備忘録として残しておきます｡

## 2. クライアント(Mac)側の設定

お好みのエディタで ~/.ssh/config を作成または開く

```bash
vim ~/.ssh/config
```

下記の内容をそのまま記述

```bash
Host *
  ServerAliveInterval 60
```

画像の様に記述されていれば問題ありません｡

[![Image from Gyazo](https://i.gyazo.com/2ce385edf8a00317cd6cfe4ef9b4239e.png)](https://gyazo.com/2ce385edf8a00317cd6cfe4ef9b4239e)

### 2.1. 簡単な解説

- Host *
  - すべてのサーバーに対して
- ServerAliveInterval 60
  - 自動的に60秒毎にサーバが生きてるかを問い合わせ

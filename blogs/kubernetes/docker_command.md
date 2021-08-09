---
title: 【随時更新】Docker 基本的なコマンド一覧
description: 基本的な Docker のコマンド
date: 2020-08-15
# sidebar: true
sidebar: "auto"
tags:
  - コマンド使い方
categories:
  - Docker
---

## Docker Hub 関連

Docker Hub のサイト : [https://hub.docker.com/](https://hub.docker.com/)

- ログイン

```bash
$ docker login
=> Username : ユーザー名入力
=> Passowrd : パスワード入力
=> Login Succeeded (ログイン成功)
```

- ログアウト

```bash
$ docker logout
```

- イメージのタグを付け替え

```bash
$ docker image tag sample-image:0.1 DOCKERHUB_USER/sample-image:0.1
```

【**Docker レジストリのホスト名**】/【**ネームスペース**】【**リポジトリ**】:【**タグ**】

```
フォーマットの一例

docker.io/DOCKERHUB_USER/sample-image:0.1
    もしくは
DOCKERHUB_USER/sample-image:0.1
```

- イメージをプッシュ

```bash
$ docker image push DOCKERHUB_USER/sample-image:0.1
```

- 直接プッシュ出来る名前を付けてビルド

```bash
$ docker image build -t DOCKERHUB_USER/sample-image:0.1
```

---

## イメージの一覧確認

- Docker イメージの確認

|項目|概要|
|:--:|:--:|
|REPOSITORY|ローカルレジストリ|
|TAG|タグ|
|IMAGE ID|イメージのID|
|CREATED|作成日|
|SIZE|イメージのサイズ|

```bash
$ docker image ls
```
> 以前のコマンド `$ docker images`

---

## イメージのビルド

- Dockerfile で sample-image:0.1 のイメージをビルド
- 現在のディレクトリ内に存在する Dockerfile ファイルを下記の値としてビルド
    - レジストリ名 【saple-image】
    - タグを 【0.1】

```bash
$ docker image build -t sample-image1:0.1 .
```

- Dockerfile-sample2 で sample-image:0.2 のイメージをビルド
- 現在のディレクトリ内に存在する Dockerfile-sample2 ファイルを下記の値としてビルド
    - レジストリ名 【saple-image】
    - タグを 【0.2】

```bash
$ docker image build -t sample-image:0.2 -f Dockerfile-sample2 .
```
---

## コンテナの起動

- localhost:12345 宛のポートを 8080/TCP ポートに転送

```bash
$ docker container run -d -p 12345:8080 sample-image:0.1
```

---
title: 【Docker】 Dockerfileの書き方
description: 基本的な Dockerfile の書き方
date: 2020-08-14
# sidebar: true
sidebar: "auto"
tags:
  - Docker
categories:
  - Docker
---

## ENTRYPOINT と CMD の関係

|ENTRYPOINT|CMD|実行されるコマンド|
|:--:|:--:|:--:|
|"/bin/ls"|"-a"|/bin/ls -a|
|"bin/ls"|指定なし|/bin/ls|
|指定なし|/bin/ls|/bin/ls|
|"/bin/sh", "-c"|"ls -a"|/bin/sh -c "ls -a"|

## Dockerfile で利用可能な命令

|命令|概要|
|:--:|:--:|
|FROM|ベースイメージを指定|
|MAINTAINER|コンテナイメージのメンテナを記載<br>(**現在は非推奨｡下記のLABEL命令を用いる**)|
|LABEL|コンテナイメージのメタデータを **key:value** 形式で指定|
|USER|コマンドの実行ユーザーを指定|
|WORKDIR|コマンドを実行する作業ディレクトリを指定<br>(**ディレクトリが存在しない場合は新規作成**)|
|EXPOSE|コンテナ実行時に Listen するポートを指定|
|COPY|ローカルにあるファイルをコンテナにコピー|
|ADD|ローカルにある tar.gz ファイルの展開をして､ファイルをコンテナにコピー|
|RUN|コンテナ内でコマンドを実行|
|ENTRYPOINT|コンテナ起動時に実行するコマンド|
|CMD|コンテナ起動時に実行するコマンドの引数|
---
title: 【CloudWatch】ロググループの保存期間一括変更手順
description: 保存期間を一括で変恋う
date: 2020-07-02
# sidebar: true
sidebar: "auto"
tags:
  - CloudWatch
categories:
 - AWS
---

## はじめに

- Git Bash では動きません
- jqコマンド は使っていません

## 事前準備

::: tip 参考リンク
- [【IAM Role】 EC2へ付与手順](https://tech.tabiya.dev/posts/aws/iam/iam-role-on-ec2-attach.html)
- [【EC2】定期的にCloudWatch ログストリームの削除手順](https://tech.tabiya.dev/posts/aws/iam/logstream-all-delete.html)
:::

## 環境構築

### 作業ディレクトリとファイルの準備

- ディレクトリを作成
  - work
- ファイルを作成
  - Retention_Period_Change.sh


```sh
$ mkdir work
$ cd ./work
$ touch Retention_Period_Change.sh
```

### 実行ファイルの準備

好きなエディターで ```Retention_Period_Change.sh``` を編集

```sh
#!/bin/bash

# -------------------------------------------------------------------
## ロググループ一覧取得/Get LogGroupName List
LOGLIST=TESTlog.tmp

aws logs describe-log-groups --profile TEST | \
    grep "logGroupName" | \
    awk '{print substr($0, 30)}' | \
    sed -e 's/\"\,//g' >> TESTlog.tmp
# -------------------------------------------------------------------

# -------------------------------------------------------------------
## 保存期間/Shelf life
TEST=1
PRE=3
PRO=5
retention_in_days=$TEST

while read line
do
    LISTS="$line"
    aws logs put-retention-policy \
    --profile TEST \
    --log-group-name ${LISTS} \
    --retention-in-days ${retention_in_days}
done < ${LOGLIST}
# -------------------------------------------------------------------
```

### 【ロググループ一覧取得】 解説

- grep で logGroupName 行だけを取得
- awk で最初の空白から"(ダブルクォート)開始まで削除
- sed で末尾の ",(ダブルクォートとカンマ) を削除
- TESTlog.tmp に書き込み

```sh
aws logs describe-log-groups --profile TEST | \
    grep "logGroupName" | \
    awk '{print substr($0, 30)}' | \
    sed -e 's/\"\,//g' >> TESTlog.tmp
```

### 保存期間の指定

開発/検証/本番環境で別ける時にご利用ください｡

```sh
## 保存期間/Shelf life
TEST=1
PRE=3
PRO=5
retention_in_days=$TEST
```
---
title: 【EC2】定期的にCloudWatch ログストリームの削除手順
description: 無限に生成されるログを定期的に削除
date: 2020-06-07
# sidebar: true
sidebar: "auto"
tags:
  - EC2
  - IAM
  - Role
  - CloudWatch
categories:
 - AWS
---

## 事前準備

::: tip 参考リンク
[【IAM Role】 EC2へ付与手順](https://tech.tabiya.dev/posts/aws/iam/iam-role-on-ec2-attach.html)
:::

## EC2インスタンスに対してロールアタッチ

- 【EC2】 -> 【ステップ3:インスタンスの詳細の設定】 -> 【IAMロール】 にて作成したロールを選択

[![Image from Gyazo](https://i.gyazo.com/19d589ae9ad2e1e664aa5aea25d619d6.png)](https://gyazo.com/19d589ae9ad2e1e664aa5aea25d619d6)

## 環境構築編

> ロールをアタッチ済みのインスタンスにSSHしている前提

### パッケージ更新

```bash
$ sudo yum -y update
$ sudo reboot
```

### AWS CLI バージョン 2 導入手順

::: tip 参考リンク
[【EC2 AmazonLinux2】 AWS CLI バージョン 2 セットアップ](https://tech.tabiya.dev/posts/aws/ec2/amazon-linux-cli.html)
:::

### YAML用のプロファイル作成

```yaml
$ aws configure --profile output_yaml

AWS Access Key ID [None]:                   <- Enter
AWS Secret Access Key [None]:               <- Enter
Default region name [None]: ap-northeast-1  <- リージョン を入力
Default output format [None]: yaml          <- json/yaml を入力
```

### 作業ディレクトリとファイルの準備

- ディレクトリを作成
    - work
- ファイルを作成
    - delete-log-test.sh
        - 実行ファイル
    - log_group_name.tmp
        - ロググループ
    - logs_stream_name.tmp
        - ログストリーム

```bash
$ mkdir /home/ec2-user/work
$ cd /home/ec2-user/work
$ touch delete-log-test.sh {log_group_name,logs_stream_name}.tmp
```

### 実行ファイルの準備

好きなエディターで ```delete-log-test.sh``` を編集

```bash
#!/bin/bash
LOG_GROUP_NAME=log_group_name.tmp
LOG_STREAM_NAME=logs_stream_name.tmp

# -------------------------------------------------------------------
while read line
do
  aws logs describe-log-streams --profile output_yaml --log-group-name "$line" | \
    grep "logStreamName:" | \
    awk '{print substr($0, 18)}' > ${LOG_STREAM_NAME}
  
  LOG_GROUP_LIST="$line"
  
  while read line
  do
    echo "start : `date '+%y/%m/%d %H:%M:%S'`"
    echo "$line"
    aws logs delete-log-stream --profile output_yaml \
          --log-group-name ${LOG_GROUP_LIST} \
          --log-stream-name $line
  done < ${LOG_STREAM_NAME}
done < ${LOG_GROUP_NAME}

cp /dev/null logs_stream_name.tmp
# -------------------------------------------------------------------
```

### 削除希望のロググループを記述

好きなエディターで ```log_group_name.tmp``` にロググループを追記

- 注意点として最終行と改行を入れる

例↓
```properties
/aws/lambda/test
/aws/lambda/db-test
/aws/lambda/db-test1
<改行>
```

### cron 設定

::: danger 時間について
EC2 のデフォルトTimeZoneは *UTC* なので注意
:::

|指定対象|指定範囲|
|:--:|:--:|
|分|0〜59|
|時|0〜23|
|日|1〜31|
|月|1〜12 または jan〜dec|
|曜日|0〜7 または sun〜sat|

- cron を編集する為の専用コマンド

```bashll
$ crontab -e
```

- 今回の起動条件は､毎日(JST)20:30に実行をしたい為､(UTC)11:30と登録

```vim
PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:"
30 11 * * * cd /home/ec2-user/work/; sh delete-log-test.sh
```

#### cron 実行時の確認コマンド

- 起動ログ等を確認する場合

```bash
$ sudo tail -F /var/log/cron
```

- 実行ログを確認する場合

```bash
$ tail -F /var/spool/mail/ec2-user
```
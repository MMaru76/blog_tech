---
title: 【AWS Route53】レコードを自動で定期的に更新したい
date: 2021-02-07
# sidebar: true
sidebar: "auto"
tags:
  - Route53
  - CentOS 8
categories:
  - AWS
---

## 1. はじめに

｢Minecraft サーバーを全力で楽して運用をする!!!｣モットーに､様々なスキルを身に着けています｡

当初は､Google Domainで全て完結させようと思っていましたが､思ったより手こずったので､AWS Route53 で実現させました｡

### 1.1. 前提

- CentOS Stream/CentOS 8
- [AWS CLI 2](https://tabiya.dev/blogs/aws/compute/amazon-linux2-cli.html)
  - `aws-cli/2.1.24 Python/3.7.3 Linux/4.18.0-269.el8.x86_64 exe/x86_64.centos.8 prompt/off`
- ルーターがぶっ壊れて再起動が入っても､レコードの自動更新をしてほしい
  - (弊家はルーターの再起動が入るとグローバルIPが強制的に変わる)
- Route53にホストゾーンにドメインを登録済み

## 2. シェルスクリプトファイルの準備

ここでは､ユーザー配下の `work` というディレクトリに実行ファイルを置いていますが､任意の所に置いてください｡

```bash
cd ; mkdir work ; vim /home/UserName/work/route53.sh
```

```bash
#!/bin/bash
DOMAIN_NAME="ドメイン名を記述"
IP_ADDRESS=`curl -s inet-ip.info`

HOSTED_ZONE_ID="ZONE-IDを入力"

BATCH_JSON='{
  "Changes": [
    { "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "'${DOMAIN_NAME}'",
        "Type": "A",
        "TTL" : 300,
        "ResourceRecords": [
          { "Value": "'${IP_ADDRESS}'" }
        ]
      }
    }
  ]
}'

aws route53 change-resource-record-sets --hosted-zone-id ${HOSTED_ZONE_ID} --change-batch "${BATCH_JSON}"
```

## 3. Systemd/サービスユニットの準備

- ファイルの場所

```bash
sudo vim /etc/systemd/system/route53_set.service
```

```bash
[Unit]
Description= Route53 Set And TimeLoop
After=network-online.target

[Service]
ExecStart= /bin/bash /home/UserName/work/route53.sh
WorkingDirectory=/home/UserName/work
Type=oneshot
User=UserName
Group=UserName

[Install]
WantedBy=multi-user.target
```

## 4. Systemd/タイマーユニットの準備

- ファイルの場所

```bash
sudo vim /etc/systemd/system/route53_set.timer
```

毎時40分に実施する場合は､`OnCalendar=*-*-* *:40:00` と記述

```bash
[Unit]
Description=Route53 And TimeLoop

[Timer]
OnCalendar=*-*-* *:40:00
Unit=route53_set.service

[Install]
WantedBy=multi-user.target
```

## 5. 最後に

`cron` で書けばもっと楽に出来たのでは?!っというのは､内緒です｡

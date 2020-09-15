---
title: 【IAM Role】 EC2へ付与手順
description: IAM Role 作成
date: 2020-06-06
# sidebar: true
sidebar: "auto"
tags:
  - IAM
  - Role
categories:
 - AWS
---

## 環境
- 利用サービス : IAM Role
- リージョン : ap-northeast-1


## IAM ロール 作成手順

1. AWS コンソールにて [IAM ロール](https://console.aws.amazon.com/iam/home?region=ap-northeast-1#/roles)ページにアクセス
    - リージョンは任意
2. 【ロールの作成】 を選択

[![Image from Gyazo](https://i.gyazo.com/4359f03f56053c1ae987e5e7e834bd72.png)](https://gyazo.com/4359f03f56053c1ae987e5e7e834bd72)

### Step 1 : 【EC2】を選択

- 【EC2】 を選択

[![Image from Gyazo](https://i.gyazo.com/a6007ce8e1957df0ed0b3f3b9c09bda9.png)](https://gyazo.com/a6007ce8e1957df0ed0b3f3b9c09bda9)

### Step 2 : 付与したいポリシーを選択

- 付与したいポリシーを選択

[![Image from Gyazo](https://i.gyazo.com/aa889437c3c052af7a448b1de48d9e84.png)](https://gyazo.com/aa889437c3c052af7a448b1de48d9e84)

### Step 4 : アタッチ一覧の確認

任意のロール名を入力してアタッチされているポリシーが正しいか確認を行う｡

- ロール名
    - [必須] ロールの名前
- ロールの説明
    - [任意] 説明文
- ポリシー
    - 希望するポリシーがアタッチされているか確認

[![Image from Gyazo](https://i.gyazo.com/352d55fea1b983beda027a1c27947cae.png)](https://gyazo.com/352d55fea1b983beda027a1c27947cae)

## 確認

上記で作成したロール名を検索ボックスにて検索して作成されたかを確認を行う｡

[![Image from Gyazo](https://i.gyazo.com/60d39f61411e2ff1ada5a4026b4d6888.png)](https://gyazo.com/60d39f61411e2ff1ada5a4026b4d6888)
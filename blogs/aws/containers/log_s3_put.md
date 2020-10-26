---
title: 【AWS ECS】コンテナログをS3に直接出力手順
date: 2020-10-26
# sidebar: true
sidebar: "auto"
tags:
  - ECS
  - S3
  - Fluent Bit
categories:
  - AWS
---

## 1. はじめに

---

この記事を投稿する10日前にいつも通り朝活として､[YouTube のサバワチャンネル](https://youtu.be/PGAaBrOjbw4)で動画を見ていたら､『コンテナログを S3 に直接出力!』というパワーワードを知ってしまって･･･これはやらなきゃ!!!っという事で実際にやって書きました｡

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">AWSが｢Fluent Bit がコンテナログをルーティングする送信先として Amazon S3 をサポート｣らしいですよ｡<a href="https://t.co/m6uYG1Uejg">https://t.co/m6uYG1Uejg</a></p>&mdash; まるちゃんLv24@DevOps (@M_Maru76) <a href="https://twitter.com/M_Maru76/status/1316897982659223552?ref_src=twsrc%5Etfw">October 16, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

CloudWatch のログに書き込みを行うと0.76USD/GB掛かって辛いですよね･･･

## 2. 【IAM ロール】編

---

1. [IAMロールのコンソール](https://console.aws.amazon.com/iam/home#/roles)にアクセスして【ecsTaskExecutionRole】を検索して選択
   - 別のタスクロールの場合は､そちらを指定
2. 【ecsTaskExecutionRole】のロールにて､【インラインポリシー】を選択して下記コードを追加

- 内容としては､｢S3に書き込み｣です｡

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "s3:PutObject",
            "Resource": "*"
        }
    ]
}
```

- 実際に追加された際の画面

[![Image from Gyazo](https://i.gyazo.com/c500341c18c13372d6b38db4297f79bf.png)](https://gyazo.com/c500341c18c13372d6b38db4297f79bf)

## 3. 【ECS タスク定義】編

---

1. ECS のコンソールページにアクセス
2. 【タスク定義】を選択
3. 既存のタスク定義を選択
4. 【新しいリビジョンの作成】を選択

### 3.1. 【ログルーターの統合】 にて

ログルーターの統合にて【FireLens の統合を有効にする】にチェックを入れて､編集せずに【適用】を選択

[![Image from Gyazo](https://i.gyazo.com/17972adc30b78d0270c48670b5650048.png)](https://gyazo.com/17972adc30b78d0270c48670b5650048)

### 3.2. 【コンテナの定義】 にて

|項目|値|
|:--:|:--:|
|LogS3-lxc|Myサービスコンテナ側|
|log_router|AWS for Fluent Bit コンテナ側|

[![Image from Gyazo](https://i.gyazo.com/53784d01b0b0033db7a492df9493eb5b.png)](https://gyazo.com/53784d01b0b0033db7a492df9493eb5b)

#### 3.2.1. 【LogS3-lxc】 コンテナ側

『ストレージとログ』の所にて下記の用に変更を実施

1. ログドライバー :【awslogs】から【awsfirelens】切り替え
2. ログオプション : 下記テーブルを参考
   - region : ECS サービスを動かすリージョンを指定
   - bucket : 自分で作成したバケット名を記述
   - total_file_size : 1M だと動かなった模様

|KEY|VALUE|
|:--:|:--:|
|Name|s3|
|region|ap-northeast-1|
|bucket|tabiya-logs|
|total_file_size|250M|

[![Image from Gyazo](https://i.gyazo.com/a9f7368fc362945a35a633c7856bbde9.png)](https://gyazo.com/a9f7368fc362945a35a633c7856bbde9)

#### 3.2.2. 【log_router】 コンテナ側

『ストレージとログ』の所にて下記の用に変更を実施

1. ログドライバー :【awsfirelens】から【awslogs】切り替え
2. ログオプション : 下記テーブルを参考

|KEY|VALUE|用途|
|:--:|:--:|:--:|
|awslogs-group|firelens-container||
|awslogs-region|ap-northeast-1||
|awslogs-stream-prefix|firelens||
|awslogs-create-group|true||

[![Image from Gyazo](https://i.gyazo.com/c804fd16eafbff0773e7ed74ca040d11.png)](https://gyazo.com/c804fd16eafbff0773e7ed74ca040d11)

## 4. 実際の画面

---

S3の該当バケットにアクセスすると下記の階層で表示されます｡

- 基本的には10分に一度バケットに書き込まれる

[![Image from Gyazo](https://i.gyazo.com/fbda386b9c6872a9c2f5944fe4f8938a.gif)](https://gyazo.com/fbda386b9c6872a9c2f5944fe4f8938a)

## 5. 参考記事

---

- [AWS ドキュメント : カスタムログルーティング](https://docs.aws.amazon.com/ja_jp/AmazonECS/latest/userguide/using_firelens.html)
- [Amazon S3 - Fluent Bit: Official Manual](https://docs.fluentbit.io/manual/pipeline/outputs/s3)
- [aws-for-fluent-bit](https://github.com/aws/aws-for-fluent-bit)
- [amazon-ecs-firelens-examples](https://github.com/aws-samples/amazon-ecs-firelens-examples/tree/mainline/examples/fluent-bit/s3)
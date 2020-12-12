---
title: 【AWS EC2】作業鯖を消してしまったのでターミネートブロックしていく
date: 2020-12-12
# sidebar: true
sidebar: "auto"
tags:
  - EC2
categories:
  - AWS
---

## 1. はじめに

はい｡こちらの Tweet...にも書いてあるとおり､誤って作業鯖を消してしまいました｡

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">停止と終了を誤って､インスタンスを一台消してしまった････<br>やってしまった･･･</p>&mdash; まるちゃんLv24@DevOps (@M_Maru76) <a href="https://twitter.com/M_Maru76/status/1336130931338309634?ref_src=twsrc%5Etfw">December 8, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

反省するために､ EC2 インスタンスに対してターミネートブロックの手順を書いていきます｡

~~(ちなみに､発覚した後は､一日中ずっっっっっっっと胃が痛かったです｡)~~

## 2. 終了保護(Termination protection)とは

`DisableApiTermination` 属性の有効/無効を定義するものです｡
有効になっている場合は､【API(マネジメントコンソール/CLI/API)】等によるインスタンスの終了(削除)を防止することが出来ます｡

- デフォルトでは`無効`になっています｡

終了保護が有効なインスタンスを新マネジメントコンソールから削除しようとした時は下記画像のヘッダーのようにエラーが表示されます｡

[![Image from Gyazo](https://i.gyazo.com/e41cec9a03ddb839f67358455693be3e.png)](https://gyazo.com/e41cec9a03ddb839f67358455693be3e)

終了保護が有効なインスタンスを CLI で削除をしようとすると下記のエラーが表示されます｡

```sh
▶ aws ec2 terminate-instances --instance-ids i-0e4167cd354860fbd

An error occurred (OperationNotPermitted) when calling the TerminateInstances operation: \
The instance 'i-0e4167cd354860fbd' may not be terminated. \
Modify its 'disableApiTermination' instance attribute and try again.
```

ただ･･･インスタンスの削除を完全に回避できる!!という訳ではなく､ API による削除以外の､下記の場合は削除される模様です｡

- シャットダウン動作による削除
- Auto Scaling グループによる削除

::: tip

詳しくはAWSドキュメント ｢終了保護の有効化｣

- [インスタンスの終了保護の有効化](http://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/terminating-instances.html#Using_ChangingDisableAPITermination)

:::

## 3. 終了保護の設定手順

1. 終了保護を掛けたいインスタンスを選択
2. 【アクション】→【インスタンスの設定】→【終了保護を変更】を選択
   - [![Image from Gyazo](https://i.gyazo.com/b8a27c3a85765ed09a119ba35f4d67ef.png)](https://gyazo.com/b8a27c3a85765ed09a119ba35f4d67ef)
3. 終了保護の【有効化】にチェックを入れて保存
   - [![Image from Gyazo](https://i.gyazo.com/0a817d708f80a81328257cd6e64b0967.gif)](https://gyazo.com/0a817d708f80a81328257cd6e64b0967)

これで終了保護が完了致しました｡

試しにマネコンで終了させてみたり､停止後に終了させてみると下記画像のヘッダーみたいに赤いバーで怒られます｡

[![Image from Gyazo](https://i.gyazo.com/ef0f70d5294281b7474f43cdc8fc0b57.png)](https://gyazo.com/ef0f70d5294281b7474f43cdc8fc0b57)

## 4. さいごに

本当に､申し訳ない事をしてしまった･･･そしてガチで動いているサービスじゃなくて良かった｡

そして､削除なのか､終了なのか｡統一して欲しい｡</br>(いっそのこと Terminate で良いと思う)

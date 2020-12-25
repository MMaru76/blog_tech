---
title: 【EC2】AMI イメージ作成手順
date: 2020-12-25
# sidebar: true
sidebar: "auto"
tags:
  - EC2
categories:
  - AWS
---

## 手順

1. AWS コンソールにアクセス
2. 該当の EC2 インスタンスを選択
    - 【アクション】→【イメージ】→【イメージの作成】の順番で選択
    [![Image from Gyazo](https://i.gyazo.com/220585bfc0bc2ec9731f9a098064c757.png)](https://gyazo.com/220585bfc0bc2ec9731f9a098064c757)
3. ｢イメージの作成｣ の画面にて
   1. 【イメージ名】に任意の値を記述
   2. 【再起動しない】にチェックを入れる
   3. 【イメージの作成】を選択して作成
   [![Image from Gyazo](https://i.gyazo.com/7a93191f8f83ee6d7b227253c58b8320.png)](https://gyazo.com/7a93191f8f83ee6d7b227253c58b8320)
   [![Image from Gyazo](https://i.gyazo.com/5982ebbc2b91ba80b9cd8e5a20e2824d.png)](https://gyazo.com/5982ebbc2b91ba80b9cd8e5a20e2824d)
4. AMI 画面にて上記で作成した【AMIイメージ】のステータスが｢available｣になっている事を確認｡
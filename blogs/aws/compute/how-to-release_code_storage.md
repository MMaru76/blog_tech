---
title: 【AWS Lambda】コードストレージの開放手順
date: 2020-10-31
# sidebar: true
sidebar: "auto"
tags:
  - Lambda
categories:
  - AWS
---

## はじめに

---

基本的に必要な理由が無い限り､テスト環境で最新バージョン + *2* 世代前のバージョン以外は削除しよう｡

Lambdaには様々な制限があり、Lambdaのコードストレージの上限は75GBとなっています。

## 削除頻度について

---

::: danger memo

コードストレージが100%になっていますと､デプロイ時に失敗する｡</br>
デプロイツールを実行する際は､事前にコードストレージの残量の確認などをおこなう｡

:::

## 【コンソール】コードのストレージ容量確認手順

---

『ダッシュボード』から､《コードストレージ》の使用量を確認する事が可能

- 新デザイン : 2020/10/31日時点

[![Image from Gyazo](https://i.gyazo.com/b13a33b252792472558a3f1e9cfcc52f.png)](https://gyazo.com/b13a33b252792472558a3f1e9cfcc52f)

- 旧デザイン

[![Image from Gyazo](https://i.gyazo.com/0cab82c3148da142d8927a65d9d525f2.png)](https://gyazo.com/0cab82c3148da142d8927a65d9d525f2)

## 【CUI】過去バージョンの削除手順

---

- LAMBDA_FUNC_NAME の所に関数名を指定
- `seq 1 10` の所に始まりの数と終了の数
  - Latest を *11* だとした際に *1* ~ *10* まで消すときは､`seq 1 10` と指定

[bash]
LAMBDA_FUNC_NAME='関数名'
PROFILE=プロファイル名

for job_name in `seq 1 10`
do
    echo $job_name "番目を削除";
    aws lambda delete-function \
      --function-name $LAMBDA_FUNC_NAME \
      --qualifier $job_name \
      --profile $PROFILE
done
[/bash]
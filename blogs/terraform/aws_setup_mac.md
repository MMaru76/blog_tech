---
title: 【Terraform for AWS】 環境準備編
description: Terraform for AWS 環境の構築
date: 2020-08-24
# sidebar: true
sidebar: "auto"
tags:
  - setup
categories:
  - Terraform
---

## IAM の作成

1. AWSコンソールアクセスして､IAMページに遷移
2. 【ユーザー】を選択して､【ユーザーを作成】を選択
   - step1. ユーザー編
     - ユーザー名 : 任意の名前を入力
     - プログラムによるアクセス : 選択
   - step2. ポリシー編
     - 【既存のポリシーを直接アタッチ】を選択
     - 状況によって与えるポリシーを変える
       - ポリシー名 : AdministratorAccess
   - step3. タグ編(【タグの追加(オプション)】項目については､任意)
     - 項目 : Terraform
     - 値 : Study
   - step4. 確認編
[![Image from Gyazo](https://i.gyazo.com/46b2acd36f0cae899b3375c7929ca3e4.png)](https://gyazo.com/46b2acd36f0cae899b3375c7929ca3e4)

> ローカルで AWS CLI 2 のセットアップページ
> - [AWS CLI バージョン 2 セットアップ](https://tabiya.dev/blogs/aws/ec2/amazon-linux2-cli.html#aws-cli-2-%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)

## 【direnv】セットアップ方法

direnvとは?!
> ディレクトリ毎に環境変数を定義して､そのディレクトリがカレントになった時だっけ環境変数を有効/無効にしてくれる素晴らしいツール

[GitHub direnv](https://github.com/direnv/direnv)

### 【direnv】インストール

```bash
$ brew install direnv
```

### 【direnv】シェルのフック設定

#### zsh の場合

- 下記の様に追記

```bash
$ vim ~/.zshrc

eval "$(direnv hook zsh)"
```

- 反映

```bash
source ~/.zshrc
```

#### bash の場合

- 下記の様に追記

```bash
$ vim ~/.bashrc

eval "$(direnv hook bash)"
```

- 反映

```bash
source ~/.bashrc
```

### AWS プロファイル登録

- どのエディターで起動するかを指定
  - vim の所は任意

```bash
$ export EDITOR=vim
```

- `direnv edit .` を実行すると指定したエディターが立ち上がり､下記を追記
  - 自分のアクセス･シークレットキーを入力後に､実行させたいリージョンを指定

```bash
$ direnv edit .

export AWS_ACCESS_KEY_ID="自分のアクセスキーを入力"
export AWS_SECRET_ACCESS_KEY="自分のシークレットキーを入力"
export AWS_REGION="リージョンの選択"
```

> 下記のような出力が出ますが､スルーして問題ない
>
> ```bash
> direnv: loading ~/Documents/Terraform/.envrc
> direnv: export +AWS_ACCESS_KEY_ID +AWS_REGION +AWS_SECRET_ACCESS_KEY
> ```


### エラーが発生する場合

下記のようなエラーが発生する場合は､ `$ direnv allow` を実行

```bash
direnv: error $HOME/Work_Dir/.envrc is blocked. Run `direnv allow` to approve its content 
```

- `direnv allow` を実行して有効化

```bash
$ direnv allow

direnv: loading $HOME/Work_Dir/.envrc
direnv: export +AWS_ACCESS_KEY_ID +AWS_REGION +AWS_SECRET_ACCESS_KEY
```

## Terraform の文法解説

Terraform はHCLというHashicorm遠くじの言語を使用している｡また､HCLはJsonとの互換性がある｡

### 話し言葉で理解

- resource : 作業したいモノを取り扱うことを示します
- data : 情報を定義

```hcl
やりたいこと "どの機能を利用するか" "このリソースの名称" {
    設定項目 = "設定内容"
}
```

### 公式の言語構成紹介

```hcl
resource "aws_vpc" "main" {
    cidr_block = var.base_cidr_block
}

<BLOCK TYPE> "<BLOCK LABEL" "<BLOCK LABEL>" {
    # Block body
    <IDENTIFIER> = <EXPRESSION> # Argument
}
```

### 【AWS VPC】例文

```hcl
resource "aws_vpc" "my_vpc1" {
    cidr_block = "10.0.0.0/16"
}
```

### 【AWS IAM】例文

```hcl
data "aws_iam_user" "my_user1" {
    user_name = "my_user_name1"
}
```
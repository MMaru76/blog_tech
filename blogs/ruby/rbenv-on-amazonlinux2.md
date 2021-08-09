---
title: 【Ruby】AmazonLinux2 に rbenv をセットアップ
date: 2020-12-06
# sidebar: true
sidebar: "auto"
tags:
  - rbenv
  - EC2
  - Ruby
categories:
  - Programming language
---

## 1. はじめに

Fluetnd をセットアップしようとしたら､Rubyが入ってないぞ!!!って怒られたので Ruby のセットアップ手順を残していきます｡

- リージョン : バージニア
- AMI
  - Amazon Linux 2 AMI (HVM), SSD Volume Type - ami-04d29b6f966df1537 (64 ビット x86) / ami-03156384f702d4eaf (64 ビット Arm)

## 2. rbenv のインストール

```bash
# 依存ライブラリパッケージのインストール
$ sudo yum -y install git gcc openssl-devel readline-devel zlib-devel

# rbenv レポジトリをクローン
$ git clone https://github.com/rbenv/rbenv.git ~/.rbenv

# .bash_profileの設定
$ echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile
$ echo 'eval "$(rbenv init -)"' >> ~/.bash_profile

# シェルを再起動
$ exec $SHELL -l

# rbenv installができるように
$ git clone https://github.com/rbenv/ruby-build.git "$(rbenv root)"/plugins/ruby-build

# 確認
$ curl -fsSL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-doctor | bash
```

## 3. Ruby のインストール

```bash
# インストールできるバージョンを確認
$ rbenv install -l
> 2.5.8
> 2.6.6
> 2.7.2

# 指定バージョンのRubyをインストール
$ rbenv install x.x.x

# グローバルのバージョン指定
$ rbenv global x.x.x

# インストールされているバージョンを確認
$ rbenv versions
```

これで Fluentd を使っていく上で必須な Ruby の準備が完了出来ました｡

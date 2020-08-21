---
title: 【Terraform】 tfenv セットアップ手順
description: tfenv を使った Terraform 環境の構築
date: 2020-08-22
# sidebar: true
sidebar: "auto"
tags:
  - セットアップ
categories:
  - Terraform
---

## 1. はじめに
改めて Terraform を勉強しようと思い【[はじめての人のための Terraform for AWS](https://amzn.to/327bVly)】を購入してしまいました！

Terraform を Mac に入れる時と躓いた時に見るページ

## 2. 環境

- まるちゃんの実行環境

|項目|値|
|:--:|:--:|
|型式|Mac mini (2018)|
|プロセッサ|3.2 GHz 6コアIntel Core i7|
|メモリ|64 GB 2667 MHz DDR4|
|グラフィックス|Intel UHD Graphics 630 1536 MB|

- 記号解説

|項目|説明|
|:---:|:---:|
|$(ドル) |一般ユーザー|
|#(シャープ)|rootユーザー|
|----<br>\~略\~<br>----|長文の実行結果や編集内容など|

## 3. 【tfenv】セットアップ方法

[GitHub : tfenv](https://github.com/tfutils/tfenv)

### 3.1. 【tfenv】インストール手順

```sh
$ brew update
$ brew install tfenv
```

### 3.2. 【tfenv】アンインストール手順

```sh
$ brew uninstall terraform
```

### 3.3. 【tfenv】バージョン確認

```sh
$ tfenv --version
$ tfenv 2.0.0
```

### 3.4. 【tfenv】コマンドリスト

```sh
$ tfenv --help

Usage: tfenv <command> [<options>]

Commands:
   install       Install a specific version of Terraform
   use           Switch a version to use
   uninstall     Uninstall a specific version of Terraform
   list          List all installed versions
   list-remote   List all installable versions
```

## 4. 【Terraform】 セットアップ方法

### 4.1. 【Terraform】インストール可能なバージョンをリスト表示

- 現在インストール可能なバージョン一覧を最新 10 個を表示

```sh
$ tfenv list-remote | head

0.13.0
0.13.0-rc1
0.13.0-beta3
0.13.0-beta2
0.13.0-beta1
0.12.29
0.12.28
0.12.27
0.12.26
0.12.25
```

- 現在インストール可能な全バージョンを表示

```sh
$ tfenv list-remote

0.13.0
0.13.0-rc1
~略~
0.1.1
0.1.0
```

### 4.2. 【Terraform】バージョン指定のインストール手順

> 例 : バージョン 0.13.0 をインストール

```sh
$ tfenv install 0.13.0

Installing Terraform v0.13.0
Downloading release tarball from 
~略~
run 'tfenv use 0.13.0'
```

### 4.3. 【Terraform】利用可能なバージョンをリスト表示

```sh
$ tfenv list
* 0.13.0 (set by /usr/local/Cellar/tfenv/2.0.0/version)
  0.12.25
```

### 4.4. 【Terraform】バージョンの切り替え手順

```sh
$ tfenv use 0.13.0

Switching default version to v0.13.0
Switching completed
```

### 4.5. 【Terraform】バージョン確認

```sh
$ terraform --version

Terraform v0.13.0
```

### 4.6. 【Terraform】バージョン指定のアンインストール手順

```sh
$ tfenv uninstall 0.12.25

Uninstall Terraform v0.12.25
Terraform v0.12.25 is successfully uninstalled
```

## 5. Error List

### 5.1. スイッチ漏れ

デフォルトから切り替え漏れの際に発生する場合あり｡

> 参考 : [tfenv listで "Version could not be resolved" が発生する](https://qiita.com/takkii1010/items/6910da995b6c21ac6b3a)

```sh
$ tfenv list

cat: /usr/local/Cellar/tfenv/2.0.0/version: No such file or directory
Version could not be resolved (set by /usr/local/Cellar/tfenv/2.0.0/version or tfenv use <version>)
tfenv-version-name failed
```

- 対策としては､`tfenv use バージョン` を実行

```sh
$ tfenv use 0.13.0
```
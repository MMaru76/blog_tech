---
title: 【EC2 AmazonLinux2】 AWS CLI バージョン 2 セットアップ
description: AWS CLI バージョン 2 セットアップ方法
date: 2020-06-07
# sidebar: true
sidebar: "auto"
tags:
  - EC2
  - CLI
categories:
 - AWS
---

# 【Amazon Linux2】 AWS CLI 2 セットアップ方法

CLI 2を入れる利点としては､出力形式をJSONだけではなく､YAMLも対応されている

## 前提条件

- unzipなどのコマンドが利用前提

## パッケージ更新

パッケージ更新後に再起動を実施

```sh
$ sudo yum -y update
$ sudo reboot
```

## AWS CLI 2 インストール

```sh
$ curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
$ unzip awscliv2.zip
$ sudo ./aws/install
```

## AWS CLI 2 バージョンの確認

```sh
$ aws --version

aws-cli/2.0.19 Python/3.7.3 
Linux/4.14.181-140.257.amzn2.x86_64 
botocore/2.0.0dev23
```
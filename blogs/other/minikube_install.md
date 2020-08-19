---
title: 【Mac】Minikube のインストール手順
description: これから Kubernetes を始める人向け
date: 2020-07-29
# sidebar: true
sidebar: "auto"
tags:
  - オンプレミス
  - Spigot
categories:
  - Minecraft
---

## 実行環境

|項目|値|
|:--:|:--:|
|型式|Mac mini (2018)|
|プロセッサ|3.2 GHz 6コアIntel Core i7|
|メモリ|64 GB 2667 MHz DDR4|
|グラフィックス|Intel UHD Graphics 630 1536 MB|

## 簡単セットアップ

```sh
$ brew update
$ brew install hyperkit
$ brew install minikube
$ minikube version
```
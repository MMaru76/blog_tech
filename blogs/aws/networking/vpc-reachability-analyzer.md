---
title: 【AWS VPC】VPC Reachability Analyzer を触ってみた
date: 2020-12-20
# sidebar: true
sidebar: "auto"
tags:
  - VPC
categories:
  - AWS
---

[![Image from Gyazo](https://i.gyazo.com/4fbdfad09e30013c582c64ceecb4d57b.png)](https://gyazo.com/4fbdfad09e30013c582c64ceecb4d57b)

## はじめに

(1週間前に) AWS から VPC に対して新しいサービスが出たってよ！

まず触る前に情報収集として､公式ドキュメントを読みに行く｡

うん｡なるほど､さっぱりわからないけども､VPC内のリソース間の接続性をテスト出来るVPCの新機能だそうです｡

- [Amazon Virtual Private Cloud (VPC) announces Reachability Analyzer to simplify connectivity testing and troubleshooting](https://aws.amazon.com/jp/about-aws/whats-new/2020/12/amazon-vpc-announces-reachability-analyzer-to-simplify-connectivity-testing-and-troubleshooting/)
- [新機能 – VPC Reachability Analyzer](https://aws.amazon.com/jp/blogs/news/new-vpc-insights-analyzes-reachability-and-visibility-in-vpcs/)

どの様な場面で役に立つかを考えると､設定ミスによる当初に予定していた通信が出来ないときのトラブルシューティングなどに使えるかと思います｡

2020年12月15日時点では､【中国 (北京)】と【中国 (寧夏)】リージョン以外では､すべての AWS 商用リージョンで使用が可能です｡

価格は､0.1$ /回 なので､10回実施すると 1$ になります｡</br>
結構高いかな??って感じますけども､使い慣れると安く感じる

## 事前準備として

EC2インスタンスを2台を同VPC内で起動しておく｡

[![Image from Gyazo](https://i.gyazo.com/e89a40ff39914638699fcb32e8615bbe.png)](https://gyazo.com/e89a40ff39914638699fcb32e8615bbe)

## やってみた

VPC マネジメントコンソール【Reachability Analyzer】→【パスの作成と分析】を選択

[![Image from Gyazo](https://i.gyazo.com/092800f6412a7a23d3bf2be2df028c46.png)](https://gyazo.com/092800f6412a7a23d3bf2be2df028c46)

【パスの作成と分析】の画面にて各種項目を選択

[![Image from Gyazo](https://i.gyazo.com/dce7eb48e7369f45688ef6e775b1dc25.png)](https://gyazo.com/dce7eb48e7369f45688ef6e775b1dc25)

送信元と送信先タイプで選択出来る項目

- Transit Gateways
- VPN Gateways
- Instance
- Network Interfaces
- Internet Gateway
- VPC Endpoints
- VPC Peering Connections

[![Image from Gyazo](https://i.gyazo.com/f58fda418507e2cb7a9c6f7a414fef4d.png)](https://gyazo.com/f58fda418507e2cb7a9c6f7a414fef4d)

1分も経たずに分析が終わる模様(0.1$の威力すごい)

[![Image from Gyazo](https://i.gyazo.com/ec036ec14afd39a3e805bce5fd08041a.png)](https://gyazo.com/ec036ec14afd39a3e805bce5fd08041a)

【分析エクスプローラー】欄に行くと何処をどうやって通ったのかがルートテーブルを表示してくれる!

[![Image from Gyazo](https://i.gyazo.com/9d481d2a54821f5369cdc985e954e8bc.png)](https://gyazo.com/9d481d2a54821f5369cdc985e954e8bc)

例えば､送信先のインスタンスを誤って消したりすると･･･【到達不可能】というステータスが返ってきて､内容も英語ですが教えてくれる｡

[![Image from Gyazo](https://i.gyazo.com/f99a68b0664f6c67245c20bd8926cd5b.png)](https://gyazo.com/f99a68b0664f6c67245c20bd8926cd5b)

## さいごに

1分以内に実行が終わるのは､素晴らしい!!!(実行回数は･･･コストとにらめっこしないと怖い｡)

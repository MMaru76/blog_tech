---
title: 【Media系】AWSだけでHLSのVOD配信をしてみた(ABRに対応)
date: 2018-11-27
category: 
# sidebar: true
sidebar: "auto"
tags:
  - Media系
categories:
  - AWS
---

## 0. アイキャッチ画像

[![Image from Gyazo](https://i.gyazo.com/aee1d64d6dec6619e4569c1e2e2af3aa.png)](https://gyazo.com/aee1d64d6dec6619e4569c1e2e2af3aa)

## 1. 環境説明

[![Image from Gyazo](https://i.gyazo.com/ead24c8aee544f2411c766408fe30978.png)](https://gyazo.com/ead24c8aee544f2411c766408fe30978)

### 1.1. 使用するAWSサービス一覧

- Amazon Elastic Transcoder
- Amazon S3
- Amazon CloudFront

### 1.2. 使用する動画コンテンツ

今回は”Big Buck Bunny”コンテンツを[ダウンロード](http://bbb3d.renderfarming.net/download.html)しました。

### 1.3. 使用するブラウザー

- Safari
- Microsoft Edge

---

環境作成

---

## 2. S3の準備

作成したS3バケットは以下の通り

|バケット名|リージョン|用途|備考|
|:---:|:---:|:---:|:---:|
|vod-input-01|アジアパシフィック(東京)|元動画のアップロード用||
|vod-output-01|アジアパシフィック(東京)|ETS出力用|設定は特に不要|

- vod-input-01
  - 事前に使用する動画コンテンツをアップロード
- output-01
  - フォルダ作成を作成

|バケット名|フォルダ名|
|:---:|:---:|
|vod-output-v01|outpu-01|

## 3. CloudFrontの準備

作成したCloudFrontは以下の通り

|Domain Name|Origin名|
|:---:|:---:|
|vod-test.cloudfront.net|vod-output-01.s3.amazonaws.com|

### 3.1. CloudFront 作成手順

- Web を選択

> Origin Settings 編

|項目|設定内容|
|:---:|:---:|
|Origin Domain Name|vod-output-01.s3.amazonaws.com|
|Origin ID|S3-vod-output-0|
|Restrict Bucket Access|Yes|
|Origin Access Identity|Create a New Identity|
|Grant Read Permissions on Bucket|Yes, Update Bucket Policy|

> Default Cache Behavior Settings 編

|項目|設定内容|備考|
|:---:|:---:|:---:|
|Viewer Protocol Policy|HTTPS Only|アクセスをHTTPS限定にする|

CloudFront Private Content Getting Started と表示されたら作成成功で､デプロイ中です｡

**約15分程**掛かる場合があります｡

## 4. Amazon Elastic Transcoder の準備

### 4.1. Pipelines 作成手順

> Create New Pipeline 編

|項目|設定内容|
|:---:|:---:|
Pipeline Name|vod-pipeline-test|
|Input Bucket|vod-input-01|

> Configuration for S3 Bucket for Transcoded Files and Playlists 編

|項目|設定内容|
|:---:|:---:|
|Bucket|vod-output-01|

> Configuration for S3 Bucket for Thumbnails 編

|項目|設定内容|
|:---:|:---:|
|Bucket|vod-output-01|

### 4.2. 単一出力 Jobs 作成手順

> Create a New Transcoding Job 編

|項目|設定内容|
|:---:|:---:|
|Pipeline|vod-pipeline-test|
|Output Key Prefix|output-01/|

> Input Details (1 of 1) 編

|項目|設定内容|
|:---:|:---:|
|Input Key|bbb_sunflower_1080p_30fps.mp4|

> Output Details (1 of 1) 編

|項目|設定内容|備考|
|:---:|:---:|:---:|
|Preset|System preset: HLS 2M||
|Segment Duration|10|任意の範囲は 1～60 秒|
|OutPut Key|vov_test||

Job Status が **Complete** になったら出力成功です｡

**S3に行き、確認してみると出力されているかと思います。**

[![Image from Gyazo](https://i.gyazo.com/5fbbbe3473cb435f76e2a0a2cc28229d.gif)](https://gyazo.com/5fbbbe3473cb435f76e2a0a2cc28229d)

- 本当に見れるかSafariやEdgeまたはiphoneで確認してみよう｡

::: tip
<https://vod-test.cloudfront.net/output-01/vod_test.m3u8></br>
作成した cloudfront の Domain Name に置き換えてください｡
:::

[![Image from Gyazo](https://i.gyazo.com/0f818cb6bab6f75ba0636ea4d44a46ae.jpg)](https://gyazo.com/0f818cb6bab6f75ba0636ea4d44a46ae)

## 5. ABR出力 Jobs 作成手順

今回は **Rotation** の設定を行っています､理由としては､画面の回転度で現在使用しているプレイリストの確認をしやすくする為です｡

[![Image from Gyazo](https://i.gyazo.com/81c7c8d19c24b27fe9c451d361ca8a9f.png)](https://gyazo.com/81c7c8d19c24b27fe9c451d361ca8a9f)

> Create a New Transcoding Job 編

|項目|設定内容|備考|
|:---:|:---:|:---:|
|Pipeline|vod-pipeline-test|
|Output Key Prefix|output-02/|事前にフォルダを作成|

> Input Details (1 of 1) 編

|項目|設定内容|
|:---:|:---:|
|Input Key|bbb_sunflower_1080p_30fps.mp4|

> Output Details (1 of 3) 編

|項目|設定内容|備考|
|:---:|:---:|:---:|
|Preset|System preset: HLS 2M|
|Segment Duration|10|任意の範囲は 1～60 秒|
|OutPut Key|high_mid/high|自動でフォルダを作成後その中に出力をしてくれる|
|Output Rotation (Clockwise)|auto|任意|

> Output Details (2 of 3) 編

|項目|設定内容|備考|
|:---:|:---:|:---:|
|Preset|System preset: HLS 1M|
|Segment Duration|10|任意の範囲は 1～60 秒|
|OutPut Key|mid_dir/mid|自動でフォルダを作成後その中に出力をしてくれる|
|Output Rotation (Clockwise)|90|任意|

> Output Details (3 of 3) 編

|項目|設定内容|備考|
|:---:|:---:|:---:|
|Preset|System preset: HLS 400k|
|Segment Duration|10|任意の範囲は 1～60 秒|
|OutPut Key|low_dir/low|自動でフォルダを作成後その中に出力をしてくれる|
|Output Rotation (Clockwise)|180|任意|

> Playlist (1 of 1) 編

|項目|設定内容|
|:---:|:---:|
|Master Playlist Name|master|
|Playlist Format|HLSv3|
|Outputs in Master Playlist|high_dir/high|
|Outputs in Master Playlist|mid_dir/mid|
|Outputs in Master Playlist|low_dir/low|

Job Status が **Complete** になったら出力成功です｡

**S3に行き、確認してみると出力されているかと思います。**

[![Image from Gyazo](https://i.gyazo.com/d6d21fc4e9fe34456271acb26a9771fe.gif)](https://gyazo.com/d6d21fc4e9fe34456271acb26a9771fe)

- 本当に見れるかSafariやEdgeまたはiphoneで確認してみよう｡

::: tip
<https://vod-test.cloudfront.net/output-02/master.m3u8></br>
作成した CloudFront の Domain Name に置き換えてください｡
:::

- low の180度バージョン

[![Image from Gyazo](https://i.gyazo.com/2d52583fb0487280439ed39d30d3bb0b.png)](https://gyazo.com/2d52583fb0487280439ed39d30d3bb0b)

- high の0度バージョン

[![Image from Gyazo](https://i.gyazo.com/593a7396c17a7d59109e416ec6b09786.png)](https://gyazo.com/593a7396c17a7d59109e416ec6b09786)

以上で AWS だけで VOD 配信をしてみたでした｡

---

## 6. 最後に

個人のドメインで配信などを行いたい際は､CloudFrontのDomainNameをRoute53などに登録すると出来ます｡

使わなくなった S3 や CloudFront などは削除しましょう｡

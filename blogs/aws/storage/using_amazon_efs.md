---
title: 【AWS ストレージ系】Amazon EFS を使ってみた
date: 2018-11-29
category: 
# sidebar: true
sidebar: "auto"
tags:
  - ストレージ系
  - EFS
categories:
  - AWS
---

## 0. アイキャッチ画像

[![Image from Gyazo](https://i.gyazo.com/18a401fe1b6a7e683c3d1c6a1073ad56.png)](https://gyazo.com/18a401fe1b6a7e683c3d1c6a1073ad56)

## 1. 今回の内容について

個人的に Amazon Elastic File System(EFS) について使用してみて良かった点やメリットを紹介していこうと思います｡

EFS自体は､2015年4月からありました･･･が､今までは東京リージョンにはありませんでした｡
(1年経ちましたが)2018年の7月に東京リージョンに出たのをきっかけに試しに触れてみました｡

> [アジアパシフィック (東京) リージョンで Amazon Elastic File System (Amazon EFS) が利用可能に](https://aws.amazon.com/jp/about-aws/whats-new/2018/07/amazon-elastic-file-system-amazon-efs-available-in-asia-pacific-tokyo-region/)

## 2. Amazon Elastic File System とは

![cap2018_9_2_23_8_6_543.png](https://qiita-image-store.s3.amazonaws.com/0/131274/0a192cf3-4448-2596-2c8d-fa5ecac37e03.png)

[Amazon Elastic File System](https://docs.aws.amazon.com/ja_jp/efs/latest/ug/whatisefs.html)(EFS) とは､AWS上で使用出来る高速かつ大容量の共有ファイルストレージです｡

### 2.1. まずは料金体系を

海外リージョンと比べると少し高いかもしれませんが､ **東京リージョン** と **バージニア北部リージョン** の料金表を載せておきます｡

|リージョン|ストレージ(GB-月)|プロビジョンドスループット(MB/秒-月)|EFS File Sync (EFSへのGBあたり)|
|:-----------:|:-----------:|:-----------:|:-----------:|
|米国東部 (バージニア北部)|0.30 USD|6.00 USD|0.01 USD|
|アジアパシフィック (東京)|0.36 USD|7.20 USD|0.01 USD|

詳しい料金表はこちらを [Amazon EFS Pricing](https://aws.amazon.com/jp/efs/pricing/)

### 2.2. メリットとしては

- マルチAZの複数インスタンスから同時にアクセス可能
- ディスク容量制限がなく､使用した分だけスケーラブルに拡張
- VPCからの使用のみに限られるため､インターネット上に公開しなくても良い
- 書き始めから転送が可能

#### 2.2.1. 他のAWSサービスと比べてみると

||S3|EBS|EFS|
|:--:|:--:|:--:|:--:|
|接続数|1:n|1:1|1:n|
|耐久度|99.999999999%|99.999%|高い耐久性|
|料金|使用量課金|事前に確保領域分|使用量課金|
|主なアクセス方法|ブラウザー･API･CLI|マウント･ローカル接続|マウント|
|レイテンシー|低い|かなり低い|低い|
|CFとの連携|○|X|X|
|OSからのマウント|X|○|○|

## 3. EFS 作成方法

- デフォルトのVPCでも使用可能

### 3.1. ファイルシステム

#### 3.1.1. ステップ 1: ファイルシステムアクセスの設定

1. ファイルシステムアクセスの設定
    - ターゲットにしたい 【**VPC**】 を選択
2. マウントターゲットの作成
    - 【**セキュリティグループ**】 の選択

![cap2018_9_2_22_10_2_685.png](https://qiita-image-store.s3.amazonaws.com/0/131274/8ea0b817-9f5a-643b-6898-9d50d72ffbde.png)

#### 3.1.2. ステップ 2: オプション設定の構成

項目の指定については､今回は触れません｡

- [Amazon EFS のパフォーマンスについて](https://docs.aws.amazon.com/ja_jp/efs/latest/ug/performance.html#throughput-modes)

#### 3.1.3. ステップ 3: 確認と作成

問題が無ければ 【**ファイルシステムの作成**】 を選択して作成

![cap2018_9_2_22_23_58_614.png](https://qiita-image-store.s3.amazonaws.com/0/131274/c1c0a0c0-05e5-7b8b-dd74-691fb0f459cd.png)

### 3.2. 完成

- 黄色のラインで隠している所はインスタンスのセットアップの際に使用
  - ファイルシステムID : **fs-1234567**
  - DNS名 : **fs-1234567.efs.ap-northeast-1.amazonaws.com**

![cap2018_9_2_22_29_2_748.png](https://qiita-image-store.s3.amazonaws.com/0/131274/a9c8ae98-99a2-abd1-6c5e-64a34f02df7f.png)

---

## 4. インスタンスのセットアップ

今回は､Amazon Linuxのセットアップ方法のみになります｡(Amazon Linux2でも可)
インスタンスは最低でも2台あると､確認がしやすいかと思います｡

### 4.1. EC2インスタンスにて(AmazonLinux)

#### 4.1.1. EFSマウントヘルパーのインストール

```sh
# yum install -y amazon-efs-utils
```

#### 4.1.2. ターゲットにしたいディレクトリを作成

```sh
# mkdir /mnt/efs
```

#### 4.1.3. 各種マウントの仕方

- EFSマウントヘルパーの使用

```sh
# mount -t efs fs-1234567:/ /mnt/efs
```

- 暗号化の場合

```sh
# mount -t efs -o tls fs-1234567:/ /mnt/efs
```

- NFSクライアントの使用の場合

```sh
# mount -t nfs4 -o nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport fs-1234567.efs.ap-northeast-1.amazonaws.com:/ /mnt/efs
```

#### 4.1.4. 自動で接続

お好みのエディターで下記の内容を追加

```sh
# vim /etc/fstab

fs-1234567:/   /mnt/efs       efs     defaults,_netdev        0       0
```

- オプションなどは､｢[Amazon EFS ファイルシステムの自動マウント](https://docs.aws.amazon.com/ja_jp/efs/latest/ug/mount-fs-auto-mount-onreboot.html?shortFooter=true)｣ を参考にしています｡
  - defaults オプションについて
    - rw,suid,dev,exec,auto,nouser,async
  - _netdev オプションについて
    - ネットワークアクセスが必要なデバイス上にあるファイルシステム

---

## 5. 最後に

今回の投稿には記載はしていないですが､EFSを使って約4時間ほど生配信をしていたのですがSegmentFileやPlayListが一切途切れることなく､別のインスタンス2台に対して高速転送が出来ていました｡

配信構成としては

> 映像 => EC2(エンコーダ -> EFS) => EC2x2(EFS -> Webサーバ) => ELB => PC/スマホ

個人的に一番驚いている点としては､｢**S3の場合は､書き終わり後に転送**｣に対して､｢**EFSの場合は書き始めから転送**｣をしているのが今後もっと需要が増えると思いました｡

以下のカクカクGIF動画は実際に配信した際の映像になります｡

[![Image from Gyazo](https://i.gyazo.com/4341511baa68818397ea7dc15807f9c8.gif)](https://gyazo.com/4341511baa68818397ea7dc15807f9c8)
[こちらにMP4の動画があります](https://gyazo.com/4341511baa68818397ea7dc15807f9c8)

使用した動画は､私が撮影した動画になります｡(ご自由にお使いください｡)
<https://www.youtube.com/watch?v=LzZmQDoYa7Q>

Qiita : [Amazon EFS を使ってみた](https://qiita.com/MMaru76/items/286f63d3edc189ffd7d4)

---
title: 【Microsoft Azure】｢DNS Zone｣と｢仮想マシン｣の構築方法
date: 2018-11-30
# sidebar: true
sidebar: "auto"
categories:
  - Azure
---

[![Image from Gyazo](https://i.gyazo.com/c8ed7637b8acc53acbceaba3764fb005.png)](https://gyazo.com/c8ed7637b8acc53acbceaba3764fb005)

## 前提条件

- Microsoft アカウント
- 有効なAzure サブスクリプション
- ドメインの事前購入
  - ドメイン自体は99円~から購入出来る物もあります｡
  - ここで出現している｢merou.info｣は､私のドメインの為､個人で購入したドメインをご使用ください｡
  - ドメイン購入場所は｢バリュードメイン｣や｢お名前ドットコム｣などで事前に購入｡

## DNS編

### DNS ゾーンを作成

1. Chrome等のブラウザで ｢[Azure Portal](https://portal.azure.com/)｣ にアクセス
2. 左上側の ｢ハンバーガーマーク｣ をクリック
3. ｢+新規｣ をクリック
4. ｢dns zone｣ を入力

[![Image from Gyazo](https://i.gyazo.com/047e01668300a333729eece76a865626.png)](https://gyazo.com/047e01668300a333729eece76a865626)

1. ｢DNS ゾーン｣ をクリック

[![Image from Gyazo](https://i.gyazo.com/7830ba76fba6a68697b4e4a786ec05b4.png)](https://gyazo.com/7830ba76fba6a68697b4e4a786ec05b4)

1. ｢DNS ゾーン｣ の確認
2. ｢作成｣ をクリック

[![Image from Gyazo](https://i.gyazo.com/d845112cf84f2314487607161efafb91.png)](https://gyazo.com/d845112cf84f2314487607161efafb91)

1. 以下の情報を入力して ｢作成｣ をクリック
   - 名前
   - サブスクリプション
   - リソースグループ
   - リソースグループの場所

[![Image from Gyazo](https://i.gyazo.com/fa64289e0c99a1735c5f8a5d446f86d3.png)](https://gyazo.com/fa64289e0c99a1735c5f8a5d446f86d3)

1. ｢DNS ゾーン｣ の画面が表示されれば､DNSゾーンの作成が完了です｡
   - 作成に少し時間がかかる場合がありますので､気長に待ちましょう｡

[![Image from Gyazo](https://i.gyazo.com/b5aab429522dd4026794a3bb6734095e.png)](https://gyazo.com/b5aab429522dd4026794a3bb6734095e)

### 仮想マシン構築編

1. Chrome等のブラウザで ｢Azure Portal｣ にアクセス
2. 左上側の ｢ハンバーガーマーク｣ をクリック
3. ｢+新規｣ をクリック
4. ｢Get started｣ or ｢Compute｣ をクリック
5. ｢Ubuntu Server 16.04 LTS VM｣ をクリック

[![Image from Gyazo](https://i.gyazo.com/4762a1933bc5a1cd6c5239aed43101a8.png)](https://gyazo.com/4762a1933bc5a1cd6c5239aed43101a8)


1. ｢基本:基本設定の構成｣ の入力
   - 名前
   - VM ディスクの種類
     - ｢SSD｣ or ｢HDD｣
   - ユーザー名
     - ログイン時のユーザー名
   - 認証の種類
     - ｢SSH 公開キー｣ or ｢パスワード｣
   - パスワード
   - サブスクリプション
     - ｢従量課金｣を選択
   - リソースグループ
     - [リソースグループ](https://docs.microsoft.com/ja-jp/azure/azure-resource-manager/management/overview#resource-groups)名
   - 場所
     - [Azure リージョン](https://azure.microsoft.com/ja-jp/global-infrastructure/geographies/) を選択する､リージョンによって金額がかかる｡

[![Image from Gyazo](https://i.gyazo.com/968c34b6735789dee93788ac31b02f60.png)](https://gyazo.com/968c34b6735789dee93788ac31b02f60)

1. ｢サイズ:仮想マシンのサイズの選択｣

[![Image from Gyazo](https://i.gyazo.com/87708c55bcd3d02a8ecc638266cb14ec.png)](https://gyazo.com/87708c55bcd3d02a8ecc638266cb14ec)

1. ｢設定:オプション機能の構成｣

[![Image from Gyazo](https://i.gyazo.com/745bc5f6c97fcadc818ece6fa413b350.png)](https://gyazo.com/745bc5f6c97fcadc818ece6fa413b350)

1. ｢概要:Ubuntu Server 16.04 LTS｣

[![Image from Gyazo](https://i.gyazo.com/7fa7e86986b441786f38d93817ebd4a0.png)](https://gyazo.com/7fa7e86986b441786f38d93817ebd4a0)

1. 仮想マシンのデプロイが終わるまで待ちましょう｡

[![Image from Gyazo](https://i.gyazo.com/52d38d59c58a50b3553fad0af14c9089.png)](https://gyazo.com/52d38d59c58a50b3553fad0af14c9089)

### 仮想マシンのWeb サーバーの80番ポートを開ける｡

1. 先程作成した､仮想マシンをクリックして表示
2. 左側に表示されている､｢ネットワーク｣ をクリック
3. ｢受信ポートの規則を追加する｣ をクリック

[![Image from Gyazo](https://i.gyazo.com/4fd5df3c76fc00b5eb2fb62f7caaa862.png)](https://gyazo.com/4fd5df3c76fc00b5eb2fb62f7caaa862)

1. 詳細設定が表示されたら､以下を入力
   - サービス
     - ｢HTTP｣ を選択
   - ポート範囲
     - サービスで ｢HTTP｣ を選択すると自動で入力される｡
   - 優先度
     - こちらもある程度自動だけど､説明はこちら｡
   - 名前
     - こちらも任意だが､自動で入力される
   - 説明
     - 任意

[![Image from Gyazo](https://i.gyazo.com/98d3dd8c2fbf8879d204a1968cfc9550.png)](https://gyazo.com/98d3dd8c2fbf8879d204a1968cfc9550)

1. 80番ポートが追加されたのを確認する｡

[![Image from Gyazo](https://i.gyazo.com/b87e1b4979ece7a563c2635689eeb94d.png)](https://gyazo.com/b87e1b4979ece7a563c2635689eeb94d)

### 仮想マシンとDNSの設定

1. 仮想マシンをクリックして､｢概要｣ 画面を表示
2. ｢パブリックIPアドレス｣ をコピーする

[![Image from Gyazo](https://i.gyazo.com/298ce67d1e864353e38e114e0456904e.png)](https://gyazo.com/298ce67d1e864353e38e114e0456904e)

1. ｢1.DNS編｣ で作成したDNS ゾーンをクリック
2. DNS ゾーン ｢概要｣ 画面をオープン
3. ｢+レコードセット｣ をクリック

[![Image from Gyazo](https://i.gyazo.com/97015a10408c2ee4207d42334486b4f0.png)](https://gyazo.com/97015a10408c2ee4207d42334486b4f0)

1. ｢レコード セットの追加｣ 画面で以下の情報を入力して､｢OK｣ をクリック
   - 名前
     - ここでは､｢test01｣と入力｡｢www｣など､｢空白｣でも可能
   - IP アドレス
     - 仮想マシンの｢パブリックIPアドレス｣を入力

[![Image from Gyazo](https://i.gyazo.com/3810ac0a92bf040fa8fba823e1f8bdba.png)](https://gyazo.com/3810ac0a92bf040fa8fba823e1f8bdba)

1. レコードが追加されたら､完了

[![Image from Gyazo](https://i.gyazo.com/8f00e9f22cb231077f1fbc9e709aebff.png)](https://gyazo.com/8f00e9f22cb231077f1fbc9e709aebff)

## SSH編

### SSHクライアントツールを起動

1. ｢SSH クライアント｣ を起動
   - 今回は､Windows10 ということもあり [Poderosa](https://sourceforge.net/projects/poderosa/) を使用しています｡

[![Image from Gyazo](https://i.gyazo.com/3bdb0f1ee9c13237eb198cfa7ce5768c.png)](https://gyazo.com/3bdb0f1ee9c13237eb198cfa7ce5768c)

1. 各種情報を入力して､｢OK｣ をクリック
   - ホスト名
   - アカウント名
   - パスワード

[![Image from Gyazo](https://i.gyazo.com/89151c1ebac6fe753cfa494b85e7daca.png)](https://gyazo.com/89151c1ebac6fe753cfa494b85e7daca)

1. 接続に成功すれば以下のようになります｡

[![Image from Gyazo](https://i.gyazo.com/dfcd7268735bc43011b82541accb7374.png)](https://gyazo.com/dfcd7268735bc43011b82541accb7374)

1. Webサーバをインストールまでの作業

```sh
$ sudo su -
# apt -y install apache2
# systemctl start apache2
```

[![Image from Gyazo](https://i.gyazo.com/2d0520a16324a530492bd959d74e8759.png)](https://gyazo.com/2d0520a16324a530492bd959d74e8759)

## WEBサイトアクセス編

1. 個人で作成した､｢ドメイン｣ or ｢IP アドレス｣ でアクセス
2. 以下の様な画面が表示されれば､完了です｡

[![Image from Gyazo](https://i.gyazo.com/5e33e626c94d4d845abbecb262bfdd79.png)](https://gyazo.com/5e33e626c94d4d845abbecb262bfdd79)

## 各種削除編

### 仮想マシンの削除

1. 作成した仮想マシンの画面を表示
2. ｢削除｣ をクリックして､仮想マシンを削除

[![Image from Gyazo](https://i.gyazo.com/b5406fd45b095de505d09bb3b5b0a2ef.png)](https://gyazo.com/b5406fd45b095de505d09bb3b5b0a2ef)

### レコードの削除

1. DNSゾーンの画面を表示
2. 作成したレコードの ｢･･･｣ をクリック
3. ｢削除｣ をクリック

[![Image from Gyazo](https://i.gyazo.com/68e6b4cf7f39e8ac58104b86b93d93d4.png)](https://gyazo.com/68e6b4cf7f39e8ac58104b86b93d93d4)

以上で ｢DNS ゾーン｣設定､｢仮想マシンの作成｣､｢Webサーバ構築｣､｢各種削除｣まででした｡

## 最後に

こちらを応用すれば､AWSのRoute53でも使用することが出来ます｡
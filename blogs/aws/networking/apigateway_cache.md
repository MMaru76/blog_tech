---
title: 【AWS API Gateway】キャッシュ有効化時の解説と有効化手順
date: 2020-10-30
# sidebar: true
sidebar: "auto"
tags:
  - API Gateway
categories:
  - AWS
---

## 1. はじめに

書く書くと言って約 *1* ヶ月半が経ちました｡

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">API Gatewayのキャッシュ機能について完全にマスターしたのでBlogを書く｡<br><br>キャッシュ設定とリソースポリシーは別機能になります( ･ิω･ิ)</p>&mdash; まるちゃんLv24@DevOps (@M_Maru76) <a href="https://twitter.com/M_Maru76/status/1305670324491489284?ref_src=twsrc%5Etfw">September 15, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

そして､AWS API Gateway のキャッシュを触っていて辛かった事は､【リソースポリシー】で操作が出来ると思ってポリシーを書きまくって､動作テストしても動かない･･･【リソースポリシー】って全く関係が無かった｡

今回は下記2本だてです｡

- 【2. API Gatewat キャッシュ有効時の挙動について】
- 【3. API Gateway キャッシュ有効化手順】
- 【4. API Gateway メトリクス】

---
---

## 2. API Gatewat キャッシュ有効時の挙動について

### 2.1. API Gateway キャッシュ の概要

---

API キャッシュを有効にして、エンドポイントのレスポンスがキャッシュ

- エンドポイントへの呼び出しの数を減らすことが可能
- API へのリクエストの低レイテンシーを実現可能

ステージに対してキャッシュを有効にすると、API Gateway は、秒単位で指定した有効期限 (TTL) が切れるまで、エンドポイントからのレスポンスをキャッシュします。
その後、API Gateway は、エンドポイントへのリクエストを行う代わりに、キャッシュからのエンドポイントレスポンスを調べてリクエストに応答します。

[![Image from Gyazo](https://i.gyazo.com/993a639e3423a655ca9b3b10df531eb0.png)](https://gyazo.com/993a639e3423a655ca9b3b10df531eb0)
> 引用先 : [\[AWS Black Belt Online Seminar\]Amazon API Gateway サービスカットシリーズ : 62p](https://d1.awsstatic.com/webinars/jp/pdf/services/20190514_AWS-Blackbelt_APIGateway_rev.pdf)

### 2.2. キャッシュ可能メソッドについて

---

- 指定したステージのレスポンス結果を保持
- デフォルトは 【GETメソッド】のみキャッシュされる
- オーバーライドするメソッドの設定を行う事により【POSTメソッド】などもキャッシュ可能

ステージ有効化にしている際に限り､オーバーライド設定を行う事によって､【POSTメソッド】などもキャッシュが有効化可能｡

|項目|値|
|:--:|:--:|
|GET メソッド|デフォルトキャッシュ|
|POST メソッド|オーバーライド設定必要|
|OPTIONS メソッド|オーバーライド設定必要|
|HEAD メソッド|オーバーライド設定必要|
|PATCH メソッド|オーバーライド設定必要|
|PUTメソッド|オーバーライド設定必要|
|DELETE メソッド|オーバーライド設定必要|

::: tip

- AWS公式ドキュメント : [API キャッシュを有効にして応答性を強化する](https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/api-gateway-caching.html)
- AWS公式ドキュメント : [API Gateway ステージレベルのキャッシュをメソッドキャッシュで上書きする](https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/api-gateway-caching.html#override-api-gateway-stage-cache-for-method-cache)

:::

### 2.3. 【キャッシュ有効期限】 TTL 期間について

---

｢キャッシュの TTL 期間｣の時間は以下の通り *1* 秒~ *3600* 秒 まで可能

|項目|値|
|:--:|:--:|
|キャッシュ無効|0秒|
|最低の TTL (Min)|1秒|
|デフォルトの TTL|300秒(5分)|
|最大の TTL (Max)|3600秒(1時間)|

::: tip

例 :『特定ステージ』/『特定リソース』/『特定メソッド』に対する TTL 期間とする

:::

### 2.4. 【キャッシュキャパシティー】 保存容量について

---

｢キャッシュキャパシティー｣の容量は以下 *8* 項目から選択が可能

|容量|料金/時間|
|:--:|:--:|
|0.5 GB|0.02USD|
|1.6 GB|0.038USD|
|6.1 GB|0.20USD|
|13.5 GB|0.25USD|
|28.4 GB|0.50USD|
|58.2 GB|1.00USD|
|118 GB|1.90USD|
|237 GB|3.80USD|

::: tip

例 :『特定ステージ』/『特定リソース』/『特定メソッド』に対するキャッシュ容量とする

:::

::: danger 注意事項

- 料金は時間単位
- キャッシュを超えたリクエストについては､API Gateway がバックエンドにリクエストを通す挙動となる
- 複数のリクエストに対するキャッシュ容量
- キャッシュが可能なレスポンス最大サイズは､ `1048576` バイト まで

:::

### 2.5. キャッシュ有効化時の注意点

---

- 指定されたステージのデフォルト設定の GET メソッドのみがキャッシュを有効される
- キャッシュ容量を増やすとパフォーマンス自体は､よくなるがコストも増える
- キャッシュを有効にした際の初回に限り専用のキャッシュインスタンス作成されるため､最大4~5分ほど掛かる
- キャッシュの容量を変更するには､既存のキャッシュインスタンス削除後に新規でキャッシュインスタンスを作成というフローになるので､机上計算で最大約 *8* 分ほど掛かる
- 変更時にキャッシュデータは全て削除
- キャッシュが可能なレスポンス最大サイズは､ `1048576` バイト まで
- 暗号化する場合は､キャッシュされている時のレスポンスのサイズから増量される可能性がある
- 複数のリクエストに対するキャッシュ容量である
- キャッシュを超えたリクエストについては、 API Gateway がバックエンドにリクエストを通す挙動となる

### 2.6. テスト動作例

---

#### 2.6.1. 同じ内容を複数回での検証

- 1 分間 に *2* 回実施( *0* 秒と *30* 秒)
- 15:00 に連続で *5* 回実施
- 15:02 に *5* 秒おきに実施して計 *8*回実施
- 15:08 に *1* 回実施

[![Image from Gyazo](https://i.gyazo.com/94949a4744bf5b06d33859b479930f20.png)](https://gyazo.com/94949a4744bf5b06d33859b479930f20)

#### 2.6.2. 別データでの検証

- キャッシュせずにカウントだけが増量する｡

[![Image from Gyazo](https://i.gyazo.com/80d3fa696e8a1e5d78841024bc418fae.png)](https://gyazo.com/80d3fa696e8a1e5d78841024bc418fae)

---
---

## 3. API Gateway キャッシュ有効化手順

::: tip memo

複数の『リソース』と『メソッド』があり､特定のリソースのメソッドのみだけをキャッシュ有効化する場合は､こちらの手順が参考になる｡

:::

### 3.1. キャッシュ有効化

---

1. AWS マネジメントコンソールから【API Gateway】を選択
2. 該当の API を選択
3. 左側のツリーから該当【ステージ】→【設定】タブを選択
   - APIキャッシュを有効化 : チェックを入れる
   - キャッシュキャパシティ :
   - キャッシュ有効期限(TTL) : TTL *0* 秒
   - 【認可が必要】チェックを外す

> TTLを0秒にする事により､キャッシュ有効化状態でもキャッシュがされなくなる｡

[![Image from Gyazo](https://i.gyazo.com/9c3f555a90ee71678bcdd3e16cf0470b.png)](https://gyazo.com/9c3f555a90ee71678bcdd3e16cf0470b)

::: tip memo

【認可が必要】とは?!という方は下記を閲覧

- [【AWS】APIGatewayにキャッシュを設定する際にハマったこと](https://qiita.com/mth1209/items/abc3e42a3a993546ba7c)

:::

#### 3.1.1. 想定時の結果として

下記のメトリクスが､ *1* 以上じゃないこと

- CacheHitCount

[![Image from Gyazo](https://i.gyazo.com/e3726aa4606fd65197217f79c50797f3.png)](https://gyazo.com/e3726aa4606fd65197217f79c50797f3)

### 3.2. 各種リソースのキャッシュ無効化

---

1. AWS マネジメントコンソールから【API Gateway】を選択
2. 該当の API を選択
3. 左側のツリーから該当【ステージ】を選択して下記を繰り返す
   - 【ステージ名】を選択
   - 【リソース】 を選択
   - 【メソッド】の GET メソッドを選択
   - 【このメソッドの上書き】を選択
   - 【メソッドキャッシュの有効化】のチェックを外して保存

#### 3.2.1. リクエスト内容が動的な場合

::: tip memo

ヘッダやパラメータによってレスポンスが変わる場合は､該当の項目についてもキャッシュの識別対象として含めておく必要があり｡

例えば以下の *2* つのリクエストに対して､ id パラメータが異なればそれぞれ個別にキャッシュする必要がある場合は id パラメータをキャッシュの識別対象とする必要がある｡

```
/resource/api?id=123&type=A
/resource/api?id=456&type=B
```

> 参考先 : AWS 公式ドキュメント [メソッドパラメータまたは統合パラメータをキャッシュキーとして使用して、キャッシュされたレスポンスにインデックスを付ける](https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/api-gateway-caching.html#enable-api-gateway-cache-keys)

:::

1. AWS マネジメントコンソールから【API Gateway】を選択
2. 該当の API を選択
3. 左側のツリーから該当【リソース】→【GET メソッド】→【メソッドリクエスト】を選択
   - リクエストパス にて
   - 名前 : XXXX
   - キャッシュ : チェックを入れる
   - [![Image from Gyazo](https://i.gyazo.com/279bc4f788beb1ac450555573499a5a3.png)](https://gyazo.com/279bc4f788beb1ac450555573499a5a3)
4. 左側のツリーから該当【リソース】→【アクション】→【API のデプロイ】を選択
5. 【デプロイされるステージ】は､該当ステージ名を選択して【デプロイ】をクリック
   - [![Image from Gyazo](https://i.gyazo.com/1cd4e42ddaf00855117c4f60ab08451f.png)](https://gyazo.com/1cd4e42ddaf00855117c4f60ab08451f)
6. デプロイ後に10分近く待機

### 3.3. TTL の有効化

---

1. AWS マネジメントコンソールから【API Gateway】を選択
2. 該当の API を選択
3. 左側のツリーから該当【ステージ】→【設定】タブを選択
   - キャッシュ設定 にて
     - キャッシュ有効期限(TTL) : *1* 秒以上

> TTL を *1* 秒以上にする事により､キャッシュ機能が有効になる｡

[![Image from Gyazo](https://i.gyazo.com/5d40fe3b28a11c25a4df0bcc5f743b45.png)](https://gyazo.com/5d40fe3b28a11c25a4df0bcc5f743b45)

#### 3.3.1. 想定時の結果として

下記のメトリクスが､比例していること

- Count
- CacheHitCount

[![Image from Gyazo](https://i.gyazo.com/3e08579a42332961abe83c8043c9728c.png)](https://gyazo.com/3e08579a42332961abe83c8043c9728c)

---
---

## 4. API Gateway メトリクス

Amazon API Gateway は、CloudWatch にメトリクスデータを毎分送信し､`AWS/ApiGateway` 名前空間には、下記のメトリクスが含まれます。

|メトリクス|説明|
|:--:|:--|
|4XXError|指定された期間に取得されたクライアント側エラーの数 </br> Unit: Count|
|5XXError|指定された期間に取得されたサーバー側エラーの数 </br> Unit: Count|
|CacheHitCount|指定された期間内に API キャッシュから配信されたリクエストの数 </br> Unit: Count|
|CacheMissCount|API キャッシュが有効になっている特定の期間における、バックエンドから提供されたリクエストの数 </br> Unit: Count|
|Count|指定された期間内の API リクエストの合計数 </br> Unit: Count|
|IntegrationLatency|API Gateway がバックエンドにリクエストを中継してから、バックエンドからレスポンスを受け取るまでの時間 </br> Unit: Millisecond|
|Latency|API Gateway がクライアントからリクエストを受け取ってから、クライアントにレスポンスを返すまでの時間 </br> Unit: Millisecond|

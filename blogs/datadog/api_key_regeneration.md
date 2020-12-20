---
title: 【Datadog】APIキーの再生成方法
date: 2020-09-06
# sidebar: true
sidebar: "auto"
tags:
  - やらかしシリーズ
categories:
  - Datadog
---

## 1. はじめに

皆さんも一度は､｢なんだこのデフォルトAPIキーは？､てか要らないだろ!!!消しちゃえ｣って言って消してしまった事はありますでしょうか？(僕は**勿論**あります)

そもそも何で消したのか？

> Datadog を AWS に入れた際に､空白の API キーがあったので消しました｡(反省はしていますが､空白なのが悪い｡)

[![Image from Gyazo](https://i.gyazo.com/6708c633d709969f1d9a76c255cdfa29.png)](https://gyazo.com/6708c633d709969f1d9a76c255cdfa29)

弁明するとしたら｡｢つい･･･空白だったから｡｣

これによって起きてしまった事｡</br>
完全にインスタンスからデータを取得出来なかった｡

<blockquote class="twitter-tweet" data-dnt="true" data-theme="dark"><p lang="ja" dir="ltr">草 <a href="https://t.co/dlChe56Y3d">pic.twitter.com/dlChe56Y3d</a></p>&mdash; まるちゃんLv24@DevOps (@M_Maru76) <a href="https://twitter.com/M_Maru76/status/1302583375799042048?ref_src=twsrc%5Etfw">September 6, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 2. 概要

前フリが長くなりましたが､ここで実施する事としては以下の3点

- 【API キー】の再生性
- 既存インスタンスにて【API キー】の再設定
- 動作確認

## 3. 【API キー】の再生性

[Datadog APIs ページ](https://app.datadoghq.com/account/settings#api)

1. Datadogにログイン
2. 【Integrations】=>【[APIs](https://app.datadoghq.com/account/settings#api)】をクリックしていいどう
   - [![Image from Gyazo](https://i.gyazo.com/3241bd3d20b25c045d4ae9c77bf178a7.png)](https://gyazo.com/3241bd3d20b25c045d4ae9c77bf178a7)
3. 【API Keys】 にて
   - 『New API Key』: 任意の名前を入力
   - 『Create API Key』: クリックして作成

[![Image from Gyazo](https://i.gyazo.com/247635ff679cc5ac59fbe9f763405bb4.png)](https://gyazo.com/247635ff679cc5ac59fbe9f763405bb4)

## 4. 既存インスタンスにて【API キー】の再設定

複数のインスタンスに対して設定してしまった場合は､諦めて頑張ってください｡

1. ｢[3.【API キー】の再生性](api_key_regeneration.html#_3-【api-キー】の再生性)｣にて生成した『Key』をコピー
   - 紫色の部分にカーソルを当てると『Key』が表示される
2. 該当インスタンスに SSH 接続
3. `datadog.yaml` の10行目で新しい『Key』に置き換える

```sh
# vim /etc/datadog-agent/datadog.yaml

10行目 : api_key: XXXXXXXXXXXXXXXXXXXXXXXXX
```

4. datadog-agent サービスの再起動

```sh
# systemctl restart datadog-agent
```

5. datadog-agent サービスの稼働確認

```sh
# systemctl status datadog-agent

● datadog-agent.service - Datadog Agent
   Loaded: loaded (/usr/lib/systemd/system/datadog-agent.service; enabled; vendor preset: disabled)
   Active: active (running) since Sun YYYY-MM-DD hh:mm:ss JST; 1h 53min ago
 Main PID: XXX (agent)
   CGroup: /system.slice/datadog-agent.service
           └─XXX /opt/datadog-agent/bin/agent/agent run -p /opt/datadog-agent/run/agent.pid
```

## 5. 動作確認

実際に作成したダッシュボードなどでデータが取得出来ているか確認を実施

- `system.cpu.user` を取得している場合は､下記のように再度取得が開始する
[![Image from Gyazo](https://i.gyazo.com/65080281d6f281961a2e6073cb1f1eed.png)](https://gyazo.com/65080281d6f281961a2e6073cb1f1eed)

- ロードアベレージやメモリなどは自動的に上手く繋げられる模様
[![Image from Gyazo](https://i.gyazo.com/b1258165450a90e140cc12493915980e.png)](https://gyazo.com/b1258165450a90e140cc12493915980e)

## 6. さいごに

名前が無いからってリソースを消しちゃ駄目｡
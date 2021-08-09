---
title: 【VMware】VMware ESXi セットアップ
date: 2020-03-12
# sidebar: true
sidebar: "auto"
tags:
  - VMware ESXi
categories:
  - 仮想環境
---

## はじめに

こんにちは､名古屋駅周辺で自動車関係のIT会社でDevOpsエンジニアをやっている [まるちゃん](https://twitter.com/M_Maru76) です｡

皆さんは､一度は自宅でサーバー環境を構築して大量の仮想マシンを立ち上げて遊んでみたいと思ったことは...ありませんか?僕はあります｡

その夢をこの記事で叶える事が出来ます｡ただ､素直にAWSとかを触るのを断然オススメいたします｡

この場を借りて
> 当時､学生だった頃にオンラインゲームで知り合った程度の僕に **VMware ESXi** という素晴らしいサービスをご教示してくださった某Eさんへ､本当にありがとうございます｡<br>
>
> お陰様で､インフラの沼にハマって抜け出せなくなりました｡

## 実行環境

元々ゲーミングPCとして使っていたデスクトップPCをサーバー化してます｡

- CPU : i7-3930K = 3.20GHz
- メモリー : 28GiB = DDR3

もし､仮想マシンを沢山立ち上げたい際は､4コア以上とメモリ16GB以上を用意してください｡

## 事前準備 Realtek 8168内蔵のISOを作成手順

パソコンにRealtek 8168のNICKが搭載されている場合は通常通りではインストールが成功致しませんので､Windowsにてインストールが成功するように環境を作成します｡

1: 必要なファイルをダウンロード

- [Net55-r8168](https://vibsdepot.v-front.de/wiki/index.php/Net55-r8168)
  - ｢VIB File of version 8.045a｣を選択してDL
- [ESXi-Customizer-PS](https://www.v-front.de/p/esxi-customizer-ps.html)
  - ｢Download latest version｣を選択してDL
- [VMware PowerCLI – installer](https://my.vmware.com/jp/group/vmware/details?downloadGroup=PCLI650R1&productId=614)
  - ｢今すぐダウンロード｣を選択してDL

2 : 各種ファイルを移動

Cフォルダの直下に”ESXi-Customizer”を作成して､先程DLした ｢Net55-r8168｣ と ｢ESXi-Customizer-PS｣ を配置

![Image from Gyazo](https://i.gyazo.com/99b5828bd96c01b2c3915e433019d911.png)

フォルダ構造は以下の通り

```bash
・フォルダ：C:\ESXi-Customizer
　- ファイル名：ESXi-Customizer-PS-v2.6.0.ps1
　- ファイル名：net55-r8168-8.045a-napi.x86_64.vib
```

3 : コマンドを操作

PowerShellを管理者権限で起動してから､下記コマンドで実行ポリシーを変更する

```PowerShell
PS C:\WINDOWS\system32> cd /
PS C:\>  Set-ExecutionPolicy Unrestricted

実行ポリシーの変更
実行ポリシーは、信頼されていないスクリプトからの保護に役立ちます。実行ポリシーを変更すると、about_Execution_Policies
のヘルプ トピック (https://go.microsoft.com/fwlink/?LinkID=135170)
で説明されているセキュリティ上の危険にさらされる可能性があります。実行ポリシーを変更しますか?
[Y] はい(Y)  [A] すべて続行(A)  [N] いいえ(N)  [L] すべて無視(L)  [S] 中断(S)  [?] ヘルプ (既定値は "N"): Y
PS C:\>
```

4 : VMware PowerCLIを操作
最後にDLしたアプリケーションをパソコンにインストールすると以下の様に2個表示されます｡

![Image from Gyazo](https://i.gyazo.com/066fe3f6d92065b3bcad19388b815e75.png)

```PowerShell
PowerCLI C:\> cd C:\ESXi-Customizer\
PowerCLI C:\ESXi-Customizer>  .\ESXi-Customizer-PS-v2.6.0.ps1 -v67 -pkgDir C:\ESXi-Customizer\
=> R を選択

~~略~~

All done.
```

![Image from Gyazo](https://i.gyazo.com/5a88256c11ed3cbeb71e14542b04d3ba.png)

5 : メディアに書き出し
メディアへの書き出し手順は省きます｡

![Image from Gyazo](https://i.gyazo.com/58d3d8a441a0ec8b92b941b868381f33.png)

## VMware ESXi セットアップ手順

焼いたメディアディスクをセットアップしたいデスクトップPCに入れて､Boot画面まで移動します｡

1 : Boot Menu

- ESXi-6.7.0~~~Installerを選択

![Image from Gyazo](https://i.gyazo.com/bd0d3949ab4314b340fdf58f8c4c1095.jpg)

2 : Welcome

- ｢Enter｣キーを押す

![Image from Gyazo](https://i.gyazo.com/9e4da3b36bca0b1b34f18e1b057ad0ec.jpg)

3 : EULA

- 同意書に問題が無いなら｢F11｣キーを押す

![Image from Gyazo](https://i.gyazo.com/940e6a285aa166941d74f227dff668e5.jpg)

4 : Disk to Install

- どのディスクにインストールをするのかを選択して｢Enter｣キーを押す

![Image from Gyazo](https://i.gyazo.com/7df54b7cdfdd8db32997c7bc7801d043.jpg)

5 : select a keyboard

- 使用しているキーボードの種類を選択して｢Enter｣キーを押す

![Image from Gyazo](https://i.gyazo.com/c42b4370b22d3266163031232a3dd8ec.jpg)

6 : root password

- Rootユーザーのパスワード設定(なるべく硬いのにしましょう)
  - ※忘れると大変です｡

![Image from Gyazo](https://i.gyazo.com/50cced46246188ae7684c03bab505026.jpg)

7 : Confirm Install

- 最終確認です！問題がなければ｢F11｣キーを押す

![Image from Gyazo](https://i.gyazo.com/d208ee18cfd52883188ab3c8e16eaf0b.jpg)

8 : Complete

- 下記の画面が表示されていれば､インストール完了です｡

![Image from Gyazo](https://i.gyazo.com/c89d55c3d0bd60e56204b10c625712e9.jpg)

再起動後に下記のように表示されていれば､『Hello VMware ESXi World』です｡

![Image from Gyazo](https://i.gyazo.com/da87afa00a96c2309eb54d368fd3c289.jpg)

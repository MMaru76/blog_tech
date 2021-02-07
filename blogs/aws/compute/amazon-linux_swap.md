---
title: 【swap】Amazon Linux スワップ領域作成方法
date: 2019-07-26
# sidebar: true
sidebar: "auto"
categories:
 - AWS
---

## 0. アイキャッチ画像

[![Image from Gyazo](https://i.gyazo.com/9673c9acc69927578a5337069b5ea93b.png)](https://gyazo.com/9673c9acc69927578a5337069b5ea93b)

## 1. 急いでる方は

::: warning
解説が不要でコマンドを今すぐに知りたい方は､以下のコマンド叩くことで512MBのswap領域を作成する事が出来ます｡

```sh
git clone https://github.com/MMaru76/swap-ec2
sudo sh swap-ec2/setup.sh
```

リポジトリ => <https://github.com/MMaru76/swap-ec2>
:::

## 2. そもそも swap領域とは

スワップ領域とは，仮想メモリ使用時に不必要なメモリ領域のデータを一時的に書き込んでおくファイルシステム上の領域のことです。 仮想メモリは，実際にコンピュータに搭載されているメモリだけではなく，ハードディスクなどに用意されたスワップ領域も仮想的にメモリとみなして，より大きなメモリ容量を実現する仕組みです。

> [「分かりそう」で「分からない」でも「分かった」気になれるIT用語辞典](https://wa3.i-3-i.info/word1721.html)

### 2.1. 実施環境

|Item|Contents|
|:---:|:---:|
|Amazon マシンイメージ (AMI)|Amazon Linux AMI 2018.03.0|
|インスタンスタイプ|t2.micro|
|ストレージ|8GiB ~|

## 3. swap領域の作成方法

rootユーザーにスイッチして作業をおこなう際は､｢sudo ~~｣のsudoを外して実行してください｡

### 3.1. Swap領域の確認

[Swap 0 0 0] <= 部分でSwap領域に何も割り当てられていない事が確認出来るかと思います｡

```sh
free

             total       used       free     shared    buffers     cached
Mem:       1009496     161364     848132         60       8308      98900
-/+ buffers/cache:      54156     955340
Swap:
```

### 3.2. Swap領域の作成

下記の例では､512MBのスワップファイルを作成を作成します｡

```sh
sudo dd if=/dev/zero of=/swapfile1 bs=1M count=512

512+0 レコード入力
512+0 レコード出力
536870912 バイト (537 MB) コピーされました、 4.55908 秒、 118 MB/秒
```

ルートディレクトリの直下にSwapファイルが作成されたことが確認出来るかと思います｡

```sh
ls -al /swapfile1
-rw-r--r-- 1 root root 536870912  7月 25 17:18 /swapfile1
```

### 3.3. 作成したスワップファイルをSwap領域用にフォーマット

```sh
sudo mkswap /swapfile1
スワップ空間バージョン1を設定します、サイズ = 524284 KiB
ラベルはありません, UUID=1c9af328-9a91-4079-bb7e-a3f30448008d
```

### 3.4. Swap領域の反映

/swapfile1 は安全では無い権限 0644 の為､ 0600 に切り替えます｡

```sh
sudo chmod 600 /swapfile1
```

スワップファイルを有効化してSwap領域の反映させます｡

```sh
sudo swapon /swapfile1
```

### 3.5. Swap領域の確認

[Swap: 524284 0 524284] <= 部分でSwap領域が割り当てられてる事が確認出来るかと思います｡

```sh
free
             total       used       free     shared    buffers     cached
Mem:       1009496     161948     847548         60       8376      99560
-/+ buffers/cache:      54012     955484
Swap:       524284          0     524284
```

## 4. 自動的にスワップファイルを有効化

現在のままでは､再起動後にSwap領域が0(ゼロ)の状態なため､自動的にスワップファイルを有効化してSwap領域に反映させます｡

### 4.1. もしもの為のバックアップ作成

バックアップはもしもの為に取っておくことを強くオススメ致します｡

```sh
sudo cp -p /etc/fstab /etc/fstab.org
ls -al /etc/fstab*
-rw-r--r-- 1 root root 274  6月 11 00:38 /etc/fstab
-rw-r--r-- 1 root root 274  6月 11 00:38 /etc/fstab.org
```

### 4.2. お好きなエディタでファイルを開いて編集

最終行に下記のコードを書き込む

`/swapfile1 swap swap defaults 0 0`

```sh
sudo vim /etc/fstab
~~以下略~~
proc        /proc       proc    defaults        0   0
/swapfile1  swap        swap    defaults        0   0
```

上手く記述が出来ていると下記のように表示されます｡

```sh
cat /etc/fstab
#
LABEL=/     /           ext4    defaults,noatime  1   1
tmpfs       /dev/shm    tmpfs   defaults        0   0
devpts      /dev/pts    devpts  gid=5,mode=620  0   0
sysfs       /sys        sysfs   defaults        0   0
proc        /proc       proc    defaults        0   0
/swapfile1  swap        swap    defaults        0   0
```

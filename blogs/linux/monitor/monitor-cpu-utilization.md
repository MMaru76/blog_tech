---
title: 【Linux】 CPU使用率をモニタリングする方法とコマンドの解説
date: 2020-10-20
# sidebar: true
tags:
  - モニタリング
  - コマンド解説
categories:
  - Linux
---

## はじめに

CPU使用率で全てが解決する訳ではありません｡要因解決の1つの手段です｡

また､CPU使用率は､中央処理装置またはCPUによって処理されている作業またはタスクの合計に他なりません｡

全てのプログラマーやインフラエンジニアが作業中のシステムのCPU使用率を監視する為の一般的な方法を事前に知っていることは非常に良いことだと思っています｡

ここでは､Linuxを使った紹介になりますが､Windowsやクラウドサービスのメトリクスなどは､またの次回へ！

> 情報が古かったりします｡

## 紹介一覧

- top
- htop
- nmon
- vmstat

以上の4つほどを紹介していきますが､実際に自分が使った感想や色々なサイトから学んだ方法記載していきます｡

## top

`top` コマンドは､システムパフォーマンスを監視するための最も古いコマンドまたはユーティリティの1つです｡基本的には､あらゆるLinuxオペレーティングシステムに組み込まれているユーティリティです｡

代表的な､タスク数･ユーザ数･CPU使用率･ロードアベレージ･メモリ使用量やアクティブなプロセスをリストなどを表示してくれます｡

```bash
$ top

top - 23:12:52 up 20 days, 53 min,  1 user,  load average: 0.40, 0.35, 0.33
Tasks: 203 total,   1 running, 202 sleeping,   0 stopped,   0 zombie
%Cpu(s):  3.6 us,  0.1 sy,  0.0 ni, 96.3 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
KiB Mem : 32622460 total,  5311900 free,  3861672 used, 23448888 buff/cache
KiB Swap: 16449532 total, 16435196 free,    14336 used. 28279848 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND
 1218 maru      20   0   17.6g   2.1g  17852 S  45.5  6.7  13993:59 java
30182 maru      20   0  162256   2400   1584 R   0.7  0.0   0:00.02 top
    1 root      20   0  191320   4296   2624 S   0.0  0.0  41:39.55 systemd
    2 root      20   0       0      0      0 S   0.0  0.0   0:00.32 kthreadd
    4 root       0 -20       0      0      0 S   0.0  0.0   0:00.00 kworker/0:0H
    6 root      20   0       0      0      0 S   0.0  0.0   0:36.00 ksoftirqd/0
    7 root      rt   0       0      0      0 S   0.0  0.0   0:00.05 migration/0
    8 root      20   0       0      0      0 S   0.0  0.0   0:00.00 rcu_bh
    9 root      20   0       0      0      0 S   0.0  0.0   3:18.02 rcu_sched
   10 root       0 -20       0      0      0 S   0.0  0.0   0:00.00 lru-add-drain
   11 root      rt   0       0      0      0 S   0.0  0.0   0:04.82 watchdog/0
   12 root      rt   0       0      0      0 S   0.0  0.0   0:04.76 watchdog/1
```

### 【1行目 : top - の解説】

- ```top - 23:12:52 up 20 days, 53 min,  1 user,  load average: 0.40, 0.35, 0.33```

|項目|説明|予備欄|
|:--:|:--:|:--:|
|現在時刻|今の時間|23:12:52|
|up|起動してからの時間|20日と53分|
|users|ログインしているユーザー数|1人|
|load average|1､5､15分間|0.40,0.35,0.33|

- load average について
    - 実行待ちプロセス数の平均
    - ロードアベレージは、値が大きければ大きいほど急激に負荷が掛かっている事がわかる
    - ただしロードアベレージが絶対では無い

ロードアベレージについては､別の機会に紹介予定

### 【2行目 : Tasks: の解説】

- ```Tasks: 203 total,   1 running, 202 sleeping,   0 stopped,   0 zombie```

|項目|説明|
|:--:|:--:|
|total|プロセスの総数|
|running|実行中のプロセス数|
|sleeping|スリープ状態のプロセス数|
|stopped|停止状態のプロセス数|
|zombie|ゾンビ状態のプロセス数|

### 【3行目 : %Cpu(s): の解説】

- ```%Cpu(s):  3.6 us,  0.1 sy,  0.0 ni, 96.3 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st```

|項目|説明|
|:--:|:--:|
|us|userのプログラムによる使用率|
|sy|systemのプログラムによる使用率|
|ni|nice指定プログラムの使用率|
|id|システムアイドル率|
|wa|IOの終了待ちのCPU使用率|
|hi|ハードウェア割り込み要求によるCPU使用率|
|si|ソフトウェア割り込み要求によるCPU使用率|
|st|ゲストOSが割り当て要求をしたが、割り当ててもらえなかったCPU使用率|

### 【4行目 : KiB Mem : の解説】

- ```KiB Mem : 32622460 total,  5311900 free,  3861672 used, 23448888 buff/cache```

|項目|説明|
|:--:|:--:|
|total|メモリ合計量|
|used|使用中のメモリ量|
|free|未使用のメモリ量|
|buffers|バッファに使用されているメモリ量|

### 【5行目 : KiB Swap: の解説】

- ```KiB Swap: 16449532 total, 16435196 free,    14336 used. 28279848 avail Mem```

|項目|説明|
|:--:|:--:|
|total|swap領域の合計量|
|used|使用中のスワップ領域|
|free|未使用のスワップ領域|
|cached|キャッシュされているスワップ領域|

### 【7行目】 各種フィールドについて

- ```PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND```

|項目|説明|予備欄|
|:--:|:--:|:--:|
|PID|プロセスIDで定期的に同じ番号が使用される｡|1から開始|
|PPID|親プロセスIDの事||
|USER|実行するタスク所有者||
|PR|タスクの優先度||
|NI||nice値|
|VIRT|タスクが使用してる仮想メモリの総量(kb)|VIRT=SWAP+RES|
|RES|常駐タスク｡タスクが使用しているスワップされていない物理メモリ(kb)|RES=CODE+DATA|
|SHR|共有メモリサイズ(kb)||
|S|プロセスの状態|【S プロセス状態について】を参照|
|%CPU|CPU使用率||
|%MEM|物理メモリメモリ使用率(RES)||
|TIME+|CPU時間(1/100単位)||
|COMMAND|コマンド名/プログラム名||

- S プロセス状態について
    - D : 割り込み要求不可
    - R : 実行中
    - S : スリープ状態
    - T : 停止中
    - Z : ゾンビモード
    - W : (スワップアウト)
    - I : (多分･･･アイドル状態の事をさしてる)
    - N : ナイス値がプラス+の状態
    - < : ナイス値がマイナス-の状態

### 【豆技】 プロセスのソート方法

|項目|コマンド|
|:--:|:--:|
|CPU|Shift + p|
|PID|Shift + n|
|メモリー|Shift + m|
|実行時間|Shift + t|

### 【豆技】 core別に表示する方法

- top コマンドを実行後に 1 と入力

```bash
top - 23:31:36 up 20 days,  1:11,  1 user,  load average: 0.14, 0.28, 0.30
Tasks: 204 total,   1 running, 203 sleeping,   0 stopped,   0 zombie
%Cpu0  :  4.7 us,  0.0 sy,  0.0 ni, 95.3 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu1  :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu2  : 32.4 us,  1.0 sy,  0.0 ni, 66.6 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu3  :  3.7 us,  0.3 sy,  0.0 ni, 96.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu4  :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu5  :  0.3 us,  0.0 sy,  0.0 ni, 99.7 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu6  :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu7  :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu8  :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu9  :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu10 :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu11 :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
KiB Mem : 32622460 total,  5309504 free,  3864004 used, 23448952 buff/cache
KiB Swap: 16449532 total, 16435196 free,    14336 used. 28277516 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND
 1218 maru      20   0   17.6g   2.1g  17852 S  43.5  6.7  14002:22 java
    1 root      20   0  191320   4296   2624 S   0.0  0.0  41:41.21 systemd
```

## vmstat

`vmstat` コマンドは､仮想メモリの総計､スワップ､ディスクIO､およびCPU使用率に関する情報を表示出来ます｡

```bash
$ vmstat

procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 0  0  14080 5387156   2132 23466480    0    0     1     4    1    0  4  0 96  0  0
```

### 各項目の解説

|タイトル|項目|説明|備考欄|
|:--:|:--:|:--:|:--:|
|procs|r|書き込みの時間を待っているプロセス数|不明|
||b|割り込み不可能なスリープ状態のプロセス数||
|memory|swpd|仮想メモリの量||
||free|空きメモリの量||
||buff|バッファに用いられてるメモリの量||
||cache|キャッシュに用いられてるメモリの量||
||inact|非アクティブなメモリの量|-a を付与後に表示|
||active|アクティブなメモリの量|-a を付与後に表示|
|swap|si|ディスクからスワップインされているメモリの量/s||
||so|ディスクにスワップしてるメモリの量/s||
|io|bi|ブロックデバイス(HDD)から受け取ったブロック(blocks/s)||
||bo|ブロックデバイスに送られたブロック(blocks/s)||
|system|in|1秒あたりの割り込み回数｡|クロック割り込みも含む←不明|
||cs|1秒あたりのコンテキストスイッチの回数|不明|
|cpu|us|カーネルコード以外の実行に使用した時間(ユーザー時間とniceも含む)||
||sy|カーネルコードの実行に使用した時間(システム時間)||
||id|IO待ち時間を含めてアイドル時間||
||wa|IO待ち時間||
||st|Time stolen from a virtual machine||

### オプションの使い方

`vmstat` [オプション] [何秒間隔] [何回]

- vmstat -a 2 4
    - 2秒間隔で計4回､非/アクティブなメモリ情報を表示する(オプション無しのデータも含めて)

```bash
$ vmstat -a 2 4

procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free  inact active   si   so    bi    bo   in   cs us sy id wa st
 0  0  14080 5389496 16232548 6498244    0    0     1     4    1    0  4  0 96  0  0
 1  0  14080 5390040 16232552 6498064    0    0     0     0 4397 7917  3  0 97  0  0
 0  0  14080 5390312 16232552 6498296    0    0     0     0 4410 7986  4  0 96  0  0
 1  0  14080 5390328 16232440 6498408    0    0     0     0 4492 8140  3  0 97  0  0
```

### ディスク モード欄の説明

- 4.4.6. 【オプション -d】で使用します｡

|タイトル|項目|説明|備考欄|
|:--:|:--:|:--:|:--:|
|reads|total|読み込みに成功した総数||
||merged|グループ化された読み込み数||
||sectors|読み込みに成功したセクタ数||
||ms|読み込みに使用した時間(ミリ秒)||
|writes|total|書き出しに成功した総数||
||merged|グループ化された書き込み数||
||sectors|書き出しに成功したセクタ数||
||ms|書き出しに使用した時間||
|IO|cur|現在実行中の I/O 数||
||sec|I/Oに使用した時間(秒)||

### vmstatの各種オプションについて

#### 【オプション -a】

- アクティブ/非アクティブなメモリも表示
- active/inact が表示

```bash
[root@na ~]# vmstat -a
procs -----------memory---------- ---swap-- -----io---- --system-- -----cpu-----
 r  b   swpd   free  inact active   si   so    bi    bo   in   cs us sy id wa st
 0  0      0 1779516 110672 100296    0    0    86    57   19   32  0  0 99  0  1
```

#### 【オプション -f】

- ブート後のfork数を表示

```bash
[root@na ~]# vmstat -f
         2819 forks
```

#### 【オプション -t】

- タイムスタンプを付けて表示
  - 査時にタイムスタンプを載せて置くと､コマンドの実行時間が可視化

```bash
[root@na ~]# vmstat -t
procs -----------memory---------- ---swap-- -----io---- --system-- -----cpu------ ---timestamp---
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 0  0      0 1779640  11800 176440    0    0   120    79   23   40  1  0 98  0  1       2018-07-28 23:09:36 JST
```

#### 【オプション -n】

- ヘッダの表示を無くす

```bash
[root@na ~]# vmstat -n
procs -----------memory---------- ---swap-- -----io---- --system-- -----cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 0  0      0 1779516  11808 176444    0    0   117    77   23   39  1  0 98  0  1
```

#### 【オプション -s】

- 各種のイベントカウンタとメモリの総計を表示
    - 上手く活用出来たら､素晴らしそう

```bash
[root@na ~]# vmstat -s
      2041684  total memory
       262168  used memory
       100184  active memory
       110668  inactive memory
      1779516  free memory
        11820  buffer memory
       176444  swap cache
      3145724  total swap
            0  used swap
      3145724  free swap
          658 non-nice user cpu ticks
            0 nice user cpu ticks
          235 system cpu ticks
       102818 idle cpu ticks
          191 IO-wait cpu ticks
            0 IRQ cpu ticks
            3 softirq cpu ticks
          703 stolen cpu ticks
       117874 pages paged in
        77524 pages paged out
            0 pages swapped in
            0 pages swapped out
        23263 interrupts
        39497 CPU context switches
   1532786002 boot time
         2826 forks
```

#### 【オプション -d】

- ディスクの総計を表示
    - iostat と表示の仕方が違うのかな?不明

```bash
[root@na ~]# vmstat -d
disk- ------------reads------------ ------------writes----------- -----IO------
       total merged sectors      ms  total merged sectors      ms    cur    sec
xvda    6055      8  230105    4968    967    352  155056   14396      0      2
xvdf     383      0    5644     156      2      0      16       4      0      0
```

#### 【オプション -p [パーティション]】

- 指定したパーティションの詳細な総計を表示

```bash
[root@na ~]# vmstat -p /dev/xvdf1
xvdf1         reads   read sectors  writes    requested writes
                 117       1794          1          8
[root@na ~]# vmstat -p /dev/xvda1
xvda1         reads   read sectors  writes    requested writes
                5937     227401        972     155104
```

#### 【オプション -S [k/K/m/M]】

- 出力を､k:1000/K:1024/m:1000000/M:1048576 バイト単位に切り替えて表示

```bash
[root@na ~]# vmstat -S M
procs -----------memory---------- ---swap-- -----io---- --system-- -----cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 1  0      0   1737     11    172    0    0    93    61   20   34  1  0 99  0  1
[root@na ~]# vmstat
procs -----------memory---------- ---swap-- -----io---- --system-- -----cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 0  0      0 1779516  11844 176516    0    0    93    61   20   34  1  0 99  0  1
```
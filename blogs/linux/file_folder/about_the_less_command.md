---
title: 【Linux】less のコマンドについて
date: 2020-11-02
# sidebar: true
sidebar: "auto"
tags:
  - コマンド解説
categories:
  - Linux
---

## 1. less コマンドとは

---

`less` は､テキストファイルを 1 画面ずつ表示するコマンドです｡

## 2. 書式

---

```bash
$ less [file]
```

安全にかつ、タイムスタンプに対して変更せずに閲覧する事が出来る。

編集の時は、vi(vim) などを使う。`less` / `view` は閲覧のみ。

```bash
$ grep [抽出] [file]
```

特定のファイルから特定のキーワードを抽出する際に、利用するコマンドである。

ファイルの中身は変更せずに、特定のキーワードを抽出を行う

## 3. オプションや表示など

---

### 3.1. 標準的な使い方

```bash
[root@m ~]# less nginx.log

# nginx -V >> nginx.log

nginx version: nginx/1.18.0
built by gcc 4.8.5 20150623 (Red Hat 4.8.5-39) (GCC)
built with OpenSSL 1.0.2k-fips  26 Jan 2017
TLS SNI support enabled
configure arguments:
  --prefix=/etc/nginx
  --sbin-path=/usr/sbin/nginx
  --modules-path=/usr/lib64/nginx/modules
  --conf-path=/etc/nginx/nginx.conf
  --error-log-path=/var/log/nginx/error.log
  --http-log-path=/var/log/nginx/access.log
  --pid-path=/var/run/nginx.pid
  --lock-path=/var/run/nginx.lock
nginx.log (END)
```

### 3.2. コマンドなどの使い方

---

- 閲覧中ファイルの末尾に更新があった場合
  - less ファイル名　←ファイルを閲覧
  - Shift + f　←tail -f と同じ効果
  - Ctrl + c ←less に戻る際
- 閲覧中に v を入力すると viエディタ を起動する方法
  - less ファイル
  - vi 切り替え 更新　保存
  - less に戻る

### 3.3. 番号の表示

---

- 行ごとに番号を付属して表示する場合
  - 最初の列 1から始まっている方が-N オプションの結果

```bash
[root@m ~]# less -N nginx.log

      1 # nginx -V >> nginx.log
      2
      3 nginx version: nginx/1.18.0
      4 built by gcc 4.8.5 20150623 (Red Hat 4.8.5-39) (GCC)
      5 built with OpenSSL 1.0.2k-fips  26 Jan 2017
      6 TLS SNI support enabled
      7 configure arguments:
      8   --prefix=/etc/nginx
      9   --sbin-path=/usr/sbin/nginx
     10   --modules-path=/usr/lib64/nginx/modules
     11   --conf-path=/etc/nginx/nginx.conf
     12   --error-log-path=/var/log/nginx/error.log
     13   --http-log-path=/var/log/nginx/access.log
     14   --pid-path=/var/run/nginx.pid
     15   --lock-path=/var/run/nginx.lock
nginx.log (END)
```

### 3.4. パイプで渡して閲覧

---

- 特定のキーワードだけを抽出して、lessする

```bash
[root@m ~]# grep "nginx" nginx.log | less

# nginx -V >> nginx.log
nginx version: nginx/1.18.0
  --prefix=/etc/nginx
  --sbin-path=/usr/sbin/nginx
  --modules-path=/usr/lib64/nginx/modules
  --conf-path=/etc/nginx/nginx.conf
  --error-log-path=/var/log/nginx/error.log
  --http-log-path=/var/log/nginx/access.log
  --pid-path=/var/run/nginx.pid
  --lock-path=/var/run/nginx.lock
(END)
```

### 3.5. パイブで渡して番号を付けて閲覧

---

- 特定のキーワードだけを抽出して、lessに渡して番号を付ける

```bash
[root@m ~]# grep "nginx" nginx.log | less -N

      1 # nginx -V >> nginx.log
      2 nginx version: nginx/1.18.0
      3   --prefix=/etc/nginx
      4   --sbin-path=/usr/sbin/nginx
      5   --modules-path=/usr/lib64/nginx/modules
      6   --conf-path=/etc/nginx/nginx.conf
      7   --error-log-path=/var/log/nginx/error.log
      8   --http-log-path=/var/log/nginx/access.log
      9   --pid-path=/var/run/nginx.pid
     10   --lock-path=/var/run/nginx.lock
(END)
```

### 3.6. パイプで渡してデータを保存

---

- 抽出後の閲覧後のデータを保存する
  - nginx.logからnginxに該当するキーワードを抽出後に、less に渡してファイルを保存して閲覧

```bash
[root@m ~]# grep "nginx" nginx.log | less -o test_op.log
[root@m ~]# cat test_op.log
# nginx -V >> nginx.log
nginx version: nginx/1.18.0
  --prefix=/etc/nginx
  --sbin-path=/usr/sbin/nginx
  --modules-path=/usr/lib64/nginx/modules
  --conf-path=/etc/nginx/nginx.conf
  --error-log-path=/var/log/nginx/error.log
  --http-log-path=/var/log/nginx/access.log
  --pid-path=/var/run/nginx.pid
  --lock-path=/var/run/nginx.lock
```

### 3.7. パーセント表示

- ファイルの全体の進行率
  - 左下に進行率を表示

```bash
[root@m ~]# less -m ddagent-install.log

ESC[34m
* Installing YUM sources for Datadog
ESC[0m
ESC[34m* Installing the Datadog Agent package
ESC[0m
Loaded plugins: fastestmirror, langpacks
Cleaning repos: base bintray--ookla-rhel datadog epel extras nginx-stable
              : updates
23 metadata files removed
11 sqlite files removed
0 metadata files removed
Loaded plugins: fastestmirror, langpacks
Loading mirror speeds from cached hostfile
Resolving Dependencies
--> Running transaction check
---> Package datadog-agent.x86_64 1:7.22.0-1 will be installed
--> Finished Dependency Resolution

Dependencies Resolved

================================================================================
 Package               Arch           Version             Repository       Size
================================================================================
Installing:
ddagent-install.log 30%
```

### 3.8. 空白をまとめる

---

- 連続した空白行を1つの空白行にまとめる
  - cat コマンドを参照

```bash
less -s [ファイル]
```

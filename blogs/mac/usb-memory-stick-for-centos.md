---
title: 【Mac】CentOSインストール用のUSBメモリの作成手順
date: 2021-04-17
category:
# sidebar: true
sidebar: "auto"
tags:
  - CentOS 8
  - Linux
categories:
  - Mac
---

## 1. はじめに

今までは､Windows10 とかを使って､DVDを焼いていたのですが､最近はMacを使い始めてDVDとかを焼くのも大変だなー｡ってことでUSBでやってみた｡

## 2. マウント情報の確認

`/dev/disk2` として､マウントされていることが確認できる｡

- name : USB01

```sh
▶ diskutil list

/dev/disk0 (internal, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                        *1.0 TB     disk0
   1:                        EFI EFI                     314.6 MB   disk0s1
   2:                 Apple_APFS Container disk1         1.0 TB     disk0s2

/dev/disk1 (synthesized):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      APFS Container Scheme -                      +1.0 TB     disk1
                                 Physical Store disk0s2
   1:                APFS Volume MacSDD - Data           111.6 GB   disk1s1
   2:                APFS Volume Preboot                 461.8 MB   disk1s2
   3:                APFS Volume Recovery                613.9 MB   disk1s3
   4:                APFS Volume VM                      20.5 KB    disk1s4
   5:                APFS Volume MacSDD                  15.1 GB    disk1s5
   6:              APFS Snapshot com.apple.os.update-... 15.1 GB    disk1s5s1

/dev/disk2 (external, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:     FDisk_partition_scheme                        *31.0 GB    disk2
   1:                 DOS_FAT_32 USB01                   31.0 GB    disk2s1
```

## 3. USBメモリを初期化

Mac 標準機能のディスクユーティリティでもできますが､ココではコマンドで実施していく｡

- 形式 : MS-DOS
- 名前 : USB001

```sh
▶ diskutil eraseDisk MS-DOS UBS001 /dev/disk2
Started erase on disk2
Unmounting disk
Creating the partition map
Waiting for partitions to activate
Formatting disk2s2 as MS-DOS (FAT) with name UBS001
512 bytes per physical sector
/dev/rdisk2s2: 60177664 sectors in 1880552 FAT32 clusters (16384 bytes/cluster)
bps=512 spc=32 res=32 nft=2 mid=0xf8 spt=32 hds=255 hid=411648 drv=0x80 bsec=60207104 bspf=14692 rdcl=2 infs=1 bkbs=6
Mounting disk
Finished erase on disk2
```

## 4. USBメモリをアンマウント

USBメモリがマウントされていると､isoイメージを書き込めないので､アンマウントする｡

```sh
▶ diskutil unmountDisk /dev/disk2
Unmount of all volumes on disk2 was successful
```

## 5. isoイメージをUSBメモリに焼く

- if : ソース
- of : 焼く先

```sh
▶ sudo dd if=~/Downloads/CentOS-Stream-8-x86_64-20210416-boot.iso of=/dev/rdisk2 bs=1m
Password:
723+0 records in
723+0 records out
758120448 bytes transferred in 74.671276 secs (10152772 bytes/sec)
```

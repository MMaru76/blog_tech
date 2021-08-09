---
title: 【Linux】while文とsedコマンドを使って先頭に文字を付与
date: 2020-06-11
# 1. sidebar: true
sidebar: "auto"
tags:
  - Linuxコマンド
  - Shell Script
categories:
  - Linux
---

```bash
LIST_GROUP=./list.tmp
I=0
while IFS= read -r line
do
  sed -e "s/^\"oreo/$I\"$I\_$line\:\"oreo/g" ./logs_dir/$line.csv >> All_Logs.csv
  I=`expr $I + 1`
done < ${LIST_GROUP}
```
---
title: 【ECS EC2】 ECSで起動しているEC2インスタンスIDを再帰的に取得
date: 2020-10-07
# sidebar: true
sidebar: "auto"
tags:
  - CLI
  - ECS
  - EC2
categories:
  - AWS
---

## 背景

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ECS EC2タイプのInstance_ID一覧が欲しい！まるちゃんお願い!!!<br>↓<br>良いよ｡<br>↓<br>出来た｡<br>↓<br>ごめんやっぱり不要だったわ｡<br>↓<br>ふぁ･･･←今ココ<br><br>会社で使われないし､日に当たる事も無いので｡<a href="https://t.co/hDp9DmumRL">https://t.co/hDp9DmumRL</a> <a href="https://t.co/4YyXAczMN2">pic.twitter.com/4YyXAczMN2</a></p>&mdash; まるちゃんLv24@DevOps (@M_Maru76) <a href="https://twitter.com/M_Maru76/status/1313334595467714560?ref_src=twsrc%5Etfw">October 6, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 事前準備

AWS CLI バージョン2が導入済み

:::tip
[【EC2 AmazonLinux2】 AWS CLI バージョン 2 セットアップ](https://tabiya.dev/blogs/aws/compute/amazon-linux2-cli.html)
:::

## 環境構築

|項目|値|
|:--:|:--:|
|CLUSTER_NAME_OR_ARN|ECSのARN|
|ECS_SERVICE_NAME|サービス名前|
|PROFILE|--profile あなたのプロファイル|

```sh
#!/bin/bash
export CLUSTER_NAME_OR_ARN="ECSのARN"
export ECS_SERVICE_NAME="サービス名前"
export PROFILE="--profile あなたのプロファイル"
FILS=ALL_Container_Instance.log

# ## 一覧
# aws ecs $PROFILE list-tasks \
#  --cluster $CLUSTER_NAME_OR_ARN \
#  --service-name $ECS_SERVICE_NAME > ${ECS_SERVICE_NAME}_LIST_tasks.log

# ## タスクの詳細情報
export ECS_TASK_ARNS="$(aws ecs list-tasks \
    --cluster $CLUSTER_NAME_OR_ARN \
    --service-name $ECS_SERVICE_NAME \
    --output text | sed -e 's/\s/ /g' | cut -d ' ' -f2 | tr '\n' ' ')"

aws ecs describe-tasks \
    --cluster $CLUSTER_NAME_OR_ARN \
    --tasks $(echo $ECS_TASK_ARNS) \
    --output yaml | grep "containerInstanceArn" | awk '{print substr($0, 25)}' > $FILS

echo $ECS_SERVICE_NAME >> Instances_List.log

while read line
do
    aws ecs $PROFILE describe-container-instances \
    --cluster $CLUSTER_NAME_OR_ARN \
    --container-instances $line --output yaml | grep "ec2InstanceId" >> Instances_List.log
done < ${FILS}
```

## 出力例

```sh
サービス名
  ec2InstanceId: i-IDだよ
  ec2InstanceId: i-IDだよ
```

## 参考にさせて頂いたサイト

- [ecs — AWS CLI 1.18.154 Command Reference](https://docs.aws.amazon.com/cli/latest/reference/ecs/index.html)
- [awscli ECS 関連コマンドメモ](https://qiita.com/notakaos/items/eda64c3c38b17f181698)
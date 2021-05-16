---
title: 【毎日更新】kubernetes on AWS 学習履歴
description: 基本的な Kubernetes のコマンド
date: 2021-05-16
# sidebar: true
sidebar: "auto"
tags:
  - コンテナ
categories:
  - Kubernetes
---

自分が下記で学んだ事を雑に書いていく

【[Kubernetes on AWS ~アプリケーションエンジニア 本番環境へ備える](https://amzn.to/33KXXqL)】

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">はい <a href="https://t.co/Ai3tcVfpSQ">pic.twitter.com/Ai3tcVfpSQ</a></p>&mdash; 丸屋 正志/まるちゃんLv25 (@M_Maru76) <a href="https://twitter.com/M_Maru76/status/1393806724813910017?ref_src=twsrc%5Etfw">May 16, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


## 1. 2-2-2 EKS クラスターの構築

### 1.1. EKS クラスター作成

EKS に対してクラスターを作成する際に用いるコマンドである｡</br>

```bash
eksctl create cluster \ ←以下の引数を指定して eksctl を実行
 --vpc-public-subnets SubnetsのA値,SubnetsのB値,SubnetsのC値 \ ←ワーカーノード用サブネット
 --name eks-work-cluster \ ←クラスター名
 --region ap-northeast-1 \ ←リージョン
 --version 1.19 \ ←EKSクラスターのバージョン(1.16~1.19)
 --nodegroup-name eks-work-nodegroup \ ←ノードグループ名
 --node-type t2.small \ ←ワーカーノードのインスタンスタイプ
 --nodes 2 \ ←ワーカーノードの数
 --nodes-min 2 \ ←ワーカーノードの最小ノード数
 --nodes-max 5 ←ワーカーノードの最大ノード数
```

- eksctl は EKS クラスター構築の中で kubeconfig ファイルを自動的に更新してくれる｡
- kubeconfig ファイル､kubernetes クライアントであるkubectl が利用する設定ファイルの接続先のkubernetesクラスターの接続情報(コントロールプレーンのURL､認証情報､Namespaceなど)を保持している

### 1.2. コンテキストの確認

eksctlを使って作成後にコンテキストが作成されているかを確認と有効になっているかを確認｡

```bash
kubectl config get-contexts
```

- 理解しやすいために出力結果をテーブルに記載｡</br>

|CURRENT|NAME|CLUSTER|AUTHINFO|NAMESPACE|
|:--:|:--:|:--:|:--:|:--:|
||docker-desktop|docker-desktop|docker-desktop|
||minikube|minikube|minikube|default|
|\*|まるちゃん@eks-work-cluster.ap-northeast-1.eksctl.io|eks-work-cluster.ap-northeast-1.eksctl.io|まるちゃん@eks-work-cluster.ap-northeast-1.eksctl.io|

### 1.3. 接続確認

kubectl から EKS クラスターに接続できるようになったことを確認する場合は､下記コマンド

```bash
kubectl get nodes

NAME                                               STATUS   ROLES    AGE   VERSION
ip-192-168-1-244.ap-northeast-1.compute.internal   Ready    <none>   18m   v1.19.6-eks-49a6c0
ip-192-168-2-178.ap-northeast-1.compute.internal   Ready    <none>   18m   v1.19.6-eks-49a6c0
```

## 2. 2-2-3 EKS クラスターの動作確認


### 2.1. リソースの作成

```bash
kubectl apply -f ファイル名.yaml

pod/nginx-pod created
```

### 2.2. Pod が配置されていることを確認

```bash
kubectl get pods

NAME        READY   STATUS    RESTARTS   AGE
nginx-pod   1/1     Running   0          11m
```

### 2.3. ポートフォワーディング

8080 に対してアクセスしたのを 80 に切り替え

```bash
kubectl port-forward nginx-pod 8080:80

Forwarding from 127.0.0.1:8080 -> 80
Forwarding from [::1]:8080 -> 80
```

### 2.4. Pod の削除

```bash
kubectl delete pod nginx-pod

pod "nginx-pod" deleted
```
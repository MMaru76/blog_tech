---
title: 【随時更新】kubectl 基本的なコマンド一覧
description: 基本的な Kubernetes のコマンド
date: 2020-08-16
# sidebar: true
sidebar: "auto"
tags:
  - コマンド使い方
  - コンテナ
categories:
  - Kubernetes
---

::: danger 注意！
編集中です｡
:::

::: tip 参考
基本的に一般ユーザーで実施しています｡
:::

## 認証情報とContext(config)

- kubectl は Kubernetes Master(~/.kube/config) に書かれている情報を元に接続
- 複数作成する事も可能

> ファイル名 : ~/.kube/config
```yaml
apiVersion: v1
kind: Config
preferences: {}
clusters: # 接続先クラスタ
  - name: sample-cluster1
    cluster:
      server: https://localhost:6443
users: # 認証情報
  - name: sample-user1
    user:
      client-certificate-data: LS0tLS1CRUdJTi...
      client-key-data: LS0tLS1CRUdJTi...
contexts: # 接続先と認証情報の組み合わせ
  - name: sample-context1
    context:
      cluster: sample-cluster1
      namespace: default
      user: sample-user1
current-context: sample-context1
```

### クラスタの定義を追加･変更

```vim
$ kubectl config set-cluster sample-cluster1 --server=https://localhost:6443
```

### 認証情報の定義を追加･変更

(未検証の為････不明)

```vim
$ kubectl config set-credentials admin-user \
    --client-certificate=./sample.crt \
    --client-key=./sample.key \
    --embed-certs=true
```

### Context の定義を追加･変更<br>(クラスタ/認証情報/Namespaceを定義)

- 複数作成する場合は `sample-cluster2` などに変更すれば作成が可能

```vim
$ kubectl config set-context sample-context1 \
  --cluster=sample-cluster1 \
  --user=sample-user1 \
  --namespace=default
```

### Contextの一覧を表示

```vim
$ kubectl config get-contexts

=>CURRENT   NAME                 CLUSTER           AUTHINFO         NAMESPACE
  *         docker-desktop       docker-desktop    docker-desktop
            sample-context1      sample-cluster1   sample-user1     default
```

### 現在のContextを表示

```vim
$ kubectl config current-context

=>docker-desktop
```

### Contextの切り替え

```vim
$ kubectl config use-context sample-context1

=>Switched to context "sample-context1".
```

- 再度Contextの一覧を表示すると指定されたContextに変更が確認出来る

```vim
$ kubectl config get-contexts

=>CURRENT   NAME                 CLUSTER           AUTHINFO         NAMESPACE
          docker-desktop       docker-desktop    docker-desktop
*         sample-context1      sample-cluster1   sample-user1     default
```

### コマンドの実行ごとにContextを指定

(未検証の為････不明)

```vim
$ kubectl --context sample-context1 get pod
```

## マニフェストとリソースの作成/削除/更新(create/delete/apply)

> ファイル名 : sample-pod1.ymal
```ymal
apiVersion: v1
kind: Pod1
metadata:
  name: sample-pod1
spec:
  containers:
  - name: nginx-container
    image: nginx:1.16
```

### リソースの作成

```vim
$ kubectl create -f sample-pod.yaml
リソースが存在しない場合 : => pod "sample-pod" created
リソースが存在する場合 : => Error from server (AlreadyExists): ~略~ already
```

### Podの一覧を表示

|項目|概要|
|:--:|:--:|
|NAME|名前|
|READY||
|STATUS|起動状態<br>Running : 稼働中<br>Stopping : 停止(作成中)|
|RESTARTTS||
|AGE||

```vim
$ kubectl get pods
```

### リソースの削除

```vim
$ kubectl delete -f sample-pod.yaml
リソースが存在する場合 : => pod "sample-pod" deleted
リソースが存在しない場合 : => Error from server (NotFound): ~略~ not found
```

### 特定リソースのみ削除

```vim
$ kubectl delete pod sample-pod
```

### 特定のリソース種別をすべて削除

```vim
$ kubectl delete pod --all
```

### リソースを削除 (削除完了を待機)

```vim
$ kubectl delete -f sample-pod.yaml --wait
```

### リソースの即時強制削除

```vim
$ kubectl delete -f sample-pod.yaml --grace-period 0 --force
```

### 変更の適応

```vim
$ kubectl apply -f sample-pod.yaml
```

|項目|出力結果|
|:--:|:--:|
|変更点がある場合|pod "sample-pod" configured|
|変更点がない場合|pod "sample-pod" unchanged|
|リソースが存在しない場合|pod "sample-pod" created|

## Server-side apply

### Server-side apply を有効化してマニフェストの作成/適用

```vim
$ kubectl apply -f sample-pod.yaml --server-side
```

### イメージの更新

```vim
$ kubectl set image pod sample-pod nginx-container=nginx:1.17
```

### コンフリクトを無視して強制的にマニフェストを適用

```vim
$ kubectl apply -f sample-pod.yaml \
    --server-side \
    --force-conflicts
```

### Pod の sample-pod をyamlとして出力

```vim
$ kubectl get pod sample-pod -o yaml
```

### Manager名を変更の適用(CIツールからの実行場合)

```vim
$ kubectl apply -f sample-pod.yaml --server-side --field-manager ci-tool
```

## Podの再起動 (rollout restart)

### Deployment リソースのすべてのPodのリスタート

```vim
$ kubectl rollout restart deployment sample-deploment
```

## GenrateName によるランダムな名前のリソースの作成

### ランダムな名前作成

- サンプルソース : sample-pod.yaml
```yaml
apiVersion: v1
kind: Pod
metadata:
  generateName: sample-generatename-
spec:
  containers:
  - name: nginx-container
    image: nginx:1.16
```

```vim
$ kubectl create -f sample5_1.yaml
=> pod/sample-generatename-ランダムな5文字 created
```

## リソースの状態のチェックと待機 (wait)

### sample-pod が正常に起動する(Ready状態になる)まで待機する

```vim
$ kubectl wait --for=condition=Ready pod/sample-pod
pod/sample-pod condition met
```

#### マニフェストファイルを指定してPodが正常に起動する(Ready状態になる)

```vim
$ kubectl wait --for=condition=Ready sample-pod.yaml
```

### すべてのPodがスケジューリングされる(PodScheduled状態になる)まで待機する

```vim
$ kubectl wait --for=condition=PodScheduled pod --all
```

### すべてのPodが削除されるまでPod毎に最大5秒ずつ待機

```vim
$ kubectl wait --for=delete pod --all --timeout=5s
```

### すべてのPodを削除､実行語すぐに次のkubectl wait を実行

```vim
$ kubectl delete pod --all --wait-false
```

### すべてのPodが削除されるまで待機

```vim
$ kubectl wait --for=delete pod -all
```

## 複数のマニフェストファイルを同時に適用

### ディレクトリ配下のすべてのYAMLファイルを指定リソースを作成

```vim
$ kubectl apply -f ./sample-dir
```

### 指定したディレクトリ行かのファイルを再帰的に適用

```
kubectl apply -f ./sample-dir -R
```

## アノテーション

### アノテーションの付与

```vim
$ kubectl annotate pods sample-annotations annotation3=val3
pod/sample-annotations annotated
```

### アノテーションの付与(上書きを許可)

```vim
$ kubectl annotate pods sample-annotations annotation3=val3-new --overwrite
pod/sample-annotations annotated
```

### アノテーションの確認

```vim
$ kubectl get pod sample-annotations -o json | jq .metadata.annotations
```

### アノテーションの削除

```vim
$ kubectl annotate pods sample-annotations annotation3-
```

## ラベル

### ラベルの付与

```vim
$ kubectl label pods sample-label label3=val3
pod/sample-label labeled
```

### ラベルの付与(上書きを許可)

```vim
$ kubectl label pods sample-label label3=val3-new --overwrite
pod/sample-label labeled
```

### ラベルの確認

```vim
$ kubectl get pod sample-label -o json | jq .metadata.labels
```

### ラベルの削除

```vim
$ kubect label pods sample-label label3-
pod/sample-label labeled
```

### label1-val1とlabel2ラベルを持つPodを表示

```vim
$ kubectl get pods -l label1=val1,label2
```

### PodとLabel1ラベルを表示

```vim
$ kubectl get pods -L label1
```

### label1ラベルを持つPodとlabel2ラベルを表示

```vim
$ kubectl get pods -l label1 -L label2
```

### すべてのラベルを表示してPodの一覧を出力

```vim
$ kubectl get pods --show-labels
```

## Prune によるリソースの削除

### 初回の作成

```vim
$ kubectl apply -f ./prune-sample --prune -l system=a
pod "sample-pod1" created
pod "sample-pod2" created
```

### ファイルを削除

```vim
$ rm prune-sample/sample-pod1.yaml
```

### sample-pod1.yamlふが削除された状態で再度同じコマンドで更新

```vim
$ kubectl apply -f ./prune-sample --prune -l system=a
pod "sample-pod1" unchanged
pod "sample-pod2" pruned
```

## リソースの一部情報の更新(set)

### sample-pod内のnginx-containerコンテナのコンテナイメージを確認

```vim
$ kubectl describe pod sample-pod
```

### コンテナイメージをnginx:1.17 からnginx:1.16に変更

```vim
$ kubectl set image pod sample-pod nginx-container=nginx:1.16
```

## ローカルマニフェストとkubernetes上の登録情報の差分取得(diff)

### クラスタの登録情報とマニフェストの差分を確認

```vim
$ kubectl diff -f sample-pod.yaml
```

## 利用可能なリソース種別の一覧取得(api-resources)

### すべてのリソース種別を表示

```vim
$ kubectl api-resources
```

### Namespaceレベルに属しているリソース

```vim
$ kubectl api-resources --namespace=true
```

### Clusterレベルに属しているリソース

```vim
$ kubectl api-resources --namespace=false
```

## リソースの情報取得(get)

### Podの一覧を表示

```vim
$ kubectl get pods
```

### 特定のPodの情報だけを表示

```vim
$ kubectl get pod sample-pod
```

### label1=val1 とlabel2ラベルを持つPodを表示

```vim
$ kubectl get pods -l label1=val1,label2 --show-labels
```

### Podの一覧を表示(より詳しく表示)

```vim
$ kubectl get pods -o wide
```

### YAML形式でPodの詳細情報リストを出力

```vim
$ kubectl get pods -o yaml
```

### YAML形式で特定のPodの症状情報を出力

```vim
$ kubectl get pods -o yaml sample-pod
```

### ノードの一覧を表示

```vim
$ kubectl get nodes
```

### 作成されているほぼすべて種類のリソースを表示

```vim
$ kubectl get all
```

### リソースの状態変化があるものを出力

```vim
$ kubectl get nodes --watch
```

### リソースの処理工程を表示

```vim
$ kubectl get nodes --watch --output-watch-events
```

## リソースの詳細情報の取得(describe)

### ノードの詳細情報を表示

```vim
$ kubectl describe node ノード名
```

## 実際のリソースの使用量を確認 (top)

### ノードのリソース使用量を確認

```vim
$ kubectl top node
```

### Podごとのリソース使用量を確認

```vim
$ kubectl -n kube-system top pod
```

### Podの一覧を表示

```vim
$ kubectl -n kube-system get pods
```

### コンテナごとのリソース使用量を確認

```vim
$ kubectl -n kube-system top pod --containers
```

## コンテナ上でのコマンドの実行(exec)

### Pod内のコンテナで/bin/lsを実行

```vim
$ kubectl exec -it sample-pod -- /bin/ls
```

### 複数コンテナが入ったPodの特定のコンテナで/bin/lsを実行

```vim
$ kubectl exec -it sample-pod -c nginx-container -- /bin/ls
```

### Pod内のコンテナで /bin/bash を実行 (終了する際はexitを実行)

```vim
$ kubectl exec -it sample-pod -- /bin/bash
=> root@sample-pod:/#
```

### パイプなど特殊な文字が含まれる場合は､/bin/bashに引数を渡す形で実行

```vim
$ kubectl exec -it sample-pod -- /bin/bash -c "ls -all --classify | grep lib"
```

## ローカルマシンからPodへのポートフォワーディング(port-forward)

### localhost:8888宛の通信をPod80/TCPポートに転送

- 終了する際はCtrl+cを入力

```vim
$ kubectl port-forward sample-pod 8888:80
```

- 疎通確認

```vim
$ curl -I localhost:8888
```

### sample-deploymentに紐付くPodのうち1つにポートフォワーディング

```vim
$ kubectl port-forward deployment/sample-deployment 8888:80
```

## コンテナのログ確認(logs)

### Pod内のコンテナのログを出力

```vim
$ kubectl logs sample-pod
```

### 複数コンテナが入ったPodで特定のコンテナのログを出力

```vim
$ kubectl logs sample-pod -c nginx-container
```

### follow しながらログを出力

```vim
$ kubectl logs -f sample-pod
```

### 最新1時間以内､10件取得､タイムスタンプを表示してログを出力

```
$ kubectl logs --since=1h --tail=10 --timestamp=true sample-pod
```

### app=sample-app ラベルを持つすべてのPodのログを出力

```vim
$ kubectl logs --selector app=sample-app
```

## コンテナとローカルマシン間でのファイルのコピー(cp)

### sample-pod内の/etc/hostnameファイルをローカルマシンにコピー

```vim
$ kubectl cp sample-pod:etc/hostname ./hostname
```

- ローカルマシン内の hostname ファイルの確認

```vim
$ cat hostname
=> sample-pod
```

### 取得したローカルファイルをコンテナにコピー

```vim
$ kubectl cp hostname sample-pod:/tmp/newfile
```

- コンテナ内の tmp 配下を確認

```vim
$ kubectl exec -it sample-pod -- ls /tmp
=> newfile
```

## kubect plugin とパッケージマネージャ(plugin/krew)

### プラグインの一覧を表示

```vim
$ kubectl plugin list
```

### プラグインのインストール

```vim
$ kubectl krew install tree rolesum sort-manifests open-svc view-serviceaccount-kubeconfig
```

### kubectl プラグインの一例

> 編集中

|プラグイン名|概要|
|:--:|:--:|
|tree|リソースの親子関係を表示|
|neat||
|sick-pods||
|podevents||
|resource-capacity||
|get-all||
|sort-manifests||
|ctx||
|ns||
|images||
|outdated||
|open-svc||
|iexec||
|tmux-exec||
|cssh||
|node-shell||
|node-restart||
|view-secret||
|modify-secret||
|konfig||
|view-<br>serviceaccount-<br>kubeconfig||
|rolesum||
|who-can||

## kubectl におけるデバッグ

### Http Request / Response レベルのデバッグ

```vim
$ kubectl -v=6 get pod
```

### Http Request Body / Response Body レベルのデバッグ

```vim
$ kubectl -v=8 get pod
```

### HTTP PATCHリクエストの内容を確認

```vim
$ kubectl -v=8 get
```

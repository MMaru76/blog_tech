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

## 1 認証情報とContext(config)

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

### 1.1 クラスタの定義を追加･変更

```vim
$ kubectl config set-cluster sample-cluster1 --server=https://localhost:6443
```

### 1.2 認証情報の定義を追加･変更

(未検証の為････不明)

```vim
$ kubectl config set-credentials admin-user \
    --client-certificate=./sample.crt \
    --client-key=./sample.key \
    --embed-certs=true
```

### 1.3 Context の定義を追加･変更<br>(クラスタ/認証情報/Namespaceを定義)

- 複数作成する場合は `sample-cluster2` などに変更すれば作成が可能

```vim
$ kubectl config set-context sample-context1 \
  --cluster=sample-cluster1 \
  --user=sample-user1 \
  --namespace=default
```

### 1.4 Contextの一覧を表示

```vim
$ kubectl config get-contexts

=>CURRENT   NAME                 CLUSTER           AUTHINFO         NAMESPACE
  *         docker-desktop       docker-desktop    docker-desktop
            sample-context1      sample-cluster1   sample-user1     default
```

### 1.5 現在のContextを表示

```vim
$ kubectl config current-context

=>docker-desktop
```

### 1.6 Contextの切り替え

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

### 1.7 コマンドの実行ごとにContextを指定

(未検証の為････不明)

```vim
$ kubectl --context sample-context1 get pod
```

## 2 マニフェストとリソースの作成/削除/更新(create/delete/apply)

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

### 2.1 リソースの作成

```vim
$ kubectl create -f sample-pod.yaml
リソースが存在しない場合 : => pod "sample-pod" created
リソースが存在する場合 : => Error from server (AlreadyExists): ~略~ already
```

### 2.2 Podの一覧を表示

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

### 2.3 リソースの削除

```vim
$ kubectl delete -f sample-pod.yaml
リソースが存在する場合 : => pod "sample-pod" deleted
リソースが存在しない場合 : => Error from server (NotFound): ~略~ not found
```

### 2.4 特定リソースのみ削除

```vim
$ kubectl delete pod sample-pod
```

### 2.5 特定のリソース種別をすべて削除

```vim
$ kubectl delete pod --all
```

### 2.6 リソースを削除 (削除完了を待機)

```vim
$ kubectl delete -f sample-pod.yaml --wait
```

### 2.7 リソースの即時強制削除

```vim
$ kubectl delete -f sample-pod.yaml --grace-period 0 --force
```

### 2.8 変更の適応

```vim
$ kubectl apply -f sample-pod.yaml
```

|項目|出力結果|
|:--:|:--:|
|変更点がある場合|pod "sample-pod" configured|
|変更点がない場合|pod "sample-pod" unchanged|
|リソースが存在しない場合|pod "sample-pod" created|

## 3 Server-side apply

### 3.1 Server-side apply を有効化してマニフェストの作成/適用

```vim
$ kubectl apply -f sample-pod.yaml --server-side
```

### 3.2 イメージの更新

```vim
$ kubectl set image pod sample-pod nginx-container=nginx:1.17
```

### 3.3 コンフリクトを無視して強制的にマニフェストを適用

```vim
$ kubectl apply -f sample-pod.yaml \
    --server-side \
    --force-conflicts
```

### 3.4 Pod の sample-pod をyamlとして出力

```vim
$ kubectl get pod sample-pod -o yaml
```

### 3.5 Manager名を変更の適用(CIツールからの実行場合)

```vim
$ kubectl apply -f sample-pod.yaml --server-side --field-manager ci-tool
```

## 4 Podの再起動 (rollout restart)

### 4.1 Deployment リソースのすべてのPodのリスタート

```vim
$ kubectl rollout restart deployment sample-deploment
```

## 5 GenrateName によるランダムな名前のリソースの作成

### 5.1 ランダムな名前作成

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

## 6 リソースの状態のチェックと待機 (wait)

### 6.1 sample-pod が正常に起動する(Ready状態になる)まで待機する

```vim
$ kubectl wait --for=condition=Ready pod/sample-pod
pod/sample-pod condition met
```

#### 6.1.1 マニフェストファイルを指定してPodが正常に起動する(Ready状態になる)

```vim
$ kubectl wait --for=condition=Ready sample-pod.yaml
```

### 6.2 すべてのPodがスケジューリングされる(PodScheduled状態になる)まで待機する

```vim
$ kubectl wait --for=condition=PodScheduled pod --all
```

### 6.3 すべてのPodが削除されるまでPod毎に最大5秒ずつ待機

```vim
$ kubectl wait --for=delete pod --all --timeout=5s
```

### 6.4 すべてのPodを削除､実行語すぐに次のkubectl wait を実行

```vim
$ kubectl delete pod --all --wait-false
```

### 6.5 すべてのPodが削除されるまで待機

```vim
$ kubectl wait --for=delete pod -all
```

## 7.複数のマニフェストファイルを同時に適用

### 7.1 ディレクトリ配下のすべてのYAMLファイルを指定リソースを作成

```vim
$ kubectl apply -f ./sample-dir
```

### 7.2 指定したディレクトリ行かのファイルを再帰的に適用

```
kubectl apply -f ./sample-dir -R
```

## 8 アノテーション

### 8.1 アノテーションの付与

```vim
$ kubectl annotate pods sample-annotations annotation3=val3
pod/sample-annotations annotated
```

### 8.2 アノテーションの付与(上書きを許可)

```vim
$ kubectl annotate pods sample-annotations annotation3=val3-new --overwrite
pod/sample-annotations annotated
```

### 8.3 アノテーションの確認

```vim
$ kubectl get pod sample-annotations -o json | jq .metadata.annotations
```

### 8.4 アノテーションの削除

```vim
$ kubectl annotate pods sample-annotations annotation3-
```

## 9 ラベル

### 9.1 ラベルの付与

```vim
$ kubectl label pods sample-label label3=val3
pod/sample-label labeled
```

### 9.2 ラベルの付与(上書きを許可)

```vim
$ kubectl label pods sample-label label3=val3-new --overwrite
pod/sample-label labeled
```

### 9.3 ラベルの確認

```vim
$ kubectl get pod sample-label -o json | jq .metadata.labels
```

### 9.4 ラベルの削除

```vim
$ kubect label pods sample-label label3-
pod/sample-label labeled
```

### 9.5 label1-val1とlabel2ラベルを持つPodを表示

```vim
$ kubectl get pods -l label1=val1,label2
```

### 9.6 PodとLabel1ラベルを表示

```vim
$ kubectl get pods -L label1
```

### 9.7 label1ラベルを持つPodとlabel2ラベルを表示

```vim
$ kubectl get pods -l label1 -L label2
```

### 9.8 すべてのラベルを表示してPodの一覧を出力

```vim
$ kubectl get pods --show-labels
```

## 10 Prune によるリソースの削除

### 10.1 初回の作成

```vim
$ kubectl apply -f ./prune-sample --prune -l system=a
pod "sample-pod1" created
pod "sample-pod2" created
```

### 10.2 ファイルを削除

```vim
$ rm prune-sample/sample-pod1.yaml
```

### 10.3 sample-pod1.yamlふが削除された状態で再度同じコマンドで更新

```vim
$ kubectl apply -f ./prune-sample --prune -l system=a
pod "sample-pod1" unchanged
pod "sample-pod2" pruned
```

## 11 リソースの一部情報の更新(set)

### 11.1 sample-pod内のnginx-containerコンテナのコンテナイメージを確認

```vim
$ kubectl describe pod sample-pod
```

### 11.2 コンテナイメージをnginx:1.17 からnginx:1.16に変更

```vim
$ kubectl set image pod sample-pod nginx-container=nginx:1.16
```

## 12 ローカルマニフェストとkubernetes上の登録情報の差分取得(diff)

### 12.1 クラスタの登録情報とマニフェストの差分を確認

```vim
$ kubectl diff -f sample-pod.yaml
```

## 13 利用可能なリソース種別の一覧取得(api-resources)

### 13.1 すべてのリソース種別を表示

```vim
$ kubectl api-resources
```

### 13.2 Namespaceレベルに属しているリソース

```vim
$ kubectl api-resources --namespace=true
```

### 13.3 Clusterレベルに属しているリソース

```vim
$ kubectl api-resources --namespace=false
```

## 14 リソースの情報取得(get)

### 14.1 Podの一覧を表示

```vim
$ kubectl get pods
```

### 14.2 特定のPodの情報だけを表示

```vim
$ kubectl get pod sample-pod
```

### 14.3 label1=val1 とlabel2ラベルを持つPodを表示

```vim
$ kubectl get pods -l label1=val1,label2 --show-labels
```

### 14.4 Podの一覧を表示(より詳しく表示)

```vim
$ kubectl get pods -o wide
```

### 14.5 YAML形式でPodの詳細情報リストを出力

```vim
$ kubectl get pods -o yaml
```

### 14.6 YAML形式で特定のPodの症状情報を出力

```vim
$ kubectl get pods -o yaml sample-pod
```

### 14.7 ノードの一覧を表示

```vim
$ kubectl get nodes
```

### 14.8 作成されているほぼすべて種類のリソースを表示

```vim
$ kubectl get all
```

### 14.9 リソースの状態変化があるものを出力

```vim
$ kubectl get nodes --watch
```

### 14.10 リソースの処理工程を表示

```vim
$ kubectl get nodes --watch --output-watch-events
```

## 15 リソースの詳細情報の取得(describe)

### 15.1 ノードの詳細情報を表示

```vim
$ kubectl describe node ノード名
```

## 16 実際のリソースの使用量を確認 (top)

### 16.1 ノードのリソース使用量を確認

```vim
$ kubectl top node
```

### 16.2 Podごとのリソース使用量を確認

```vim
$ kubectl -n kube-system top pod
```

### 16.3 Podの一覧を表示

```vim
$ kubectl -n kube-system get pods
```

### 16.4 コンテナごとのリソース使用量を確認

```vim
$ kubectl -n kube-system top pod --containers
```

## 17 コンテナ上でのコマンドの実行(exec)

### 17.1 Pod内のコンテナで/bin/lsを実行

```vim
$ kubectl exec -it sample-pod -- /bin/ls
```

### 17.2 複数コンテナが入ったPodの特定のコンテナで/bin/lsを実行

```vim
$ kubectl exec -it sample-pod -c nginx-container -- /bin/ls
```

### 17.3 Pod内のコンテナで /bin/bash を実行 (終了する際はexitを実行)

```vim
$ kubectl exec -it sample-pod -- /bin/bash
=> root@sample-pod:/#
```

### 17.4 パイプなど特殊な文字が含まれる場合は､/bin/bashに引数を渡す形で実行

```vim
$ kubectl exec -it sample-pod -- /bin/bash -c "ls -all --classify | grep lib"
```

## 18 ローカルマシンからPodへのポートフォワーディング(port-forward)

### 18.1 localhost:8888宛の通信をPod80/TCPポートに転送

- 終了する際はCtrl+cを入力

```vim
$ kubectl port-forward sample-pod 8888:80
```

- 疎通確認

```vim
$ curl -I localhost:8888
```

### 18.2 sample-deploymentに紐付くPodのうち1つにポートフォワーディング

```vim
$ kubectl port-forward deployment/sample-deployment 8888:80
```

## 19 コンテナのログ確認(logs)

### 19.1 Pod内のコンテナのログを出力

```vim
$ kubectl logs sample-pod
```

### 19.2 複数コンテナが入ったPodで特定のコンテナのログを出力

```vim
$ kubectl logs sample-pod -c nginx-container
```

### 19.3 follow しながらログを出力

```vim
$ kubectl logs -f sample-pod
```

### 19.4 最新1時間以内､10件取得､タイムスタンプを表示してログを出力

```
$ kubectl logs --since=1h --tail=10 --timestamp=true sample-pod
```

### 19.5 app=sample-app ラベルを持つすべてのPodのログを出力

```vim
$ kubectl logs --selector app=sample-app
```

## 20 コンテナとローカルマシン間でのファイルのコピー(cp)

### 20.1 sample-pod内の/etc/hostnameファイルをローカルマシンにコピー

```vim
$ kubectl cp sample-pod:etc/hostname ./hostname
```

- ローカルマシン内の hostname ファイルの確認

```vim
$ cat hostname
=> sample-pod
```

### 20.2 取得したローカルファイルをコンテナにコピー

```vim
$ kubectl cp hostname sample-pod:/tmp/newfile
```

- コンテナ内の tmp 配下を確認

```vim
$ kubectl exec -it sample-pod -- ls /tmp
=> newfile
```

## 21 kubect plugin とパッケージマネージャ(plugin/krew)

### 21.1 プラグインの一覧を表示

```vim
$ kubectl plugin list
```

### 21.2 プラグインのインストール

```vim
$ kubectl krew install tree rolesum sort-manifests open-svc view-serviceaccount-kubeconfig
```

### 21.3 kubectl プラグインの一例

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

## 22 kubectl におけるデバッグ

### 22.1 Http Request / Response レベルのデバッグ

```vim
$ kubectl -v=6 get pod
```

### 22.2 Http Request Body / Response Body レベルのデバッグ

```vim
$ kubectl -v=8 get pod
```

### 22.3 HTTP PATCHリクエストの内容を確認

```vim
$ kubectl -v=8 get 
```
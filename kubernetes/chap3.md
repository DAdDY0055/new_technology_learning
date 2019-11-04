# GKEで利用可能なKubernetesのバージョンを確認
$ gcloud container get-server-config --zone asia-northeast1-a

# GKEクラスタの作成
$ gcloud container clusters create k8s --cluster-version 1.13.11-gke.9 --zone asia-northeast1-a --num-nodes 3

# GKEクラスタに接続する認証情報を取得
$ gcloud container clusters get-credentials k8s --zone asia-northeast1-a

# 取得した認証情報参照
$ cat ~/.kube/config

# IAMユーザーにクラスタ管理権限を付与
$ kubectl create --save-config clusterrolebinding iam-cluster-admin-binding \
    --clusterrole=cluster-admin \
    --user=yky2800.rthm.55tn@gmail.com

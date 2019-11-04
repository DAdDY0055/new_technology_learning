# リソースの作成
$ kubectl create -f ./chap4/sample-pod.yaml

# Podの一覧を取得
$ kubectl get pods

# リソース削除
$ kubectl delete -f ./chap4/sample-pod.yaml

# リソースの更新
$ kubectl apply -f ./chap4/sample-pod.yaml

# 利用しているイメージを確認
$ kubectl get pods sample-pod -o jsonpath="{.spec.containers[].image}"

# リソースをまとめて作成
$ kubectl apply -f ./chap4/ -R

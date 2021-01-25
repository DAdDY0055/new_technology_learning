package main

import (
	"fmt"
	"net/http"
	"reflect"
	"runtime"
)

// hello "Hello"を返すハンドラ関数
func hello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello")
}

// log ハンドラ関数をチェインしてログを出す関数
func log(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		name := runtime.FuncForPC(reflect.ValueOf(h).Pointer()).Name()
		fmt.Println("Handler function called - " + name)
		h(w, r)
	}
}

// protect ハンドラ関数をチェインして権限を確認する関数(権限確認は省略してログを出すだけ)
func protect(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		name := runtime.FuncForPC(reflect.ValueOf(h).Pointer()).Name()
		fmt.Println("Handler function called - " + name + "checked protect")
		h(w, r)
	}
}

func main() {
	server := http.Server{
		Addr: "127.0.0.1:8080",
	}

  // `HandleFunc`で関数からハンドラに変換
	http.HandleFunc("/hello", protect(log(hello)))
	server.ListenAndServe()
}

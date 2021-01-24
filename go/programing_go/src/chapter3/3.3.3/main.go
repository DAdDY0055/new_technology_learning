package main

import (
	"fmt"
	"net/http"
)

// hello "Hello"を返すハンドラ関数
func hello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello")
}

// world "World"を返すハンドラ関数
func world(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "World")
}

func main() {
	server := http.Server{
		Addr: "127.0.0.1:8080",
	}

  // `HandleFunc`で関数からハンドラに変換
	http.HandleFunc("/hello", hello)
	http.HandleFunc("/world", world)
	server.ListenAndServe()
}

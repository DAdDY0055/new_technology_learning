package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// Post 投稿の型
type Post struct {
	User    string
	Threads []string
}

func writerExample(w http.ResponseWriter, r *http.Request) {
	str := `<html><head><title>Go Web Programing</title></head><body><h1>Hello World</h1></body></hmtl>`
	w.Write([]byte(str))
}

func writerHeaderExample(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(501)
	fmt.Fprintln(w, "そのようなサービスはありません。他を利用してください。")
}

func handerExample(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Location", "http://google.com")
	w.WriteHeader(302)
}

func jsonExample(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	post := &Post{
		User: "Taku",
		Threads: []string{"1ばんめ", "2ばんめ", "3ばんめ"},
	}
	json, _ := json.Marshal(post)
	w.Write(json)
}

func main() {
	server := http.Server{
		Addr: "127.0.0.1:8080",
	}
	http.HandleFunc("/write", writerExample)
	http.HandleFunc("/writeheader", writerHeaderExample)
	http.HandleFunc("/redirect", handerExample)
	http.HandleFunc("/json", jsonExample)
	server.ListenAndServe()
}
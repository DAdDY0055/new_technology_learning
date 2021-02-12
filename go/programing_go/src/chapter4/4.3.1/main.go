package main

import (
	"fmt"
	"net/http"
)

func writerExample(w http.ResponseWriter, r *http.Request) {
	str := `<html><head><title>Go Web Programing</title></head><body><h1>Hello World</h1></body></hmtl>`
	w.Write([]byte(str))
}

func writerHeaderExample(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(501)
	fmt.Fprintln(w, "そのようなサービスはありません。他を利用してください。")
}

func main() {
	server := http.Server{
		Addr: "127.0.0.1:8080",
	}
	http.HandleFunc("/write", writerExample)
	http.HandleFunc("/writeheader", writerHeaderExample)
	server.ListenAndServe()
}
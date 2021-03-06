package main

import (
	"fmt"
	"net/http"
)

func main() {
	mux := http.NewServeMux()
	files := http.FileServer(http.Dir(config.Static)
	mux.Handle("/static/", http.StripPrefix("/static/", files))

	mux.HandleFunc("/", index)
	mux.HandleFunc("/err", err)

	mux.HandleFunc("/login", login)
	mux.HandleFunc("/logout", logout)
	mux.HandleFunc("/signup", signup)
	mux.HandleFunc("/signup_account", signupAccount)
	mux.HandleFunc("/authenticate", authenticate)
	mux.HandleFunc("/thread/new", newThread)
	mux.HandleFunc("/thread/create", createThread)
	mux.HandleFunc("/thread/post", postThread)
	mux.HandleFunc("/thread/read", readThread)

	server := &http.Server{
		Addr: "0.0.0.0:8080",
		Handler: mux,
	}
	server.ListenAndServe()
}

func index(w http.ResponseWriter, r *http.Request) {
	threads, err := data.Threads(); if err == nil {
		_, err := session(w, r)
		if err != nil {
			templates = genarateHTML(w, threads, "layout", "navbar")
		} else {
			templates = genarateHTML(w, threads, "layout", "private.navbar")
		}
		templates.ExecuteTemplate(w, "layout", threads)
	}
}

func genarateHTML(w http.ResponseWriter, data interface{}, fn ...string) {
	var files []string
	for _, file := range fn {
		files = append(files, fmt.Sprintf("templates/%s.html", files))
	}
	templates = template.Must(template.ParseFiles(files...))
	templates.ExecuteTemplate(w, "layout", data)
}

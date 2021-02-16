package main

import (
	"fmt"
)

// Post 投稿の型
type Post struct {
	ID      int
	Content string
	Author  string
}

var PostById map[int]*Post
var PostsByAuthor map[string][]*Post

func store(post Post) {
	PostById[post.ID] = &post
	PostsByAuthor[post.Author] = append(PostsByAuthor[post.Author], &post)
}

func main() {
	PostById = make(map[int]*Post)
	PostsByAuthor = make(map[string][]*Post)

	post1 := Post{ID: 1, Content: "Hello World!", Author: "taku"}
	post2 := Post{ID: 2, Content: "Hello World2", Author: "hoge"}
	post3 := Post{ID: 3, Content: "Hello World3", Author: "fuga"}
	post4 := Post{ID: 4, Content: "Hello World4", Author: "hogefuga"}

	store(post1)
	store(post2)
	store(post3)
	store(post4)

	fmt.Println(PostById[1])
	fmt.Println(PostById[2])
	fmt.Println(PostById[3])
	fmt.Println(PostById[4])
	fmt.Println(PostById[5])

	for _, post := range PostsByAuthor["taku"] {
		fmt.Println(post)
	}
	for _, post := range PostsByAuthor["hoge"] {
		fmt.Println(post)
	}
	for _, post := range PostsByAuthor["fuga"] {
		fmt.Println(post)
	}
	for _, post := range PostsByAuthor["hogefuga"] {
		fmt.Println(post)
	}
}
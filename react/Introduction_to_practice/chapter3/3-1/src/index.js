// DOMの作成・追加(学習用)
// console.log("test");

// const tilele1 = document.getElementById("title");
// console.log("title1", tilele1);

// const title2 = document.querySelector("#title");
// console.log("title2", title2)

// const containeres = document.getElementsByClassName("container");
// console.log("containeres", containeres)

// const containere = document.querySelector(".container");
// console.log("containere", containere)

// const containeres2 = document.querySelectorAll(".container");
// console.log("containeres2", containeres2)

// const divEl = document.createElement("div")
// console.log("divEl", divEl)

// const pEl = document.createElement("p")
// divEl.appendChild(pEl)
// console.log("divEl", divEl)

// const h2El = document.createElement("h2")
// divEl.prepend(h2El)
// console.log("divEl", divEl)

// ボタンの設定
const buttonEl = document.createElement("button")
buttonEl.textContent = "ボタン"

const divEl = document.querySelector(".container")
divEl.appendChild(buttonEl)

// DOMの削除
const h1El = document.getElementById("title")
const bodyEl = document.querySelector("body")
bodyEl.removeChild(h1El)

// body配下を全削除
// bodyEl.textContent = null
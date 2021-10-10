import ReactDOM from "react-dom"
// import { Fragment } from "react"

const App = () => {
  return (
    // 空タグで囲むとFragmentと同じ
    <>
      <h1>こんにちは！</h1>
      <p>お元気ですか？</p>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))

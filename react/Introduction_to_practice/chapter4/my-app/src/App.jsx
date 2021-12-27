export const App = () => {
  // ボタンを押した際にアラートを実行する関数
  const onClickButton = () => {
    alert("alert!");
  }

  // CSSオブジェクト
  const contentStyle = {
    color: "blue",
    fontSize: "200px"
  };

  return (
    // 空タグで囲むとFragmentと同じ
    <>
      {console.log("JSX内へのJavaScriptの記載")}
      <h1 style={{ color: "red" }}>こんにちは！</h1>
      <p style={contentStyle}>お元気ですか？</p>
      <button onClick={onClickButton}>ボタン</button>
    </>
  )
}

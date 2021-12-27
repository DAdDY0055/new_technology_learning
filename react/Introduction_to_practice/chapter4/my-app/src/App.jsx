export const App = () => {
  const onClickButton = () => {
    alert("alert!");
  }

  return (
    // 空タグで囲むとFragmentと同じ
    <>
      <h1>こんにちは！</h1>
      <p>お元気ですか？</p>
      <button onClick={onClickButton}>ボタン</button>
    </>
  )
}

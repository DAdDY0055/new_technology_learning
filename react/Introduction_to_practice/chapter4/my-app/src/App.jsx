import { useState } from "react";
import { ColoredMessage } from "./components/ColoredMessage";
// import { CssModules } from "./components/CssModules";
import { StyledJsx } from "./components/StyledJsx";
import { StyledComponents } from "./components/StyledComponents";
import { Emotion } from "./components/Emotion";
import { TailwindCss } from "./components/TailwindCss.jsx"
// const setNum();

export const App = () => {
  const [num, setNum] = useState(0);

  // ボタンを押した際にStateをカウントアップ
  const onClickButton = () => {
    // alert("alert!");
    setNum((prev) => prev + 1);
  }

  // CSSオブジェクト
  // const contentStyle = {
  //   color: "blue",
  //   fontSize: "200px"
  // };

  // ピンク用スタイル
  // const contentPinkStyle = {
  //   color: "pink",
  //   fontSize: "20px"
  // };

  return (
    // 空タグで囲むとFragmentと同じ
    <>
      {console.log("JSX内へのJavaScriptの記載")}
      <h1 style={{ color: "red" }}>こんにちは！</h1>
      {/* <ColoredMessage color="bule" message="元気？"/> */}
      <ColoredMessage color="blue">元気ですか？</ColoredMessage>
      {/* <p style={contentPinkStyle}>元気です！</p> */}
      {/* <ColoredMessage color="pink" message="元気です！"/> */}
      <ColoredMessage color="pink">元気です！</ColoredMessage>
      <button onClick={onClickButton}>ボタン</button>
      <p>{num}</p>
      {/* <CssModules/> */}
      <StyledJsx />
      <StyledComponents />
      <Emotion />
      <TailwindCss />
    </>
  )
}

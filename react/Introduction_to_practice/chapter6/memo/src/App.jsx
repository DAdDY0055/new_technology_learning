import { useCallback, useState, memo } from "react"
import { Child1 } from "./components/Child1";
import { Child4 } from "./components/Child4";

export const App = memo(() => {
  console.log("Appレンダリング");

  const [num, setNum] = useState(0);

  const onClickButton = () => {
    setNum(num + 1);
  };

  const onClickReset = useCallback(() => {
    setNum(0);
  }, []);

  return (
    <>
      <button onClick={onClickButton}>ボタンです</button>
      <p>{num}</p>
      {/* <Child1 /> */}
      <Child1 onClickReset={onClickReset}/>
      <Child4 />
    </>
  );
});

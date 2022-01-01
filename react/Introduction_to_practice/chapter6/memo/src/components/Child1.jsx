import { memo } from "react"
import { Child2 } from "./Child2";
import { Child3 } from "./Child3";

const style = {
  height: "200px",
  backgroundColor: "lightbule",
  padding: "8px"
};

export const Child1 = memo((prpps) => {
  console.log("Child1レンダリング");

  const { onClickReset } = prpps;

  return (
    <div style={style}>
      <p>Child1</p>
      <button onClick={onClickReset}>リセット</button>
      <Child2 />
      <Child3 />
    </div>
  );
});

// export const ColoredMessage = (props) => {
export const ColoredMessage = ({ color, children }) => { // 引数の段階で展開
  // console.log("props", props)
  // const { color, children } = props; // 分割代入

  const contentStyle = {
    // color: props.color,
    // color: color,
    color, // 省略記法
    fontSize: "200px"
  };

  // return <p style={contentStyle}>{props.children}</p>;
  return <p style={contentStyle}>{children}</p>;
}
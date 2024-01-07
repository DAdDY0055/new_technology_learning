import { useEffect, useState } from "react";
import "./HookTimer.css";

export default function HookTimer({ init }) {
    const [count, setCount] = useState(init);

    useEffect(() => {
        const t = setInterval(() => {
            setCount((c) => c - 1);
        }, 1000);
        // コンポーネント破棄時に return() が実行される
        return () => {
            // setInterval() で呼び出されたタイマーを破棄
            // https://developer.mozilla.org/docs/Web/API/clearInterval
            clearInterval(t);
        };
    });

    return (
        <div className={count < 0 ? "warn" : ""}>現在のカウント：{count}</div>
    );
}

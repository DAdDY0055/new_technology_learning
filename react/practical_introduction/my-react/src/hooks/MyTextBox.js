// 関数コンポーネントはインスタンスを持たないので参照できない
// export default function MyTextBox({ label, ref }) {
//     return (
//         <label>
//             {label}：
//             <input type="text" size="15" ref={ref} />
//         </label>
//     );
// }

import { forwardRef } from "react";

const MyTextBox = forwardRef(({ label }, ref) => (
    <label>
        {label}：
        <input type="text" size="15" ref={ref} />
    </label>
));

export default MyTextBox;

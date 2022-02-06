import { ChangeEvent, useCallback, useState, FC } from "react";
import styled from "styled-components";
import { MemoList } from "./MemoList";

export const App: FC = () => {
  const [text, setText] = useState<string>("");
  const [memos, setMemos] = useState<string[]>([]);

  const onChangeTest = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);
  const onClickAddButton = () => {
    const newMemos = [...memos];
    newMemos.push(text);
    setMemos(newMemos);
    setText("");
  };

  const onClickDeleteButton = useCallback((index: number) => {
    const newMemos = [...memos];
    newMemos.splice(index, 1);
    setMemos(newMemos);
  }, [memos]);

  // const onClickDeleteButton = (index: number) => {
  //   const newMemos = [...memos];
  //   newMemos.splice(index, 1);
  //   setMemos(newMemos);
  // };

  return (
    <>
      <h1>簡単メモアプリ</h1>
      <input type="text" value={text} onChange={onChangeTest}></input>
      <SButton onClick={onClickAddButton}>追加</SButton>

      <MemoList memos={memos} onClickDeleteButton={onClickDeleteButton}></MemoList>
      {/* <SContainer>
        <p>メモ一覧</p>
        {memos.map((memo, index) => (
          <SMemoWrapper>
            <li key={memo}>{memo}</li>
            <SButton onClick={() => onClickDeleteButton(index)}>削除</SButton>
          </SMemoWrapper>
        ))}
      </SContainer> */}
    </>
  );
};

const SButton = styled.button`
  margin-left: 16px;
`;
// const SContainer = styled.div`
//   border: solid 1px #ccc;
//   padding: 16px;
//   margin: 8px;
// `;
// const SMemoWrapper = styled.div`
//   display: flex;
//   align-items: center;
// `;

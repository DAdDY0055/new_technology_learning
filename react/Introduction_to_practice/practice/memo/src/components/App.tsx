import { ChangeEvent, useState, useCallback, FC } from "react";
import styled from "styled-components";
import { MemoList } from "./MemoList";
import { useMemos } from "../hooks/useMemoList"

export const App: FC = () => {
  const [text, setText] = useState<string>("");
  const { memos, addMemo, deleteMemo } = useMemos()

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);
  const onClickAddButton = () => {
    addMemo(text);
    setText("");
  };

  const onClickDeleteButton = useCallback((index: number) => {
    deleteMemo(index);
  }, [deleteMemo]);

  return (
    <div>
      <h1>簡単メモアプリ</h1>
      <input type="text" value={text} onChange={onChangeText} />
      <SButton onClick={onClickAddButton}>追加</SButton>

      <MemoList memos={memos} onClickDeleteButton={onClickDeleteButton} />
    </div>
  );
};

const SButton = styled.button`
  margin-left: 16px;
`;

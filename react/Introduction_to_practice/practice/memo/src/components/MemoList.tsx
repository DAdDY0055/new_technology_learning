import { FC } from "react";
import styled from "styled-components";

type Props = {
  memos: string[];
  onClickDeleteButton: (index: number) => void;
};

export const MemoList: FC<Props> = props => {
  const { memos, onClickDeleteButton } = props;

  return (
    <>
      <SContainer>
        <p>メモ一覧</p>
        {memos.map((memo, index) => (
          <SMemoWrapper>
            <li key={memo}>{memo}</li>
            <SButton onClick={() => onClickDeleteButton(index)}>削除</SButton>
          </SMemoWrapper>
        ))}
      </SContainer>
    </>
  )
}

const SButton = styled.button`
  margin-left: 16px;
`;
const SContainer = styled.div`
  border: solid 1px #ccc;
  padding: 16px;
  margin: 8px;
`;
const SMemoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

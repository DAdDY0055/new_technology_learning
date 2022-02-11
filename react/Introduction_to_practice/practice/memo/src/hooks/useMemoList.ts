import { useState, useCallback } from "react";

export const useMemos = () => {
  // メモ一覧データ
  const [memos, setMemos] = useState<string[]>([]);

  // メモ追加ロジック
  const addMemo = (text: string) => {
    const newMemos = [...memos];
    newMemos.push(text);
    setMemos(newMemos);
  };

  // メモ削除ロジック
  const deleteMemo = useCallback((index: number) => {
    const newMemos = [...memos];
    newMemos.splice(index, 1);
    setMemos(newMemos);
  }, [memos]);

  return { memos, addMemo, deleteMemo }
}

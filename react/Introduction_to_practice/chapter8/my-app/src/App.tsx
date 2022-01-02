import { useEffect, useState } from 'react';
// import { useState } from 'react';
import { ListItem } from './components/ListItem';
import axios from "axios";

// sample APIがないので直定義
const data = [
  {
    "id": 1,
    "name": "主田",
    "age": 24,
    "personalColor": "blue"
  },
  {
    "id": 2,
    "name": "先岡",
    "age": 28,
    "personalColor": "pink"
  },
  {
    "id": 3,
    "name": "後藤",
    "age": 23,
    "personalColor": "green"
  },
]

export const App = () => {
  const [users, setUsers] = useState(data);
  console.log("users", users)

  // 画面表示時にユーザー情報を取得
  useEffect(() => {
    axios.get("https://example.com/users").then((res: any) => {
      setUsers(res.data);
    })
  }, []);

  return (
    <div>
      {users.map(user => (
        <ListItem id={user.id} name={user.nama} age={user.age} />
      ))}
    </div>
  );
};

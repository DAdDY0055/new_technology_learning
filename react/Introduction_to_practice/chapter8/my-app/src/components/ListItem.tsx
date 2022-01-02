import type { FC } from 'react';
import type { User } from '../types/user';

// type User = {
//   id: number;
//   name: string;
//   age: number;
//   personalColor: string;
// };

// export const ListItem = (props: User) => {
export const ListItem: FC<User> = props => {
  const { id, name, age, personalColor, hobbies } = props;
  return (
    <p style={{ color: personalColor }}>
      {/* 省略される可能性があるプロパティにオプショナルチェイン(`?`)をつける */}
      {id}:{name}({age}) {hobbies?.join(" / ")}
    </p>
  );
};

ListItem.defaultProps = {
  personalColor: "gray"
};

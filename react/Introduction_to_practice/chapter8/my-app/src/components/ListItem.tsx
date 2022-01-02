type User = {
  id: number;
  name: string;
  age: number;
  personalColor: string;
};

export const ListItem = (props: User) => {
  const { id, name, age, personalColor } = props;
  return (
    <p style={{ color: personalColor }}>
      {id}:{name}({age})
    </p>
  );
};

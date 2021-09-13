const allCategoryId  = '1'
const pcCategoryId   = '2502'
const bookCategoryId = '10002'

const initialState = {
  categories: [
    {
      id: allCategoryId,
      name: 'すべてのカテゴリ'
    },
    {
      id: pcCategoryId,
      name: 'パソコン、周辺機器'
    },
    {
      id: bookCategoryId,
      name: '本、雑誌、コミック'
    },
  ]
}

export default () => initialState;

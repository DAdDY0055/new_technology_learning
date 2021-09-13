import React from "react";
import PropTypes from "prop-types"

const overallRanking = "1"

export default function Ranking({ categoryId }) {
  // TODO: categoryIdを元にAPIから情報を取得する
  return (
    <div>
      <h2>Rankingコンポーネント</h2>
      <p>カテゴリーID: {categoryId}</p>
    </div>
  )
}
// TODO: Ranking.propTypesとRanking.defaultPropsはここで定義している感じ？
Ranking.propTypes = {
  categoryId: PropTypes.string
};
Ranking.defaultProps = {
  categoryId: overallRanking
}
import React from "react";
import PropTypes from "prop-types"

const overallRanking = "1"

export default class Ranking extends React.Component {
  componentWillUnmount() {
    this.props.onMount(this.props.categoryId)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.categoryId !== nextProps.categoryId) {
      this.props.onUpdate(nextProps.categoryId)
    }
  }
  // TODO: categoryIdを元にAPIから情報を取得する
  render() {
    return(
      <div>
        <h2>Rankingコンポーネント</h2>
        <p>カテゴリーID: {this.props.categoryId}</p>
      </div>
    )
  }
}
// TODO: Ranking.propTypesとRanking.defaultPropsはここで定義している感じ？
Ranking.propTypes = {
  categoryId: PropTypes.string,
  onMount: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
Ranking.defaultProps = {
  categoryId: overallRanking
}
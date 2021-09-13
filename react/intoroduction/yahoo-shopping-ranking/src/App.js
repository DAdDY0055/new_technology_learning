import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import Ranking from "./containers/Ranking";

const pcCategoryId = 2502
const bookCategoryId = 10002

class App extends Component {
  render() {
    return (
      <div className="App">
        <ul>
          <li><Link to="/all">全てのカテゴリ</Link></li>
          <li><Link to={"/category/"+pcCategoryId}>パソコン、周辺機器</Link></li>
          <li><Link to={"/category/"+bookCategoryId}>本、雑誌、コミック</Link></li>
        </ul>
        <Route path="/all" component={Ranking} />
        <Route
          path="/category/:id"
          render={
            ({ match }) => <Ranking categoryId={match.params.id} />
          }
        />
      </div>
    )
  }
}

export default App;

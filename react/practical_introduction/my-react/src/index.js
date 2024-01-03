import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
// import ListTemplate from './Children/ListTemplate';
// import books from './contains/books';
// import EventPoint from './Event/EventPoint';
import StateNestImmer from "./Form/StateNestImmer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // レンダープロップ
    // <ListTemplate src={books} render={ elem => (
    //   <>
    //      <dt>
    //        <a href={`https://wings.msn.to/books/${elem.isbn}/${elem.isbn}.jpg`}>
    //          {elem.title} ({elem.price}円)
    //        </a>
    //      </dt>
    //   </>
    // )}/>

    // <EventPoint />
    <StateNestImmer />,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

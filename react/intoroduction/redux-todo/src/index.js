import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { render } from 'react-dom';
const initialState = {
  task: '',
  tasks: []
};

// ActionCreator(Actionを生成するための関数)
const addTask = (task) => ({
  type: 'ADD_TASK',
  payload: {
    task
  }
});

const inputTask = (task) => ({
  type: 'INPUT_TASK',
  payload: {
    task
  }
});

function tasksReduser(state = initialState, action) {
  switch (action.type) {
    case 'INPUT_TASK':
      return {
        ...state,
        task: action.payload.task
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: state.tasks.concat([action.payload.task]) // action.taskだと値が取れない
      };
    default:
      return state;
  }
}

function resetReducedr(state = initialState, action) {
  switch (action.type) {
    case 'RESET_TASK':
      return {
        ...state,
        tasks: []
      };
    default:
      return state;
  }
}

// storeを生成
const store = createStore(tasksReduser);

// function handleChange() {
//   console.log("handleChange() store.getState()", store.getState());
// }

// // const unsubscribe = store.subscribe(handleChange)
// // unsubscribe()

// store.dispatch(addTask('Storeを学ぶ'));
// console.log("store.getState()", store.getState());

// store.replaceReducer(resetReducedr);
// console.log("store.getState()", store.getState());

const resetTask = () => ({
  type: 'RESET_TASK'
});

store.dispatch(resetTask());
console.log("After resetTask() store.getState()", store.getState());

function TodoApp({ store }) {
  const { task, tasks } = store.getState();
  return (
    <div>
      <input type="text" onChange={(e) => store.dispatch(inputTask(e.target.value))} />
      <input type="button" value="add" onClick={() => store.dispatch(addTask(task))} />
      <ul>
        {
          tasks.map(function(item, i) {
            return (
              <li key={i}>{item}</li>
            );
          })
        }
      </ul>
    </div>
  );
}

function renderApp(store) {
  render(
    <TodoApp store={store} />,
    document.getElementById('root')
  );
}

store.subscribe(() => renderApp(store));
renderApp(store);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

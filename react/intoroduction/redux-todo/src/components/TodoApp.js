import React from "react";

export default function TodoApp({ task, tasks, inputTask, addTask }) {
  console.log("task", task)
  console.log("tasks", tasks)
  console.log("inputTask", inputTask)
  console.log("addTask", addTask)
  return (
    <div>
      <input type="text" onChange={(e) => inputTask(e.target.value)} />
      <input type="button" value="add" onClick={() => addTask(task)} />
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

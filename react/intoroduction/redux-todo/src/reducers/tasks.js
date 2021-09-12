const initialState = {
  task: '',
  tasks: []
};

export default function tasksReduser(state = initialState, action) {
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

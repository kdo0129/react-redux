//action type
const ADD_TODO = 'todos/ADD_TODO';
const TOGGLE_TODO = 'todos/TOGGLE_TODO';

let nextId = 1;

//action creator function
export const addTodo = (text) => ({
	type: ADD_TODO,
	todo: {
		id: nextId++,
		text,
	},
});

export const toggleTodo = (id) => ({
	type: TOGGLE_TODO,
	id,
});

//initial state
const initialState = [
	/*
  {
    id:1++,
    text:'string',
    done:boolean
  }
  */
];

//reducer function
export default function todos(state = initialState, action) {
	switch (action.type) {
		case ADD_TODO:
			return state.concat(action.todo);
		case TOGGLE_TODO:
			return state.map((todo) =>
				todo.id === action.id ? { ...todo, done: !todo.done } : todo,
			);
		default:
			return state;
	}
}

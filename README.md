# Redux

## Redux에서 사용되는 키워드

### 액션 (action)

상태의 어떤 변화가 필요할 때 액션을 발생시킨다. 하나의 객체로 표현되고 다음과 같은 형식으로 구성되어있다.

```js
{
	type: 'TOGGLE_VALUE';
}
```

액션 객체는 type을 필수적으로 가져야한다. 그 외의 값은 자율적으로 넣어 줄 수 있다.

```js
{
  type: "ADD_TODO",
  data: {
    id: 0,
    text: "리덕스 공부하기"
  }
}

{
  type: "CHANGE_INPUT",
  text: "반갑습니다."
}
```

### 액션 생성함수 (Action Creator)

액션을 만드는 함수이다. 파라미터를 받아와서 액션 객체로 만들어준다.

```js
export function addTodo(data) {
	return {
		type: 'ADD_TODO',
		data,
	};
}

// arrow function
export const changeInput = (text) => ({
	type: 'CHANGE_INPUT',
	text,
});
```

액션 생성함수를 만들어서 사용하는 이유는 나중에 컴포넌트에서 액션을 더 쉽게 발생시키기 위함이다. 따라서 export키워드를 사용해 다른 파일에서 불러와 사용하게 만들어준다. 액션 생성함수로 액션 객체를 만드는건 필수적인 작업은 아니다. 바로 액션 객체를 만들어도 상관은 없다.

### 리듀서 (Reducer)

변화를 일으키는 함수이다. state, action 두가지 파라미터를 받아온다.

```js
const reducer = (state, action) => {
	// 상태 업데이트 로직
	return alteredState;
};
```

리듀서는, 현재의 상태와, 전달 받은 액션을 참고하여 새로운 상태를 만들어서 반환합니다.

카운터 예제를 보면

```js
const counter = (state, action) => {
	switch (action.type) {
		case 'INCREASE':
			return state + 1;
		case 'DECREASE':
			return state - 1;
		default:
			return state;
	}
};
```

> useReducer를 사용할 때는 default에서 에러를 발생시켰지만 리덕스에서는 기존 state를 반환한다.리덕스를 사용 할 때에는 여러개의 리듀서를 만들고 이를 합쳐서 루트 리듀서 (Root Reducer)를 만들 수 있다.

### 스토어 (store)

리덕스에서는 한 애플리케이션당 하나의 스토어를 만든다. 스토어 안에는, 현재의 앱 상태와, 리듀서가 들어가있고, 추가적으로 몇가지 내장 함수들이 있다.

### 디스패치 (dispatch)

스토어의 내장 함수이며 디스패치는 액션을 발생시키는 것 또는 실행시킨다고 생각하면된다. dispatch 함수에서는 액션을 파라미터로 전달한다. 호출을 하면, 스토어는 리듀서 함수를 실행시켜서 해당 액션을 처리하는 로직이 있다면 액션을 참고하여 새로운 상태를 만들어준다.

### 구독 (subscribe)

스토어의 내장 함수이며 함수 형태의 값을 파라미터로 받아온다.
특정 함수를 전달해주면 액션이 디스패치 될 때 전달해준 특정 함수가 호출이 된다.

## 리덕스 사용 규칙

> 1.  하나의 애플리케이션엔 하나의 스토어가 있어야한다. 물론 하나 이상의 스토어를 만들 수 있지만 권장하지 않는다.
>
> 2.  상태는 읽기 전용이다. 즉, 불변성을 지켜주어야한다.
>
> 3.  변화를 일으키는 함수 리듀서는 순수한 함수여야 한다.
>     > 리듀서 함수는 이전 상태와 액션 객체를 파라미터로 받는다.
>     > 이전의 상태는 절대로 변경하지 않고, 변화를 일으킨 새로운 상태 객체를 만들어서 반환한다. 똑같은 파라미터로 호출되 리듀서 함수는 항상 똑같은 결과값을 반환해야한다. 예를 들어 new Date(), Math.random(), axios.get() 사용을 하면 안된다. 또한 리듀서 밖의 어떠한 변수으 ㅣ값에도 의존하면 안된다. 단, 상수는 허용된다.

## 리덕스 사용 준비

#### 설치

```node
yarn add redux
```

#### 기본적인 리덕스 구현의 예

```js
import { createStore } from 'redux'; // 스토어를 만들어주는 createStore 불러오기

// 리덕스에서 관리 할 초기 상태 정의
const initialState = {
	counter: 0,
	text: '',
	list: [],
};

//액션 타입 정의
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const CHANGE_TEXT = 'CHAGNE_TEXT';
const ADD_TO_LIST = 'ADD_TO_LIST';

//액션 생성함수 정의
const increase = () => ({ type: INCREASE });
const decrease = () => ({ type: DECREASE });
const changeText = (text) => ({ type: CHANGE_TEXT, text });
const addToList = (item) => ({ type: ADD_TO_LIST, item });

//리듀서 정의
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case INCREASE:
			return {
				...state,
				counter: state.counter + 1,
			};
		case DECREASE:
			return {
				...state,
				counter: state.counter - 1,
			};
		case CHANGE_TEXT:
			return {
				...state,
				text: action.text,
			};
		case ADD_TO_LIST:
			return {
				...state,
				list: state.list.concat(action.item),
			};
		default:
			return state;
	}
};

//스토어 생성 (createStore의 인수는 reducer 함수)
const store = createStore(reducer);

//구독에 들어가는 리스너 함수
const listener = () => {
	const state = store.getState();
	console.log(state);
};

//구독 설정
const unsubscribe = store.subscribe(listener);
```

## 리덕스 모듈 만들기

> 리덕스 모듈이란 액션타입, 액션 생성함수, 리듀서가 모두 들어있는 자바스크립트 파일을 의미한다. 3가지 항목을 다른 파일에 저장 할 수도 있다. 리덕스 깃헙 레포에 있는 예제 프로젝트에는 action과 reducer 디렉터리를 따로 만들어서 분리하여 관리한다. 이렇게 디렉터리를 나눠서 관리하는 방법이 있는것 반면에 Ducks 패턴이라고 하는 리듀서와 액션을 하나의 파일에 몰아서 작성하는 방법도 있다.

### counter 모듈 만들기

src 디렉터리에 modules 디렉터리를 만들고 counter.js를 생성한다.

#### modules/counter.js

```js
// 액션 타입 생성(Ducks 패턴에서는 액션의 이름에 모듈 이름을 접두사로 넣어준다. 다른 모듈의 액션 이름이 중복되는 것을 방지)
const SET_DIFF = 'counter/SET_DIFF';
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

//액션 생성 함수 정의 (액션 생성함수를 만들고 export로 내보내기)
export const setDiff = (diff) => ({ type: SET_DIFF, diff });
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

//초기 상태 선언
const initialState = {
	number: 0,
	diff: 1,
};

//리듀서 선언 (리듀서는 export default로 내보내기,state 파라미터 초기값 설정해주기)
export default function counter(state = initialState, action) {
	switch (action.type) {
		case SET_DIFF:
			return {
				...state,
				diff: action.diff,
			};
		case INCREASE:
			return {
				...state,
				number: state.number + state.diff,
			};
		case DECREASE:
			return {
				...state,
				number: state.number - state.diff,
			};
		default:
			return state; //default는 항상 state를 반환해주기
	}
}
```

### todos 모듈 만들기

#### #### modules/todos.js

```js
const ADD_TODO = 'todos/ADD_TODO';
const TOGGLE_TODO = 'todos/TOGGLE_TODO';

let nextId = 1;

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

const initialState = [];

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
```

### 루트 리듀서 만들기

여러개의 리듀서 파일을 하나로 합쳐서 사용할 때 합쳐진 리듀서를 루트 리듀서라고 한다.

#### modules/index.js

```js
import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

const rootReducer = combineReducers({
	counter,
	todos,
});

export default rootReducer;
```

### 스토어 만들기

#### index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import rootReducer from './modules';

const store = createStore(rootReducer);
//...
```

### 프로젝트에 리덕스 적용

리덕스를 리액트 프로젝트에 적용 할 때는 react-redux 라이브러리가 필요하다.

```node
$ yarn add react-redux
```

Provider라는 컴포넌트를 불러와서 App 컴포넌트를 감싸고 Provider의 props에 스토어를 넣어준다.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';

const store = createStore(rootReducer);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'),
);

serviceWorker.unregister();
```

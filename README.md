# Redux

##Redux에서 사용되는 키워드

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
    data
  };
}

// arrow function
export const changeInput = text => ({
  type: 'CHANGE_INPUT',
  text
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

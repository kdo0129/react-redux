const SET_DIFF = 'counter/SET_DIFF'; // 다른 모듈과 이름이 중복되지 않게 모듈 이름을 (여기서는 counter)접두사를 붙여서 사용한다.
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

export const setDiff = (diff) => ({ type: SET_DIFF, diff });
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

const initialState = {
	number: 0,
	diff: 1,
};

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
			return state;
	}
}

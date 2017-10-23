import { LOGIN } from '../actions';

const initialState = {
  login: {
    loading: null,
    message: "",
  },
}

export default function loginResponse(state = initialState.login, action) {
  console.log("loginResponse");
  console.log(state);
  console.log(action);
  switch (action.type) {
    case LOGIN.LOADING:
      return { loading: true };
    case LOGIN.SUCCESS:
      return { message: action.response.message, loading: false };
    case LOGIN.ERROR:
      return { message: "", loading: false };
    default:
    return state;
  }
}

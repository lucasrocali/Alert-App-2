import { LOGIN, SIGNUP, GET_EVENTS, GET_CATEGORIES, GET_TAGS, CREATE_EVENT  } from '../actions';

const initialState = {
  user: {
    auth_token: ""
  },
  loading: false,
  message: "",
  success: false,

  events: [],
  categories: [],
  categories: [],
  tags: [],
}

export default function reducers(state = initialState, action) {
  console.log("reducers");
  console.log(state);
  console.log(action);
  console.log("REDUCER_TYPE")
  switch (action.type) {
    case LOGIN.LOADING:
    case SIGNUP.LOADING:
    case GET_EVENTS.LOADING:
    case GET_CATEGORIES.LOADING:
    case GET_TAGS.LOADING:
    case CREATE_EVENT.LOADING:
        console.log("REDUCER_LOADING")
        return { ...state,
                    success: false,
                    loading: true,
                    message: "",
                };
    case LOGIN.ERROR:
    case SIGNUP.ERROR:
    case GET_EVENTS.ERROR:
    case GET_CATEGORIES.ERROR:
    case GET_TAGS.ERROR:
    case CREATE_EVENT.ERROR:
         console.log("REDUCER_ERROR")
      return { ...state,
                  success: false,
                  loading: false,
                  message: "Error",
        };
    case LOGIN.SUCCESS:
    case SIGNUP.SUCCESS:
      var auth_token = action.response.auth_token
      var success = auth_token != null ? true : false;
      return { ...state,

                  user: {
                    auth_token: auth_token,
                  },
                  loading: false,
                  message: action.response.message,
                  success: success,
        };
    case GET_EVENTS.SUCCESS:
      var message = action.response.message != null ? action.response.message : null
      var events = message == null && action.response ? action.response : null
      return { ...state,
                  loading: false,
                  message: message,
                  events: events
        };
    case GET_CATEGORIES.SUCCESS:
      var message = action.response.message != null ? action.response.message : null
      var categories = message == null && action.response ? action.response : null
      return { ...state,
                  loading: false,
                  message: message,
                  categories: categories
        };
    case GET_TAGS.SUCCESS:
      var message = action.response.message != null ? action.response.message : null
      var tags = message == null && action.response ? action.response : null
      return { ...state,
                  loading: false,
                  message: message,
                  tags: tags
        };
    case CREATE_EVENT.SUCCESS:
      var message = action.response.message != null ? action.response.message : null
      var success = message == null ? true : false;
      return { ...state,
                  loading: false,
                  message: message,
                  success: success,
        };
    default:
    return state;
  }
}
import { LOGIN, SIGNUP, LOADING, SUCCESS, ERROR} from './actionTypes';

const initialState = {
  user: {
    auth_token: ""
  },
  loading: false,
  message: "",
  login: {
    success: false
  },
  signup: {
    success: false
  },
  events: {
    events: []
  },
  categories: {
    categories: []
  },
  tags: {
    tags: []
  },
  new_event: {
    success: false
  },
}

export default function reducers(state = initialState, action) {
  console.log("reducers");
  console.log(state);
  console.log(action);
  switch (action.type) {
    case LOADING:
      return { ...state,
                  loading: true,
                  message: "",
              };
    case SUCCESS:
      var auth_token = action.response.auth_token
      var success = auth_token != null ? true : false;
      return { ...state,
                  loading: false,
                  message: action.response.message,
                  user: {
                    auth_token: auth_token,
                  },
                  login: {
                    success: success,
                  }
        };
    case ERROR:
      return { ...state,
                  loading: false,
                  message: "Error",
                  login: {
                    success: false,
                  }
        };
    // case SIGNUP.LOADING:
    //   return { ...state,
    //               signup: {
    //                 loading: true,
    //                 message: "",
    //                 success: false,
    //               }
    //           };
    // case SIGNUP.SUCCESS:
    //   var auth_token = action.response.auth_token
    //   var success = auth_token != null ? true : false;
    //   var message = action.response.message != null ? action.response.message : null
    //   return { ...state,
    //               user: {
    //                 auth_token: auth_token,
    //               },
    //               signup: {
    //                 loading: false,
    //                 message: message,
    //                 success: success,
    //               }
    //     };
    // case SIGNUP.ERROR:
    //   return { ...state,
    //               signup: {
    //                 loading: false,
    //                 message: "Error",
    //                 success: false,
    //               }
    //     };
    // case GET_EVENTS.LOADING:
    //   return { ...state,
    //               events: {
    //                 loading: true,
    //                 message: "",
    //               }
    //           };
    // case GET_EVENTS.SUCCESS:
    //   var message = action.response.message != null ? action.response.message : null
    //   var events = message == null && action.response ? action.response : null
    //   return { ...state,
    //               events: {
    //                 loading: false,
    //                 message: message,
    //                 events: events
    //               }
    //     };
    // case GET_EVENTS.ERROR:
    //   return { ...state,
    //               events: {
    //                 loading: false,
    //                 message: "Error",
    //               }
    //     };
    // case GET_CATEGORIES.LOADING:
    //   return { ...state,
    //               categories: {
    //                 loading: true,
    //                 message: "",
    //               }
    //           };
    // case GET_CATEGORIES.SUCCESS:
    //   var message = action.response.message != null ? action.response.message : null
    //   var categories = message == null && action.response ? action.response : null
    //   return { ...state,
    //               categories: {
    //                 loading: false,
    //                 message: message,
    //                 categories: categories
    //               }
    //     };
    // case GET_CATEGORIES.ERROR:
    //   return { ...state,
    //               categories: {
    //                 loading: false,
    //                 message: "Error",
    //               }
    //     };
    // case GET_TAGS.LOADING:
    //   return { ...state,
    //               tags: {
    //                 loading: true,
    //                 message: "",
    //               }
    //           };
    // case GET_TAGS.SUCCESS:
    //   var message = action.response.message != null ? action.response.message : null
    //   var tags = message == null && action.response ? action.response : null
    //   return { ...state,
    //               tags: {
    //                 loading: false,
    //                 message: message,
    //                 tags: tags
    //               }
    //     };
    // case GET_TAGS.ERROR:
    //   return { ...state,
    //               tags: {
    //                 loading: false,
    //                 message: "Error",
    //               }
    //     };
    // case CREATE_EVENT.LOADING:
    //   return { ...state,
    //               new_event: {
    //                 loading: true,
    //                 message: "",
    //                 success: false,
    //               }
    //           };
    // case CREATE_EVENT.SUCCESS:
    //   var message = action.response.message != null ? action.response.message : null
    //   var success = message == null ? true : false;
    //   return { ...state,
    //               new_event: {
    //                 loading: false,
    //                 message: message,
    //                 success: success,
    //               }
    //     };
    // case CREATE_EVENT.ERROR:
    //   return { ...state,
    //               new_event: {
    //                 loading: false,
    //                 message: "Error",
    //                 success: false,
    //               }
    //     };
    default:
    return state;
  }
}
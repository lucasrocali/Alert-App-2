import { AUTHENTIFICATION, GET_EVENTS, GET_CATEGORIES, GET_TAGS, CREATE_EVENT  } from '../actions';

const initialState = {
  authentication: {
    auth_token: "",
    loading: false,
    message: "",
    success: false,
  },
  events: {
    loading: false,
    message: "",
    events: [],
  },
  new_event: {
    loading: false,
    message: "",
    success: false,
    categories: [],
    tags: []
  }
}

export default function reducers(state = initialState, action) {
  console.log("reducers");
  console.log(state);
  console.log(action);
  console.log("REDUCER_TYPE")
  switch (action.type) {
    case AUTHENTIFICATION.LOADING:
      return { ...state,
                  authentication: {
                    ...state.authentication,
                    loading: true,
                  },
              };
    case AUTHENTIFICATION.ERROR:
      return { ...state,
                  authentication: {
                    ...state.authentication,
                    loading: false,
                  },
              };
    case AUTHENTIFICATION.SUCCESS:
      var auth_token = action.response.auth_token
      var success = auth_token != null ? true : false;
      return { ...state,
                authentication: {
                  auth_token: auth_token,
                  loading: false,
                  success: success,
                  message:  action.response.message,
                },
      };
    case GET_EVENTS.LOADING:
      return { ...state,
                  events: {
                    ...state.events,
                    loading: true,
                  },
              };
    case GET_EVENTS.ERROR:
      return { ...state,
                  events: {
                    ...state.events,
                    loading: false,
                  },
              };
     case GET_EVENTS.SUCCESS:
      var message = action.response.message != null ? action.response.message : null
      var events = message == null && action.response ? action.response : null
      return { ...state,
                events: {
                  loading: false,
                  message:  action.response.message,
                  events: events
                },
      };
    case GET_CATEGORIES.LOADING:
      return { ...state,
                  new_event: {
                    ...state.new_event,
                    loading: true,
                  },
              };
    case GET_CATEGORIES.ERROR:
      return { ...state,
                  new_event: {
                    ...state.new_event,
                    loading: false,
                  },
              };
     case GET_CATEGORIES.SUCCESS:
      var message = action.response.message != null ? action.response.message : null
      var categories = message == null && action.response ? action.response : null
      return { ...state,
                new_event: {
                  ...state.new_event,
                  loading: false,
                  message:  action.response.message,
                  categories: categories
                },
      };
      case GET_TAGS.LOADING:
      return { ...state,
                  new_event: {
                    ...state.new_event,
                    loading: true,
                  },
              };
    case GET_TAGS.ERROR:
      return { ...state,
                  new_event: {
                    ...state.new_event,
                    loading: false,
                  },
              };
     case GET_TAGS.SUCCESS:
      var message = action.response.message != null ? action.response.message : null
      var tags = message == null && action.response ? action.response : null
      return { ...state,
                new_event: {
                   ...state.new_event,
                  loading: false,
                  message:  action.response.message,
                  tags: tags
                },
      };
      case CREATE_EVENT.LOADING:
      return { ...state,
                  new_event: {
                    ...state.new_event,
                    loading: true,
                  },
              };
    case CREATE_EVENT.ERROR:
      return { ...state,
                  new_event: {
                    ...state.new_event,
                    loading: false,
                  },
              };
     case CREATE_EVENT.SUCCESS:
      var message = action.response.message != null ? action.response.message : null
      var success = message == null ? true : false;
      return { ...state,
                new_event: {
                   ...state.new_event,
                  loading: false,
                  message:  action.response.message,
                  success: success
                },
      };
    default:
    return { ...state,
                  authentication: {
                    ...state.authentication,
                    success: false,
                  },
                  new_event: {
                    ...state.new_event,
                    success: false,
                  }
              };;
  }
}
export function getMessage(state) {
  if (state.reducers.authentication.message != "") {

    return state.reducers.authentication.message

  } else  if (state.reducers.events.message != "") {

    return state.reducers.events.message

  } else if (state.reducers.new_event.message != "") {

    return state.reducers.authentication.message

  }
  return ""
}

export function isLoading(state) {
  return state.reducers.authentication.loading || state.reducers.events.loading || state.reducers.new_event.loading;
}

export function isAuthenticated(state) {
  return state.reducers.authentication.success
}

export function getEvents(state) {
  return state.reducers.events.events
}

export function getCategories(state) {
  return state.reducers.new_event.categories
}

export function getTags(state) {
  return state.reducers.new_event.tags
}

export function isEventCreated(state) {
  return state.reducers.new_event.success
}
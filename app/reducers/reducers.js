import { AUTHENTIFICATION, GET_EVENTS, GET_CATEGORIES, GET_TAGS, CREATE_EVENT, SET_STRENGTH, LOGOUT } from '../actions';

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
  event: {
    loading: false,
    message: "",
    success: false,
    categories: [],
    tags: []
  }
}

export default function reducers(state = initialState, action) {
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
                  event: {
                    ...state.event,
                    loading: true,
                  },
              };
    case GET_CATEGORIES.ERROR:
      return { ...state,
                  event: {
                    ...state.event,
                    loading: false,
                  },
              };
     case GET_CATEGORIES.SUCCESS:
      var message = action.response.message != null ? action.response.message : null
      var categories = message == null && action.response ? action.response : null
      return { ...state,
                event: {
                  ...state.event,
                  loading: false,
                  message:  action.response.message,
                  categories: categories
                },
      };
      case GET_TAGS.LOADING:
      return { ...state,
                  event: {
                    ...state.event,
                    loading: true,
                  },
              };
    case GET_TAGS.ERROR:
      return { ...state,
                  event: {
                    ...state.event,
                    loading: false,
                  },
              };
     case GET_TAGS.SUCCESS:
      var message = action.response.message != null ? action.response.message : null
      var tags = message == null && action.response ? action.response : null
      return { ...state,
                event: {
                   ...state.event,
                  loading: false,
                  message:  action.response.message,
                  tags: tags
                },
      };
      case CREATE_EVENT.LOADING:
      return { ...state,
                  event: {
                    ...state.event,
                    loading: true,
                  },
              };
    case CREATE_EVENT.ERROR:
      return { ...state,
                  event: {
                    ...state.event,
                    loading: false,
                  },
              };
     case CREATE_EVENT.SUCCESS:
      var message = action.response.message != null ? action.response.message : null
      var success = message == null ? true : false;
      return { ...state,
                event: {
                   ...state.event,
                  loading: false,
                  message:  action.response.message,
                  success: success
                },
      };
    case SET_STRENGTH.LOADING:
      return { ...state,
                  event: {
                    ...state.event,
                    loading: true,
                  },
              };
    case SET_STRENGTH.ERROR:
      return { ...state,
                  event: {
                    ...state.event,
                    loading: false,
                  },
              };
     case SET_STRENGTH.SUCCESS:
      var message = action.response.message != null ? action.response.message : null
      var success = message == null ? true : false;
      return { ...state,
                event: {
                   ...state.event,
                  loading: false,
                  message:  action.response.message,
                  success: success
                },
      };
    case LOGOUT.SELF:
      return initialState;
    default:
    return { ...state,
                  authentication: {
                    ...state.authentication,
                    success: false,
                    message: "",
                  },
                  events: {
                    ...state.events,
                    message: "",
                  },
                  event: {
                    ...state.event,
                    success: false,
                    message: "",
                  }
              };;
  }
}
export function getMessage(state) {
  if (state.reducers.authentication.message != "") {

    return state.reducers.authentication.message

  } else  if (state.reducers.events.message != "") {

    return state.reducers.events.message

  } else if (state.reducers.event.message != "") {

    return state.reducers.authentication.message

  }
  return ""
}

export function isLoading(state) {
  return state.reducers.authentication.loading || state.reducers.events.loading || state.reducers.event.loading;
}

export function isAuthenticated(state) {
  return state.reducers.authentication.success
}

export function getEvents(state) {
  return state.reducers.events.events
}

export function getCategories(state) {
  return state.reducers.event.categories
}

export function getTags(state) {
  return state.reducers.event.tags
}

export function isEventSuccess(state) {
  return state.reducers.event.success
}
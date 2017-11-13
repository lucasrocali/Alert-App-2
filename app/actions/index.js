import reduxTypesCreator from "./ReduxTypesCreator";
const actionTypes = reduxTypesCreator('AUTHENTIFICATION','GET_EVENTS', 'GET_CATEGORIES', 'GET_TAGS', 'CREATE_EVENT', 'SET_STRENGTH', 'LOGOUT' ); // types

export const { AUTHENTIFICATION, GET_EVENTS, GET_CATEGORIES, GET_TAGS, CREATE_EVENT, SET_STRENGTH, LOGOUT } = actionTypes;

export function login(email,password) {
	return {
	    type: AUTHENTIFICATION.SELF,
	    payload: {
	    	login: true,
	    	email: email,
	    	password: password
	    }
  }
}

export function signup(name,email,password,password_confirmation) {
	return {
	    type: AUTHENTIFICATION.SELF,
	    payload: {
	    	login: false,
	    	name: name,
		    email: email,
		    password: password,
		    password_confirmation: password_confirmation
	    }
  }
}

export function loadEvents() {
	return {
	    type: GET_EVENTS.SELF
  }
}

export function loadCategories() {
	return {
	    type: GET_CATEGORIES.SELF
  }
}

export function loadTags() {
	return {
	    type: GET_TAGS.SELF
  }
}

export function saveEvent(event) {
	return {
	    type: CREATE_EVENT.SELF,
	    payload: event
  }
}

export function setStrenght(event_id, up_down) {
	return {
		type: SET_STRENGTH.SELF,
		payload: {
			event_id: event_id,
			up_down: up_down
		}
	}
}

export function logout() {
	return {
	    type: LOGOUT.SELF
  }
}

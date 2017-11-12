import reduxTypesCreator from "./ReduxTypesCreator";
const actionTypes = reduxTypesCreator('LOGIN','SIGNUP','GET_EVENTS', 'GET_CATEGORIES', 'GET_TAGS', 'CREATE_EVENT' ); // types

export const { LOGIN, SIGNUP, GET_EVENTS, GET_CATEGORIES, GET_TAGS, CREATE_EVENT } = actionTypes;

export function login(email,password) {
	return {
	    type: LOGIN.SELF,
	    payload: {
	    	email: email,
	    	password: password
	    }
  }
}

export function signup(name,email,password,password_confirmation) {
	console.log('signup');
	return {
	    type: SIGNUP.SELF,
	    payload: {
	    	name: name,
		    email: email,
		    password: password,
		    password_confirmation: password_confirmation
	    }
  }
}

export function getEvents() {
	return {
	    type: GET_EVENTS.SELF
  }
}

export function getCategories() {
	return {
	    type: GET_CATEGORIES.SELF
  }
}

export function getTags() {
	return {
	    type: GET_TAGS.SELF
  }
}

export function saveEvent(event) {
	console.log('saveEvent'+event)
	return {
	    type: CREATE_EVENT.SELF,
	    payload: event
  }
}

const production = true;

var API = 'https://rocali-alert-api.herokuapp.com/';
var APIToken = "XNZwCzSf5Wxt-caQkxyQ"

const Accept = 'application/alert.v1+json';

if (!production) {
  API = 'http://192.168.1.35:3000';
  APIToken = "1vyqHiVwN1yj-fxzJW_P"
}

export function loginRequest(user_login) {
  console.log("loginRequest");
  return fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/alert.v1+json',
      'Content-Type': 'application/json',
      'ApiToken': APIToken
    },
    body: JSON.stringify({
      email: user_login.email.toLowerCase(),
      password: user_login.password,
    })})
    .then(response => response.json())
    .then(data => data)
    .catch((error) => { throw error });
}

export function signupRequest(user_signup) {
  console.log("signupRequest");
  return fetch(`${API}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/alert.v1+json',
      'Content-Type': 'application/json',
      'ApiToken': APIToken
    },
    body: JSON.stringify({
      email: user_signup.email,
      password: user_signup.password,
      password_confirmation: user_signup.password_confirmation,
      user_info_attributes: {
        name: user_signup.name,
      }
    })})
    .then(response => response.json())
    .then(data => data)
    .catch((error) => { throw error });
}

export function getEventsRequest(token) {
  console.log("getEventsRequest")
  return fetch(`${API}/events`, {
    method: 'GET',
    headers: {
      'Accept': Accept,
      'Authorization': token
    }}).then(response => response.json())
    .then(data => data)
    .catch((error) => { throw error });
}

export function getCategoriesRequest(token) {
  console.log("getCategoriesRequest")
  return fetch(`${API}/categories`, {
    method: 'GET',
    headers: {
      'Accept': Accept,
      'Authorization': token
    }}).then(response => response.json())
    .then(data => data)
    .catch((error) => { throw error });
}

export function getTagsRequest(token) {
  console.log("getTagsRequest")
  return fetch(`${API}/tags`, {
    method: 'GET',
    headers: {
      'Accept': Accept,
      'Authorization': token
    }}).then(response => response.json())
    .then(data => data)
    .catch((error) => { throw error });
}

export function saveEventRequest(token,event) {
  console.log("signupRequest" + token);
  console.log(event);
  console.log({
        lat: event.lat,
        lon: event.lon,
        category_id: event.category.id,
        importance: 1,
        comment:"",
        tag_ids: [
          event.tag.id
        ]
    })
  return fetch(`${API}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': Accept,
      'Authorization': token
    },
    body: JSON.stringify({
        lat: event.lat,
        lon: event.lon,
        category_id: event.category.id,
        importance: 1,
        comment:"",
        tag_ids: [
          event.tag.id
        ]
    })})
    .then(response => response.json())
    .then(data => data)
    .catch((error) => { throw error });
}

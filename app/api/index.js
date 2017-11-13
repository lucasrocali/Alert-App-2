const production = true;

var API = 'https://rocali-alert-api.herokuapp.com/';
var APIToken = "XNZwCzSf5Wxt-caQkxyQ"

const Accept = 'application/alert.v1+json';

function authHeader() {
  return {
    'Accept': 'application/alert.v1+json',
    'Content-Type': 'application/json',
    'ApiToken': APIToken
  }
}

function header(token) {
  return {
    'Content-Type': 'application/json',
    'Accept': Accept,
    'Authorization': token
  }
}

if (!production) {
  API = 'http://192.168.1.35:3000';
  APIToken = "1vyqHiVwN1yj-fxzJW_P"
}

export function loginRequest(user_login) {
  return fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({
      email: user_login.email.toLowerCase(),
      password: user_login.password,
    })})
    .then(response => response.json())
    .then(data => data)
    .catch((error) => { throw error });
}

export function signupRequest(user_signup) {
  return fetch(`${API}/signup`, {
    method: 'POST',
    headers: authHeader(),
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
  return fetch(`${API}/events`, {
    method: 'GET',
    headers: header(token) })
    .then(response => response.json())
    .then(data => data)
    .catch((error) => { throw error });
}

export function getCategoriesRequest(token) {
  return fetch(`${API}/categories`, {
    method: 'GET',
    headers: header(token)}).then(response => response.json())
    .then(data => data)
    .catch((error) => { throw error });
}

export function getTagsRequest(token) {
  return fetch(`${API}/tags`, {
    method: 'GET',
    headers: header(token)}).then(response => response.json())
    .then(data => data)
    .catch((error) => { throw error });
}

export function saveEventRequest(token,event) {
  return fetch(`${API}/events`, {
    method: 'POST',
    headers: header(token),
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

export function setStrengthRequest(token,event_id,up_down) {
  console.log(JSON.stringify({
        event_id: event_id,
        up_down: up_down
    }))
  return fetch(`${API}/strengths`, {
    method: 'POST',
    headers: header(token),
    body: JSON.stringify({
        event_id: event_id,
        up_down: up_down
    })})
    .then(response => response.json())
    .then(data => data)
    .catch((error) => { throw error });
}
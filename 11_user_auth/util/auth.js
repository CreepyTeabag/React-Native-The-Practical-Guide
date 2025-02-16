import axios from "axios";
import { API_KEY } from "./api_key";

const SIGNUP_MODE = "signUp";
const LOGIN_MODE = "signInWithPassword";

export async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;

  return token;
}

export function createUser(email, password) {
  return authenticate(SIGNUP_MODE, email, password);
}

export function login(email, password) {
  return authenticate(LOGIN_MODE, email, password);
}

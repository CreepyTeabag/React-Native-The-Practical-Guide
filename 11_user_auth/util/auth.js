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

  console.log(response.data);
}

export async function createUser(email, password) {
  const response = await authenticate(SIGNUP_MODE, email, password);
}

export async function login(email, password) {
  const response = await authenticate(LOGIN_MODE, email, password);
}

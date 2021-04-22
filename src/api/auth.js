import jwtDecode from "jwt-decode";

import client from "./client";
import config from "../config.json";

const endpoint = "auth";
const token = config.jwtTokenKey;

const login = async (username, password) => {
  const { data: jwt, ...response } = await client.post(endpoint, { username, password });
  localStorage.setItem(token, jwt);

  return response;
};

const logout = () => localStorage.removeItem(token);

const getJwt = () => localStorage.getItem(token);

const getAuthUser = () => {
  try {
    const savedToken = localStorage.getItem(token);
    return jwtDecode(savedToken);
  } catch (error) {
    return null;
  }
};

const exports = {
  login,
  getAuthUser,
  getJwt,
  logout,
};

export default exports;

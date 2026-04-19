import api from "./api";

export const registerUser = (d) => api.post("/auth/register", d);
export const loginUser = (d) => api.post("/auth/login", d);
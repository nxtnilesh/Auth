import axiosInstance from "../utils/axiosInstance";

export const registerUser = (data) =>
  axiosInstance.post("/auth/register", data);
export const loginUser = (data) => axiosInstance.post("/auth/login", data);
export const fetchProfile = () => axiosInstance.get("/profile");
export const refreshAccessToken = (refreshToken) =>
  axiosInstance.post("/auth/refresh-token", { refreshToken });

import axios from "axios";

export const axiosCustom = axios.create({
  baseURL: "/api",
  withCredentials: true,
  timeout: 5000,
  timeoutErrorMessage: "No response was sent from the server, timeout!",
});

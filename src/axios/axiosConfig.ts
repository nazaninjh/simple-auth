import axios from "axios";

export const axiosCustom = axios.create({
  baseURL: `${process.env.DOMAIN}/api` || "/api",
  withCredentials: true,
  timeout: 5000,
  timeoutErrorMessage: "No response was sent from the server, timeout!",
});

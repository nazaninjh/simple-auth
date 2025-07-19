import axios from "axios";

export const axiosCustom = axios.create({
  baseURL: "/api",
  timeout: 2500,
  timeoutErrorMessage: "No response was sent from the server, timeout!",
});

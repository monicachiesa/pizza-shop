import axios from "axios";
import { env } from "@/env";

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true, //envia os cookies do front end para o back end
});

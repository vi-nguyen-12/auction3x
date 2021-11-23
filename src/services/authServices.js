import axios from "axios";
import env from "../env";

const authService = {
  register(user) {
    return axios.post(env.API_URL + "/api/user/register", user);
  },
  verify(data) {
    return axios.post(env.API_URL + "/api/user/verify", data);
  },

  login(data) {
    return axios.post(env.API_URL + "/api/user/login", data, {withCredentials: true});
  }
};

export default authService;

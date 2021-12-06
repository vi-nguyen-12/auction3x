import axios from "axios";
import { FaLongArrowAltUp } from "react-icons/fa";
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
  },

  logout() {
    return axios.get(env.API_URL + "/api/user/logout",  {withCredentials: true});
  },

  realEstate(data) {
    return axios.get(env.API_URL + "/api/properties/real-estates/search", {params: data});
  },

  saveRealEstate(data) {
    console.log(data)
    return axios.post(env.API_URL + "/api/properties/real-estates/", data, {withCredentials: true,   headers: { "Content-Type": "multipart/form-data" }});
  }
};

export default authService;

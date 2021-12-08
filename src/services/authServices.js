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
    return axios.post(env.API_URL + "/api/user/login", data, {
      withCredentials: true,
    });
  },

  logout() {
    return axios.get(env.API_URL + "/api/user/logout", {
      withCredentials: true,
    });
  },

  realEstate(data) {
    return axios.get(
      "https://apis.estated.com/v4/property?token=H3FBUJSQRJ0toUM6hGMEza6DQFLVMo&street_address=" +
        data?.address1 +
        "&city=" +
        data?.city +
        "&state=" +
        data?.state +
        "&zip_code=" +
        data?.zipCode +
        ""
    );
  },

  saveRealEstate(data) {
    console.log(data);
    return axios.post(env.API_URL + "/api/properties/real-estates/", data, {
      withCredentials: true,
      headers: { "content-type": "multipart/form-data" },
    });
  },

  saveImages(data) {
    return axios.post(
      env.API_URL + "/api/properties/real-estates/images/upload",
      data,
      {
        withCredentials: true,
        headers: { "content-type": "multipart/form-data" },
      }
    );
  },

  saveVideos(data) {
    return axios.post(
      env.API_URL + "/api/properties/real-estates/videos/upload",
      data,
      {
        withCredentials: true,
        headers: { "content-type": "multipart/form-data" },
      }
    );
  },

  getProperties() {
    return axios.get(env.API_URL + "/api/properties/real-estates");
  },
};

export default authService;

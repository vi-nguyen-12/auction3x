import axios from "axios";
import { FaLongArrowAltUp } from "react-icons/fa";
import env from "../env";

const authService = {
  register(user) {
    return axios.post(env.API_URL + "/api/user/register", user);
  },

  getUsers(data) {
    return axios.post(
      env.API_URL + "/api/user/checkJWT",
      { authToken: data },
      {
        withCredentials: true,
      }
    );
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
    return axios.get(env.API_URL + "/api/properties/real-estates/search", {
      params: data,
    });
  },

  saveRealEstate(data) {
    console.log(data);
    return axios.post(env.API_URL + "/api/properties/real-estates/", data, {
      withCredentials: true,
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
  fetchKycStatus(data) {
    return axios.get(env.API_URL + "/api/kyc/fetchKycStatus", data);
  },

  verifyKyc(data) {
    return axios.get(env.API_URL + "/api/kyc/verifyKyc", {
      withCredentials: true,
    });
  },

  getProperties() {
    return axios.get(env.API_URL + "/api/properties/real-estates");
  },

  saveDocuments(data) {
    return axios.post(
      env.API_URL + "/api/properties/real-estates/documents/upload",
      data,
      {
        withCredentials: true,
        headers: { "content-type": "multipart/form-data" },
      }
    );
  },

  sendProperty(id) {
    return axios.get(env.API_URL + "/api/properties/real-estates/" + id);
  },

  buyerRegister(data) {
    return axios.post(env.API_URL + "/api/buyers", data, {withCredentials: true});
  }
};

export default authService;

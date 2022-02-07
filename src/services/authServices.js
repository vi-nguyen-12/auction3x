import axios from "axios";
import { FaLongArrowAltUp } from "react-icons/fa";
import env from "../env";

const authService = {
  register(user) {
    return axios.post(env.API_URL + "/api/users/register", user);
  },

  getUsers(data) {
    return axios.post(
      env.API_URL + "/api/users/checkJWT",
      { authToken: data },
      {
        withCredentials: true,
      }
    );
  },

  verify(data) {
    return axios.post(env.API_URL + "/api/users/verify", data);
  },

  login(data) {
    return axios.post(env.API_URL + "/api/users/login", data, {
      withCredentials: true,
    });
  },

  logout() {
    return axios.get(env.API_URL + "/api/users/logout", {
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

  saveLives(data) {
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
    return axios.post(env.API_URL + "/api/buyers", data, {
      withCredentials: true,
    });
  },

  getBuyerQuestions() {
    return axios.get(env.API_URL + "/api/questions", { withCredentials: true });
  },

  auctionBid(data) {
    return axios.put(
      env.API_URL + "/api/auctions/bidding/" + data.id,
      {
        biddingTime: data.biddingTimes,
        biddingPrice: data.bidding,
      },
      { withCredentials: true }
    );
  },

  // getAuctionProperty(id) {
  //   return axios.get(env.API_URL + "/api/auctions/propertyId/" + id);
  // },

  getUpcomingAuctions() {
    return axios.get(env.API_URL + "/api/auctions/real-estates/upcoming", {
      withCredentials: true,
    });
  },

  getRegistStatus() {
    return axios.get(
      env.API_URL + "/api/auctions/real-estates/status?buyer=true",
      { withCredentials: true }
    );
  },

  getOngoingAuctions() {
    return axios.get(env.API_URL + "/api/auctions/real-estates/ongoing");
  },

  forgotPassword(data) {
    return axios.post(env.API_URL + "/api/users/password", data);
  },

  resetPassword(data) {
    return axios.post(env.API_URL + "/api/users/password", {
      token: data.token,
      password: data.password,
    });
  },

  resendConfirmEmail(data) {
    return axios.post(env.API_URL + "/api/users/confirmation/email", {
      email: data.email,
    });
  },

  confirmEmail(data) {
    return axios.post(env.API_URL + "/api/users/confirmation/verify", {
      token: data,
    });
  },

  getDocuSign() {
    return axios.get(
      env.API_URL + "/api/docusign/signature/sellerAgreement/uiviews",
      { withCredentials: true }
    );
  },

  getDocuSignStatus(data) {
    console.log(data);
    return axios.get(env.API_URL + `/api/docusign/envelopes/${data}/status`, {
      withCredentials: true,
    });
  },
};

export default authService;

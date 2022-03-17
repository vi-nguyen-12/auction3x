import axios from "axios";

const apiUrl =
  process.env.REACT_APP_NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL
    : "http://localhost:5000";
const auth_token = document.cookie.split("=")[1];

console.log(apiUrl);

const authService = {
  register(user) {
    return axios.post(apiUrl + "/api/users/register", user);
  },

  getUsers(data) {
    return axios.post(apiUrl + "/api/users/checkJWT", { authToken: data });
  },

  verify(data) {
    return axios.post(apiUrl + "/api/users/verify", data);
  },

  login(data) {
    return axios.post(apiUrl + "/api/users/login", data);
  },

  realEstate(data) {
    return axios.get(apiUrl + "/api/properties/real-estates/search", {
      params: data,
    });
  },

  saveRealEstate(data) {
    return axios.post(apiUrl + "/api/properties/real-estates/", data, {
      headers: {
        Authorization:
          "Bearer " + (auth_token ? auth_token : document.cookie.split("=")[1]),
      },
    });
  },

  sellProperty(data) {
    return axios.post(apiUrl + "/api/properties", data, {
      headers: {
        Authorization:
          "Bearer " + (auth_token ? auth_token : document.cookie.split("=")[1]),
      },
    });
  },

  saveImages(data) {
    return axios.post(apiUrl + "/api/aws/images/upload", data, {
      headers: {
        Authorization:
          "Bearer " + (auth_token ? auth_token : document.cookie.split("=")[1]),
        "content-type": "multipart/form-data",
      },
    });
  },

  saveVideos(data) {
    return axios.post(apiUrl + "/api/aws/videos/upload", data, {
      headers: {
        Authorization:
          "Bearer " + (auth_token ? auth_token : document.cookie.split("=")[1]),
        "content-type": "multipart/form-data",
      },
    });
  },

  fetchKycStatus(data) {
    return axios.get(apiUrl + "/api/kyc/fetchKycStatus", data);
  },

  verifyKyc(data) {
    return axios.get(apiUrl + "/api/kyc/verifyKyc", {
      headers: {
        Authorization:
          "Bearer " + (auth_token ? auth_token : document.cookie.split("=")[1]),
      },
    });
  },

  saveDocuments(data) {
    return axios.post(apiUrl + "/api/aws/documents/upload", data, {
      headers: {
        Authorization:
          "Bearer " + (auth_token ? auth_token : document.cookie.split("=")[1]),
        "content-type": "multipart/form-data",
      },
    });
  },

  sendProperty(id) {
    return axios.get(apiUrl + "/api/properties/" + id);
  },

  buyerRegister(data) {
    return axios.post(apiUrl + "/api/buyers", data, {
      headers: {
        Authorization:
          "Bearer " + (auth_token ? auth_token : document.cookie.split("=")[1]),
      },
    });
  },

  getBuyerQuestions() {
    return axios.get(apiUrl + "/api/questions", {
      headers: {
        Authorization:
          "Bearer " + (auth_token ? auth_token : document.cookie.split("=")[1]),
      },
    });
  },

  auctionBid(data) {
    return axios.put(
      apiUrl + "/api/auctions/bidding/" + data.id,
      {
        biddingTime: data.biddingTimes,
        biddingPrice: data.bidding,
      },
      {
        headers: {
          Authorization:
            "Bearer " +
            (auth_token ? auth_token : document.cookie.split("=")[1]),
        },
      }
    );
  },

  // getAuctionProperty(id) {
  //   return axios.get(apiUrl + "/api/auctions/propertyId/" + id);
  // },

  getUpcomingAuctions() {
    return axios.get(apiUrl + "/api/auctions/upcoming");
  },

  getOngoingAuctions() {
    return axios.get(apiUrl + "/api/auctions/ongoing");
  },

  // getUpcomingCarAuctions() {
  //   return axios.get(apiUrl + "/api/auctions/upcoming");
  // },

  // getOngoingCarAuctions() {
  //   return axios.get(apiUrl + "/api/auctions/car/ongoing");
  // },

  // getUpcomingJetAuctions() {
  //   return axios.get(apiUrl + "/api/auctions/jet/upcoming");
  // },

  // getOngoingJetAuctions() {
  //   return axios.get(apiUrl + "/api/auctions/jet/ongoing");
  // },

  // getUpcomingYachtAuctions() {
  //   return axios.get(apiUrl + "/api/auctions/yacht/upcoming");
  // },

  // getOngoingYachtAuctions() {
  //   return axios.get(apiUrl + "/api/auctions/yacht/ongoing");
  // },

  getRegistStatus() {
    return axios.get(apiUrl + "/api/auctions/status?buyer=true", {
      headers: {
        Authorization:
          "Bearer " + (auth_token ? auth_token : document.cookie.split("=")[1]),
      },
    });
  },

  forgotPassword(data) {
    return axios.post(apiUrl + "/api/users/password", data);
  },

  resetPassword(data) {
    return axios.post(apiUrl + "/api/users/password", {
      token: data.token,
      password: data.password,
    });
  },

  resendConfirmEmail(data) {
    return axios.post(apiUrl + "/api/users/confirmation/email", {
      email: data.email,
    });
  },

  confirmEmail(data) {
    return axios.post(apiUrl + "/api/users/confirmation/verify", {
      token: data,
    });
  },

  getDocuSign(data) {
    return axios.get(
      apiUrl +
        `/api/docusign/signature/sellerAgreement/uiviews?envelopeId=${data}`,
      {
        headers: {
          Authorization:
            "Bearer " +
            (auth_token ? auth_token : document.cookie.split("=")[1]),
        },
      }
    );
  },

  getDocuSignStatus(data) {
    return axios.get(apiUrl + `/api/docusign/envelopes/${data}/status`, {
      withCredentials: true,
    });
  },

  saveProperty(data) {
    return axios.put(
      apiUrl + `/api/users/${data.userId}/likes/${data.auctionId}`
    );
  },

  removeProperty(data) {
    return axios.delete(
      apiUrl + `/api/users/${data.userId}/likes/${data.auctionId}`
    );
  },

  getSavedProperties(id) {
    return axios.get(apiUrl + `/api/users/${id}/likes`);
  },

  getUserBidAuctions(id) {
    return axios.get(apiUrl + `/api/users/${id}/buyer/bidAuctions`);
  },

  buyerApprovedAuctions(id) {
    return axios.get(apiUrl + `/api/users/${id}/buyer/auctions?status=success`);
  },

  buyerWonAuctions(id) {
    return axios.get(apiUrl + `/api/users/${id}/buyer/winAuctions`);
  },

  sellerApprovedAuctions(id) {
    return axios.get(apiUrl + `/api/users/${id}/seller/auctions`);
  },

  sellerPendingAuctions(id) {
    return axios.get(
      apiUrl + `/api/users/${id}/seller/properties?status=pending`
    );
  },

  sellerApprovedListings(id) {
    return axios.get(
      apiUrl +
        `/api/users/${id}/seller/properties?status=success&inAuction=false`
    );
  },

  sellerPropInAuctions(id) {
    return axios.get(
      apiUrl +
        `/api/users/${id}/seller/properties?status=success&inAuction=true`
    );
  },

  editUserInfo(data) {
    return axios.put(
      apiUrl + `/api/users/${data.id}`,
      { ...data.details },
      {
        headers: {
          Authorization:
            "Bearer " +
            (auth_token ? auth_token : document.cookie.split("=")[1]),
        },
      }
    );
  },
};

export default authService;

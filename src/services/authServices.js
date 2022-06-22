import axios from "axios";

const apiUrl =
  process.env.REACT_APP_NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL
    : "http://localhost:5000";
const auth_token = localStorage.getItem("token");

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
          "Bearer " + (auth_token ? auth_token : localStorage.getItem("token")),
      },
    });
  },

  sellProperty(data) {
    return axios.post(apiUrl + "/api/properties", data, {
      headers: {
        Authorization:
          "Bearer " + (auth_token ? auth_token : localStorage.getItem("token")),
      },
    });
  },

  saveImages(data) {
    return axios.post(apiUrl + "/api/aws/images/upload", data, {
      headers: {
        Authorization:
          "Bearer " + (auth_token ? auth_token : localStorage.getItem("token")),
        "content-type": "multipart/form-data",
      },
    });
  },

  saveVideos(data) {
    return axios.post(apiUrl + "/api/aws/videos/upload", data, {
      headers: {
        Authorization:
          "Bearer " + (auth_token ? auth_token : localStorage.getItem("token")),
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
          "Bearer " + (auth_token ? auth_token : localStorage.getItem("token")),
      },
    });
  },

  saveDocuments(data) {
    return axios.post(apiUrl + "/api/aws/documents/upload", data, {
      headers: {
        Authorization:
          "Bearer " + (auth_token ? auth_token : localStorage.getItem("token")),
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
          "Bearer " + (auth_token ? auth_token : localStorage.getItem("token")),
      },
    });
  },

  getBuyerQuestions() {
    return axios.get(apiUrl + "/api/questions", {
      headers: {
        Authorization:
          "Bearer " + (auth_token ? auth_token : localStorage.getItem("token")),
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
            (auth_token ? auth_token : localStorage.getItem("token")),
        },
      }
    );
  },

  // getAuctionProperty(id) {
  //   return axios.get(apiUrl + "/api/auctions/propertyId/" + id);
  // },

  getFeaturedAuctions() {
    return axios.get(apiUrl + "/api/auctions?isFeatured=true");
  },

  getUpcomingAuctions() {
    return axios.get(apiUrl + "/api/auctions/upcoming");
  },

  getOngoingAuctions() {
    return axios.get(apiUrl + "/api/auctions/ongoing");
  },
  getOngoingAuctionsByType(type) {
    return axios.get(apiUrl + `/api/auctions/ongoing/${type}`);
  },
  getUpcomingAuctionsByType(type) {
    return axios.get(apiUrl + `/api/auctions/upcoming/${type}`);
  },

  getAuction(id) {
    return axios.get(apiUrl + `/api/auctions/${id}`, {
      headers: {
        Authorization:
          "Bearer " + (auth_token ? auth_token : localStorage.getItem("token")),
      },
    });
  },

  getRegistStatus() {
    return axios.get(apiUrl + "/api/auctions/status?buyer=true", {
      headers: {
        Authorization:
          "Bearer " + (auth_token ? auth_token : localStorage.getItem("token")),
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

  getSellingDocuSign(data) {
    return axios.get(
      apiUrl +
        `/api/docusign/signature/selling_agreement/uiviews?envelopeId=${data}`,
      {
        headers: {
          Authorization:
            "Bearer " +
            (auth_token ? auth_token : localStorage.getItem("token")),
        },
      }
    );
  },
  getBuyingDocuSign(data) {
    return axios.get(
      apiUrl +
        `/api/docusign/signature/buying_agreement/uiviews?envelopeId=${data}`,
      {
        headers: {
          Authorization:
            "Bearer " +
            (auth_token ? auth_token : localStorage.getItem("token")),
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
      apiUrl + `/api/users/${data.userId}/${data.auctionId}/liked`,
      {},
      {
        headers: {
          Authorization:
            "Bearer " +
            (auth_token ? auth_token : localStorage.getItem("token")),
        },
      }
    );
  },

  removeProperty(data) {
    return axios.put(
      apiUrl + `/api/users/${data.userId}/${data.auctionId}/unliked`,
      {},
      {
        headers: {
          Authorization:
            "Bearer " +
            (auth_token ? auth_token : localStorage.getItem("token")),
        },
      }
    );
  },

  getIncompleteProperty(id) {
    return axios.get(
      apiUrl + `/api/users/${id}/seller/properties?completed=false`
    );
  },

  getSavedProperties(id) {
    return axios.get(apiUrl + `/api/users/${id}/likes`, {
      headers: {
        Authorization:
          "Bearer " + (auth_token ? auth_token : localStorage.getItem("token")),
      },
    });
  },

  getUserBidAuctions(id) {
    return axios.get(apiUrl + `/api/users/${id}/buyer/auctions/bid`, {
      headers: {
        Authorization:
          "Bearer " + (auth_token ? auth_token : document.cookie.split("=")[1]),
      },
    });
  },

  getBuyerPendingAuctions(id) {
    return axios.get(
      apiUrl + `/api/users/${id}/buyer/auctions?status=pending`,
      {
        headers: {
          Authorization:
            "Bearer " +
            (auth_token ? auth_token : localStorage.getItem("token")),
        },
      }
    );
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
      apiUrl +
        `/api/users/${id}/seller/properties?status=pending&inAuction=false&completed=true`
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

  getSellerSoldListings(id) {
    return axios.get(apiUrl + `/api/users/${id}/seller/properties?sold=true`);
  },

  editUserInfo(data) {
    return axios.put(
      apiUrl + `/api/users/${data.id}`,
      { ...data.details },
      {
        headers: {
          Authorization:
            "Bearer " +
            (auth_token ? auth_token : localStorage.getItem("token")),
        },
      }
    );
  },

  savePropInfo(data) {
    return axios.post(apiUrl + "/api/properties", data, {
      headers: {
        Authorization:
          "Bearer " + (auth_token ? auth_token : localStorage.getItem("token")),
      },
    });
  },

  postRealEstateInfo(data) {
    return axios.post(apiUrl + "/api/properties/real-estate", data, {
      headers: {
        Authorization:
          "Bearer " + (auth_token ? auth_token : localStorage.getItem("token")),
      },
    });
  },

  putRealEstateInfo(data) {
    return axios.put(
      apiUrl + `/api/properties/real-estate/${data.id}`,
      data.details,
      {
        headers: {
          Authorization:
            "Bearer " +
            (auth_token ? auth_token : localStorage.getItem("token")),
        },
      }
    );
  },

  saveInfo(data) {
    return axios.put(apiUrl + `/api/properties/${data.id}`, data.details, {
      headers: {
        Authorization:
          "Bearer " + (auth_token ? auth_token : localStorage.getItem("token")),
      },
    });
  },

  deleteProperty(id) {
    return axios.delete(apiUrl + `/api/properties/${id}`, {
      headers: {
        Authorization:
          "Bearer " + (auth_token ? auth_token : localStorage.getItem("token")),
      },
    });
  },

  auctionResult(id) {
    return axios.get(apiUrl + `/api/auctions/${id}/result`);
  },

  getDocuments() {
    return axios.get(apiUrl + "/api/documents");
  },

  submitContact(data) {
    return axios.post(apiUrl + "/api/contacts", data);
  },

  getFAQs() {
    return axios.get(apiUrl + "/api/faqs");
  },
  getProperty(id) {
    return axios.get(apiUrl + `/api/properties/${id}`, {
      headers: {
        Authorization:
          "Bearer " + (auth_token ? auth_token : localStorage.getItem("token")),
      },
    });
  },
  createProperty(data) {
    return axios.post(apiUrl + "/api/properties", data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
  editProperty(id, data) {
    console.log(data);
    return axios.put(apiUrl + `/api/properties/${id}`, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
  editRealEstate(id, data) {
    console.log(data);
    return axios.put(apiUrl + `/api/properties/real-estate/${id}`, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
};

export default authService;

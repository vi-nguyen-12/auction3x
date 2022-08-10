import axios from "axios";

const apiUrl =
  process.env.REACT_APP_NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_NODE_ENV === "test"
    ? process.env.REACT_APP_TEST_API_URL
    : process.env.REACT_APP_DEV_API_URL;

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
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  sellProperty(data) {
    return axios.post(apiUrl + "/api/properties", data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  saveImages(data) {
    return axios.post(apiUrl + "/api/aws/images/upload", data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "content-type": "multipart/form-data",
      },
    });
  },

  saveVideos(data) {
    return axios.post(apiUrl + "/api/aws/videos/upload", data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
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
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  saveDocuments(data) {
    return axios.post(apiUrl + "/api/aws/documents/upload", data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
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
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  getBuyerQuestions() {
    return axios.get(apiUrl + "/api/questions", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
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
          Authorization: "Bearer " + localStorage.getItem("token"),
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
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  getRegistStatus() {
    return axios.get(apiUrl + "/api/auctions/status?buyer=true", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
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
          Authorization: "Bearer " + localStorage.getItem("token"),
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
          Authorization: "Bearer " + localStorage.getItem("token"),
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
          Authorization: "Bearer " + localStorage.getItem("token"),
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
          Authorization: "Bearer " + localStorage.getItem("token"),
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
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  getUserBidAuctions(id) {
    return axios.get(apiUrl + `/api/users/${id}/buyer/auctions/bid`, {
      headers: {
        Authorization: "Bearer " + document.cookie.split("=")[1],
      },
    });
  },

  getBuyerPendingAuctions(id) {
    return axios.get(
      apiUrl + `/api/users/${id}/buyer/auctions?status=pending`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  },

  getBuyerApprovedAuctions(id) {
    return axios.get(
      apiUrl + `/api/users/${id}/buyer/auctions?status=success`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
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
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  },

  postPropInfo(data) {
    return axios.post(apiUrl + "/api/properties", data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  putPropInfo(data) {
    return axios.put(apiUrl + `/api/properties/${data.id}`, data.changes, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  postRealEstateInfo(data) {
    return axios.post(apiUrl + "/api/properties/real-estate", data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  putRealEstateInfo(data) {
    return axios.put(
      apiUrl + `/api/properties/real-estate/${data.id}`,
      data.changes,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  },

  saveInfo(data) {
    return axios.put(apiUrl + `/api/properties/${data.id}`, data.details, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  deleteProperty(id) {
    return axios.delete(apiUrl + `/api/properties/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  auctionResult(id) {
    return axios.get(apiUrl + `/api/auctions/${id}/result`);
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
        Authorization: "Bearer " + localStorage.getItem("token"),
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
    return axios.put(apiUrl + `/api/properties/${id}`, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
  editRealEstate(id, data) {
    return axios.put(apiUrl + `/api/properties/real-estate/${id}`, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  propFilter(data) {
    return axios.get(
      apiUrl +
        `/api/auctions?${data.type ? "type=" + data.type : ""}&${
          data.auctionType
            ? data.auctionType.auctions
              ? "time=" + data.auctionType.auctions
              : ""
            : ""
        }&${data.zip ? "property_zip_code=" + data.zip : ""}&${
          data.city ? "property_city=" + data.city : ""
        }&${data.state ? "property_state=" + data.state : ""}&${
          data.country ? "property_country=" + data.country : ""
        }&${
          data.min_price
            ? data.min_price.auctions
              ? "min_price=" + data.min_price.auctions
              : ""
            : ""
        }&${
          data.max_price
            ? data.max_price.auctions
              ? "max_price=" + data.max_price.auctions
              : ""
            : ""
        }`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  },

  realEstateFilter(data) {
    console.log(data);
    return axios.get(
      apiUrl +
        `/api/auctions?type=real-estate&${
          data.auctionType
            ? data.auctionType.realEstate
              ? "time=" + data.auctionType.realEstate
              : ""
            : ""
        }&${
          data.real_esstate_type
            ? "real_estate_type=" + data.real_esstate_type
            : ""
        }&${
          data.minYear
            ? data.minYear.realEstate
              ? "min_year=" + data.minYear.realEstate
              : ""
            : ""
        }&${
          data.maxYear
            ? data.maxYear.realEstate
              ? "max_Year=" + data.maxYear.realEstate
              : ""
            : ""
        }&${
          data.min_price
            ? data.min_price.realEstate
              ? "min_price=" + data.min_price.realEstate
              : ""
            : ""
        }&${
          data.max_price
            ? data.max_price.realEstate
              ? "max_price=" + data.max_price.realEstate
              : ""
            : ""
        }&${data.zip ? "property_zip_code=" + data.zip : ""}&${
          data.city ? "property_city=" + data.city : ""
        }&${data.state ? "property_state=" + data.state : ""}&${
          data.country ? "property_country=" + data.country : ""
        }`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  },

  carFilter(data) {
    return axios.get(
      apiUrl +
        `/api/auctions?type=car&${
          data.auctionType
            ? data.auctionType.car
              ? "time=" + data.auctionType.car
              : ""
            : ""
        }&${
          data.min_price
            ? data.min_price.car
              ? "min_price=" + data.min_price.car
              : ""
            : ""
        }&${
          data.max_price
            ? data.max_price.car
              ? "max_price=" + data.max_price.car
              : ""
            : ""
        }&${data.condition ? "condition=" + data.condition : ""}&${
          data.make ? "make=" + data.make.car : ""
        }&${data.model ? "model=" + data.model : ""}&${
          data.min_mileage ? "min_mileage=" + data.min_mileage : ""
        }&${data.max_mileage ? "max_mileage=" + data.max_mileage : ""}&${
          data.zip ? "property_zip_code=" + data.zip : ""
        }&${data.city ? "property_city=" + data.city : ""}&${
          data.state ? "property_state=" + data.state : ""
        }&${data.country ? "property_country=" + data.country : ""}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  },

  jetFilter(data) {
    return axios.get(
      apiUrl +
        `/api/auctions?type=jet&${
          data.auctionType
            ? data.auctionType.jet
              ? "time=" + data.auctionType.jet
              : ""
            : ""
        }&${
          data.min_price
            ? data.min_price.jet
              ? "min_price=" + data.min_price.jet
              : ""
            : ""
        }&${
          data.max_price
            ? data.max_price.jet
              ? "max_price=" + data.max_price.jet
              : ""
            : ""
        }&${
          data.make
            ? data.make.jet
              ? "aircraft_builder_name=" + data.make.jet
              : ""
            : ""
        }&${
          data.minYear
            ? data.minYear.jet
              ? "min_year=" + data.minYear.jet
              : ""
            : ""
        }&${
          data.maxYear
            ? data.maxYear.jet
              ? "max_Year=" + data.maxYear.jet
              : ""
            : ""
        }&${data.zip ? "property_zip_code=" + data.zip : ""}&${
          data.city ? "property_city=" + data.city : ""
        }&${data.state ? "property_state=" + data.state : ""}&${
          data.country ? "property_country=" + data.country : ""
        }`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  },

  yachtFilter(data) {
    return axios.get(
      apiUrl +
        `/api/auctions?type=yacht&${
          data.auctionType
            ? data.auctionType.yacht
              ? "time=" + data.auctionType.yacht
              : ""
            : ""
        }&${
          data.min_price
            ? data.min_price.yacht
              ? "min_price=" + data.min_price.yacht
              : ""
            : ""
        }&${
          data.max_price
            ? data.max_price.yacht
              ? "max_price=" + data.max_price.yacht
              : ""
            : ""
        }&${
          data.make
            ? data.make.yacht
              ? "manufacture_name=" + data.make.yacht
              : ""
            : ""
        }&${data.min_length ? "min_length=" + data.min_length : ""}&${
          data.max_length ? "max_length=" + data.max_length : ""
        }&${data.zip ? "property_zip_code=" + data.zip : ""}&${
          data.city ? "property_city=" + data.city : ""
        }&${data.state ? "property_state=" + data.state : ""}&${
          data.country ? "property_country=" + data.country : ""
        }`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  },
  getDocuments(data) {
    return axios.get(apiUrl + `/api/documents`, { params: data });
  },

  sendEmails(data) {
    return axios.post(apiUrl + `/api/emails`, data);
  },

  subscribe(data) {
    return axios.post(apiUrl + `/api/subscriptions`, { email: data });
  },
  getPageContents(params) {
    return axios.get(apiUrl + `/api/pageContents`, { params });
  },

  getPageContent(name) {
    return axios.get(apiUrl + `/api/pageContents?name=${name}`);
  },

  getTeam() {
    return axios.get(apiUrl + `/api/teamMembers`);
  },

  getWallet(id) {
    return axios.get(apiUrl + `/api/users/${id}/buyer/funds`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  getBuyerInfo(id) {
    return axios.get(apiUrl + `/api/users/${id}/buyer/auctions`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  addFund(data) {
    return axios.put(
      apiUrl + `/api/buyers/${data.id}/funds/addition`,
      { documents: [data.details] },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  },

  deleteNotification(id) {
    return axios.delete(
      apiUrl + `/api/users/${id.userId}/notifications/${id.notificationId}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  },

  editProp(data, id) {
    return axios.put(apiUrl + `/api/properties/${id}`, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  editBuyer(id, data) {
    return axios.put(apiUrl + `/api/buyers/${id}`, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
};

export default authService;

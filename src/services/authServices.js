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
    return axios.get(
      apiUrl + "/api/auctions?isFeatured=true&time=upcoming&time=ongoing"
    );
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

  getSellingDocuSign(id) {
    return axios.get(
      apiUrl + `/api/docusign/signature/selling_agreement/${id}/uiviews`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  },
  getBuyingDocuSign(id) {
    return axios.post(
      apiUrl + `/api/docusign/signature/buying_agreement/${id}/uiviews`,
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  },

  getOldDocusign(id) {
    return axios.get(apiUrl + `/api/docusign/${id}/uiviews`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  getDocuSignStatus(id) {
    return axios.get(apiUrl + `/api/docusign/${id}`, {
      withCredentials: true,
    });
  },

  sendSellDocuSign(id) {
    return axios.get(
      apiUrl + `/api/docusign/signature/selling_agreement/${id}/email`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  },

  sendBuyerDocuSign(data) {
    return axios.post(
      apiUrl + `/api/docusign/signature/buying_agreement/${data.id}/email`,
      { clientName: data.clientName, clientEmail: data.clientEmail },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
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
      apiUrl + `/api/users/${id}/seller/properties?completed=false`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
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
        Authorization: "Bearer " + localStorage.getItem("token"),
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

  getBrokers(searchParams) {
    return axios.get(apiUrl + `/api/users${searchParams}`);
  },

  buyerApprovedAuctions(id) {
    return axios.get(
      apiUrl + `/api/users/${id}/buyer/auctions?status=success`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  },

  buyerWonAuctions(id) {
    return axios.get(apiUrl + `/api/users/${id}/buyer/winAuctions`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  sellerApprovedAuctions(id) {
    return axios.get(apiUrl + `/api/users/${id}/seller/auctions`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  sellerPendingAuctions(id) {
    return axios.get(
      apiUrl +
        `/api/users/${id}/seller/properties?status=pending&inAuction=false&completed=true`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  },

  sellerApprovedListings(id) {
    return axios.get(
      apiUrl +
        `/api/users/${id}/seller/properties?status=success&inAuction=false`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  },

  sellerPropInAuctions(id) {
    return axios.get(
      apiUrl +
        `/api/users/${id}/seller/properties?status=success&inAuction=true`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  },

  getSellerSoldListings(id) {
    return axios.get(apiUrl + `/api/users/${id}/seller/auctions?isSold=true`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
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
          data.auctionType ? "time=" + data.auctionType : ""
        }&${data.zip ? "property_zip_code=" + data.zip : ""}&${
          data.city ? "property_city=" + data.city : ""
        }&${data.state ? "property_state=" + data.state : ""}&${
          data.country ? "property_country=" + data.country : ""
        }&${data.min_price ? "min_price=" + data.min_price : ""}&${
          data.max_price ? "max_price=" + data.max_price : ""
        }`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  },

  featureFilter(data) {
    return axios.get(
      apiUrl +
        `/api/auctions?isFeatured=true&${
          data.type ? "type=" + data.type : ""
        }&${data.auctionType ? "time=" + data.auctionType : ""}&${
          data.zip ? "property_zip_code=" + data.zip : ""
        }&${data.city ? "property_city=" + data.city : ""}&${
          data.state ? "property_state=" + data.state : ""
        }&${data.country ? "property_country=" + data.country : ""}&${
          data.min_price ? "min_price=" + data.min_price : ""
        }&${data.max_price ? "max_price=" + data.max_price : ""}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  },

  upcomingFilter(data) {
    return axios.get(
      apiUrl +
        `/api/auctions?${data.type ? "type=" + data.type : ""}&time=upcoming&${
          data.zip ? "property_zip_code=" + data.zip : ""
        }&${data.city ? "property_city=" + data.city : ""}&${
          data.state ? "property_state=" + data.state : ""
        }&${data.country ? "property_country=" + data.country : ""}&${
          data.min_price ? "min_price=" + data.min_price : ""
        }&${data.max_price ? "max_price=" + data.max_price : ""}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  },

  realEstateFilter(data) {
    return axios.get(
      apiUrl +
        `/api/auctions?type=real-estate&${
          data?.auctionType ? "time=" + data.auctionType : ""
        }&${data?.realType ? "real_estate_type=" + data.realType : ""}&${
          data?.minYear ? "min_year=" + data.minYear : ""
        }&${data?.maxYear ? "max_Year=" + data.maxYear : ""}&${
          data?.min_price ? "min_price=" + data.min_price : ""
        }&${data?.max_price ? "max_price=" + data.max_price : ""}&${
          data?.zip ? "property_zip_code=" + data.zip : ""
        }&${data?.city ? "property_city=" + data.city : ""}&${
          data?.state ? "property_state=" + data.state : ""
        }&${data?.country ? "property_country=" + data.country : ""}`,
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
          data?.auctionType ? "time=" + data.auctionType : ""
        }&${data?.min_price ? "min_price=" + data.min_price : ""}&${
          data?.max_price ? "max_price=" + data.max_price : ""
        }&${data?.condition ? "condition=" + data.condition : ""}&${
          data?.make ? "make=" + data.make : ""
        }&${data?.model ? "model=" + data.model : ""}&${
          data?.minMileage ? "min_mileage=" + data.minMileage : ""
        }&${data?.maxMileage ? "max_mileage=" + data.maxMileage : ""}&${
          data?.zip ? "property_zip_code=" + data.zip : ""
        }&${data?.city ? "property_city=" + data.city : ""}&${
          data?.state ? "property_state=" + data.state : ""
        }&${data?.country ? "property_country=" + data.country : ""}`,
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
          data?.auctionType ? "time=" + data.auctionType : ""
        }&${data?.min_price ? "min_price=" + data.min_price : ""}&${
          data?.max_price ? "max_price=" + data.max_price : ""
        }&${data?.make ? "aircraft_builder_name=" + data.make : ""}&${
          data?.minYear ? "min_year=" + data.minYear : ""
        }&${data?.maxYear ? "max_Year=" + data.maxYear : ""}&${
          data?.zip ? "property_zip_code=" + data.zip : ""
        }&${data?.city ? "property_city=" + data.city : ""}&${
          data?.state ? "property_state=" + data.state : ""
        }&${data?.country ? "property_country=" + data.country : ""}`,
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
          data?.auctionType ? "time=" + data.auctionType : ""
        }&${data?.min_price ? "min_price=" + data.min_price : ""}&${
          data?.max_price ? "max_price=" + data.max_price : ""
        }&${data?.make ? "manufacturer_name=" + data.make : ""}&${
          data?.min_length ? "min_length=" + data.min_length : ""
        }&${data?.max_length ? "max_length=" + data.max_length : ""}&${
          data?.zip ? "property_zip_code=" + data.zip : ""
        }&${data?.city ? "property_city=" + data.city : ""}&${
          data?.state ? "property_state=" + data.state : ""
        }&${data?.country ? "property_country=" + data.country : ""}`,
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

  getMaintenanceStatus() {
    return axios.get(apiUrl + `/api/maintenance`);
  },

  setWinner(id) {
    return axios.put(apiUrl + `/api/auctions/${id}/winner`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  disclaimerAgreement(data) {
    return axios.put(
      apiUrl + `/api/users/${data.userId}/due_diligence/${data.propertyId}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  },
};

export default authService;

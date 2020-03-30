import "core-js/stable";
import "regenerator-runtime/runtime";
import axios from "axios";
import { baseUrl } from "../BaseUrl";
import * as constants from "../Constants";

const postAcceptTerms = async bookingId => {
  let statusResponse;
  const termsUrl = baseUrl + "tandc";
  await axios
    .post(termsUrl, {
      id: bookingId,
      states: "termsaccept"
    })
    .then(res => {
      if (res.status === constants.successStatus) {
        statusResponse = res.status;
      }
    })
    .catch(function(err) {
      if (err.isAxiosError && !err.response) {
        statusResponse = constants.serverUnavailable;
      } else if (err.response.status === constants.badRequestStatus) {
        statusResponse = constants.badRequestStatus;
      }
    });
  return statusResponse;
};

export default postAcceptTerms;

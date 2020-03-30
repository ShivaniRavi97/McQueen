import "core-js/stable";
import "regenerator-runtime/runtime";
import axios from "axios";
import { baseUrl } from "../BaseUrl";
import * as constants from "../Constants";

const uploadAddons = async (bookingId, amount) => {
  let statusResponse;
  bookingId = bookingId.toUpperCase();
  const addonUrl = baseUrl + "extra";
  await axios
    .post(addonUrl, {
      amount: amount,
      id: bookingId
    })
    .then(res => {
      if (res.status === constants.successStatus) {
        statusResponse = res.status;
      } else if (res.status === constants.alreadyReported) {
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

export default uploadAddons;

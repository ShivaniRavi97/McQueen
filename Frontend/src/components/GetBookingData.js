import "core-js/stable";
import "regenerator-runtime/runtime";
import axios from "axios";
import { baseUrl } from "../BaseUrl";
import * as constants from "../Constants";

const getBookingData = async bookingId => {
  let statusResponse;
  bookingId = bookingId.toUpperCase();
  await axios
    .post(baseUrl, {
      bookingid: bookingId
    })
    .then(res => {
      if (res.status === constants.successStatus) {
        statusResponse = res.data[0];
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

export default getBookingData;

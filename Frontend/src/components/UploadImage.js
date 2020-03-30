import "core-js/stable";
import "regenerator-runtime/runtime";
import axios from "axios";
import { baseUrl } from "../BaseUrl";
import * as constants from "../Constants";

const uploadImage = async data => {
  let statusResponse;
  const imageUploadUrl = baseUrl + "upload";
  await axios
    .post(imageUploadUrl, data, {})
    .then(res => {
      if (res.status === constants.successStatus) {
        statusResponse = res.status;
        return statusResponse;
      } else if (res.status === constants.alreadyReported) {
        statusResponse = res.status;
        return statusResponse;
      }
    })
    .catch(err => {
      if (err.isAxiosError && !err.response) {
        statusResponse = constants.serverUnavailable;
      } else if (err.response.status === constants.badRequestStatus) {
        statusResponse = constants.badRequestStatus;
      }
    });
  return statusResponse;
};

export default uploadImage;

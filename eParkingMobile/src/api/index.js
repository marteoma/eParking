import axios from "axios";
import constants from "./constants";

export default () => {
  return axios.create({
    baseURL: `${constants.apiUrl}`
  });
};

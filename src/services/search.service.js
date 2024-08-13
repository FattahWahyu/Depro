/* eslint-disable no-undef */
import axios from "axios";
const Endpoint = process.env.BE_ENDPOINT;

export const search = (keyword, callback) => {
  axios
    .get(`${Endpoint}/products/search/${keyword}`)
    .then((res) => {
      callback(res.data.data.products);
    })
    .catch((err) => {
      console.log(err.message);
      callback(false);
    });
};

/* eslint-disable no-undef */
import axios from "axios";

export const getProducts = (callback) => {
  axios
    .get(`${ process.env.BE_ENDPOINT}/products`)
    .then((res) => {
      callback(res.data.data.products);
    })
    .catch((err) => {
      console.log(err.message);
      callback([]);
    });
};
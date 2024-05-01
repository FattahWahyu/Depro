/* eslint-disable no-undef */
import axios from "axios";

export const getUmkm = (callback) => {
  axios
    .get(`${ process.env.BE_ENDPOINT}/umkm`)
    .then((res) => {
      callback(res.data.data.umkm);
    })
    .catch((err) => {
      console.log(err.message);
      callback([]);
    });
};
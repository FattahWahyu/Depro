/* eslint-disable no-undef */
import axios from "axios";

export const getUmkm = (callback) => {
  axios
    .get(`${process.env.BE_ENDPOINT}/umkm`)
    .then((res) => {
      callback(res.data.data.umkm);
    })
    .catch((err) => {
      console.log(err.message);
      callback([]);
    });
};
export const getContactUmkm = async (id) => {
  try {
    const res = await axios.get(`${process.env.BE_ENDPOINT}/umkm/TMU-NhuOonGQZUftQObL`);
    return res.data.data.umkm.contact;
  } catch (err) {
    console.log(err.message);
    return "Contact not available"; // Mengembalikan string ketika terjadi kesalahan
  }
};
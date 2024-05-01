import axios from "axios";
import accessToken from "./accesToken";

const isHasUmkm = async () => {
  try {
    const token = await accessToken();
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      try {
        const response = await axios.get(`https://c23-gt01-01.et.r.appspot.com/umkm/profile`, config);
        console.log(response)
      } catch (error) {

        return false
      }

      return true;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return false; // Jika 404, kembalikan false
    }
    console.error("Error in isHasUmkm:", error);
  }
  return false; // Jika ada error selain 404 atau token tidak tersedia, kembalikan false
};

export default isHasUmkm;
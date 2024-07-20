import React, { useState, useEffect } from "react";
import Brand from "../components/Elements/Brand";
import accessToken from "../utils/accesToken";
import ErrorPage from "./404";
import axios from "axios";
import { Helmet } from "react-helmet";
import { getProducts } from "../services/product.service";

const ProductList = () => {
  const [notLogin, setNotLogin] = useState(true);
  const [products, setProducts] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await accessToken();
        if (token) {
          setNotLogin(false);
        } else {
          setNotLogin(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await accessToken();
        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await axios.get(
            `https://c23-gt01-01.et.r.appspot.com/umkm/profile`,
            config
          );
          setId(response.data.data.umkm.id);
        } else {
          setNotLogin(true);
        }
      } catch (error) {
        if (error.response.data.data === null) {
          try {
            const token = await accessToken();
            if (token) {
              const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };

              const response = await axios.get(
                `https://c23-gt01-01.et.r.appspot.com/users/profile`,
                config
              );
              if (response.data.data.user.username === "nurrozaaq") {
                getProducts((data) => {
                  setProducts(data);
                });
              }
            } else {
              setNotLogin(true);
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    axios
      .get(`https://c23-gt01-01.et.r.appspot.com/products/umkm/${id}`)
      .then(function (response) {
        setProducts(response.data.data.products);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  if (notLogin) {
    return <ErrorPage />;
  }

  return (
    <>
      <Helmet>
        <title>Rekap Produk | Depro</title>
      </Helmet>
      <div className="flex justify-between items-center p-3">
        <Brand />
        <h1 className="text-center w-full text-2xl my-5 font-bold">
          Rekap Data Produk
        </h1>
        <div className="w-20 h-10"></div>
      </div>
      <div
        className="fixed top-4 right-5 p-4 bg-blue-500 text-white rounded-md print:hidden"
        onClick={() => window.print()}
      >
        Print
      </div>
      <hr className="border-3" />
      <div className="w-full flex justify-center p-5">
        <table className="border-collapse border border-gray-400 w-full">
          <thead>
            <tr className="border border-gray-400">
              <th className="border border-gray-400 p-2">No</th>
              <th className="border border-gray-400 p-2">Nama Produk</th>
              <th className="border border-gray-400 p-2">Gambar</th>
              <th className="border border-gray-400 p-2">Harga</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product, index) => (
                <tr key={product.id} className="border border-gray-400">
                  <td className="border border-gray-400 p-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-400 p-2">{product.name}</td>
                  <td className="border border-gray-400 p-2 flex justify-center">
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="h-10 w-10"
                    />
                  </td>
                  <td className="border border-gray-400 p-2 text-center">
                    Rp {product.price.toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductList;

import HomeLayout from "../components/Layouts/HomeLayouts";
import Products from "../components/Section/Products";
import Umkm from "../components/Section/Umkm";
import React, { useState, useEffect } from "react";
import Loading from "../components/Elements/Loading";
import { getProducts } from "../services/product.service";
import { getUmkm } from "../services/umkm.service";

const ProductList = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getProducts((data) => {
      setTimeout(() => {
        setProducts(data);
      }, 700);
    });
  }, []);

  return (
    <>
      <h1 className="text-center w-full text-2xl my-5">Rekap Data Produk</h1>
      <div
        className="fixed top-4 right-5 p-4 bg-blue-500 text-white rounded-md"
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

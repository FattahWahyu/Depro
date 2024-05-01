import HomeLayout from "../components/Layouts/HomeLayouts";
import FIlter from "../components/Section/Filter";
import Products from "../components/Section/Products";
import Umkm from "../components/Section/Umkm";
import React, { useState, useEffect } from "react";
import Loading from "../components/Elements/Loading";
import { getProducts } from "../services/product.service";
import { getUmkm } from "../services/umkm.service";

const HomePage = () => {
  const [products, setProducts] = useState(null);
  const [umkm, setUmkm] = useState(null);

  useEffect(() => {
    getProducts((data) => {
      setTimeout(() => {
        setProducts(data);
      }, 700);
    });
  }, []);

  useEffect(() => {
    getUmkm((data) => {
      setUmkm(data);
    });
  }, []);

  return (
    <>
      {products && umkm ? (
        <HomeLayout jumbotron={true} nodiv title="Home" home>
          <FIlter />
          <Products data={products} />
          <Umkm umkm={umkm} />
        </HomeLayout>
      ) : (
        <div className="h-screen w-screen flex justify-center items-center">
          <Loading />
        </div>
      )}
    </>
  );
};

export default HomePage;

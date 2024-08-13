import HomeLayout from "../components/Layouts/HomeLayouts";
import Products from "../components/Section/Products";
import Umkm from "../components/Section/Umkm";
import React, { useState, useEffect } from "react";
import Loading from "../components/Elements/Loading";
import { getProducts } from "../services/product.service";
import { getUmkm } from "../services/umkm.service";
import { useParams } from "react-router-dom";
import { search } from "../services/search.service";

const SearchPage = () => {
  const { keyword } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      search(keyword, (data) => {
        if (data) {
          setResult(data);
        }
      });
    }, 50);
  }, [keyword]);

  return (
    <>
      {result ? (
        <HomeLayout  fbBg={'transparent'} nodiv title="Home">
          <div className="mt-36"></div>
          <Products data={result} name={`Hasil Pencarian '${keyword}'`} />
        </HomeLayout>
      ) : (
        <div className="h-screen w-screen flex justify-center items-center">
          <Loading />
        </div>
      )}
    </>
  );
};

export default SearchPage;

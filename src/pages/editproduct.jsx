import HomeLayout from "../components/Layouts/HomeLayouts";
import TopDetail from "../components/Section/TopDetail";
import Resources from "../components/Section/Resources";
import { useParams } from "react-router-dom";
import { getDetail } from "../utils/data";
import Process from "../components/Section/Process";
import Impact from "../components/Section/Impact";
import Produsen from "../components/Section/Produsen";
import axios from 'axios';
import ErrorPage from "./404";
import React, { useState, useEffect } from "react";
import Loading from "../components/Elements/Loading";

const EditProductPage = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    axios.get(`https://c23-gt01-01.et.r.appspot.com/products/${id}`)
      .then(function (response) {
        setProduct(response.data.data.product);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fbBg = scrollPosition > 100 ? 'transparent' : 'transparent';



  useEffect(() => {
    if (product) {
      console.log(product);
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }
  }, [product]);


  // Tampilkan loading jika data belum diambil
  if (loading) {
    return (
      <div className=" h-screen w-screen flex justify-center items-center">
        <Loading />
      </div>
    )
  }

  if (!product) {
    return null;
  }

  return (

    <HomeLayout fbBg={fbBg} title={product.name} >


      <TopDetail
        src={product.image}
        name={product.name}
        price={product.price}
        description={product.description}
      />
      <Resources data={product.resources} select />
      <Process data={product.production} product={product} edited />
      <Impact useSummary data={product.impact} summary={product.contribution} select />
      <Produsen data={product.umkm} />
    </HomeLayout>
  )
}

export default EditProductPage;

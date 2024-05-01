import HomeLayout from "../components/Layouts/HomeLayouts"
import { Link, useParams } from "react-router-dom";
import UmkmImage from "../components/Elements/UmkmImage"
import UmkmSummary from "../components/Elements/UmkmSummary";
import Products from "../components/Section/Products";
import Location from "../components/Section/Location";
import History from "../components/Section/History";
import Impact from "../components/Section/Impact";
import ContactUs from "../components/Section/ContactUs";
import { getDetailUmkm } from "../utils/data";
import ErrorPage from "./404";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from "../components/Elements/Loading";
import Cookies from "js-cookie";
import accessToken from "../utils/accesToken";

const ProfileUmkmPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [notLogin, setNotLogin] = useState(false);
  const [umkm, setUmkm] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await accessToken();
        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };

          const response = await axios.get(`https://c23-gt01-01.et.r.appspot.com/umkm/profile`, config);
          setUmkm(response.data.data.umkm);
        } else {

          setLoading(false)
          setNotLogin(true)
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);




  useEffect(() => {
    if (umkm) {
      axios.get(`https://c23-gt01-01.et.r.appspot.com/products/umkm/${umkm.id}`)
        .then(function (response) {

          setProduct(response.data.data.products);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }, [umkm]);


  useEffect(() => {
    if (umkm) {
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }
  }, [product, umkm]);


  if (loading) {
    return (
      <div className=" h-screen w-screen flex justify-center items-center">
        <Loading />
      </div>
    )
  }

  if (notLogin) {
    return (
      <ErrorPage />
    )
  }


  if (!umkm) {
    return null;
  }

  console.log(umkm);

  return (
    <HomeLayout title={umkm.name}>
      <UmkmImage src={umkm.image} />
      <UmkmSummary logo={umkm.logo} name={umkm.name} description={umkm.description} edited />
      <Products name="Produk" data={product} edited />
      <Location data={umkm.location} />
      <History data={umkm.history} edited />
      <Impact name="UMKM Impact" data={umkm.impact}  edited />
      <ContactUs data={ umkm.contact === null ? null :  umkm.contact[0]} edited />
    </HomeLayout>
  );
}

export default ProfileUmkmPage;
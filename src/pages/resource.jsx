import HomeLayout from "../components/Layouts/HomeLayouts"
import React, { useState, useEffect } from 'react';
import Resources from "../components/Section/Resources";
import accessToken from "../utils/accesToken";
import axios from "axios";
import Loading from "../components/Elements/Loading";
import ErrorPage from "./404";



const ResourcePage = () => {
  const [loading, setLoading] = useState(true);
  const [notLogin, setNotLogin] = useState(false);
  const [resources, setResources] = useState(null);
  


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

          const response = await axios.get(`https://c23-gt01-01.et.r.appspot.com/resources`, config);
          setResources(response.data.data.resources);
        } else {

          setLoading(false)
          setNotLogin(true)
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (resources) {
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }
  }, [resources]);


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


  if (!resources) {
    return null;
  }


  return (
    <HomeLayout title={'Resources'} nodiv>
      <div className="mt-32">
        <Resources data={resources} title="Manajemen Bahan Baku" edited style='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4 mt-4'/>
      </div>
    </HomeLayout>
  );
}

export default ResourcePage;
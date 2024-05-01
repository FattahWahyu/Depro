import React, { useState, useEffect } from "react";
import accessToken from "../../utils/accesToken";
import axios from "axios";
import Loading from "../Elements/Loading";
import { useNavigate, useParams } from "react-router-dom";

const SelectResource = ({ move }) => {
  const { id } = useParams();
  const [resources, setResources] = useState([]);
  const [product, setProduct] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState("Mulai Mengupload");
  const [selectedResources, setSelectedResources] = useState([]);

  useEffect(() => {
    axios.get(`https://c23-gt01-01.et.r.appspot.com/products/${id}`)
      .then(function (response) {
        setProduct(response.data.data.product);
        console.log('product', response.data.data)
        setSelectedResources(
          response.data.data.product.resources.map((resource) => resource.id) || []
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id, statusPost]);

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

          setResources(response.data.data.resources || []);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [statusPost]);

  const handleCheckboxChange = (resourceId) => {
    if (selectedResources.includes(resourceId)) {
      setSelectedResources(selectedResources.filter((id) => id !== resourceId));
    } else {
      setSelectedResources([...selectedResources, resourceId]);
    }
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    setStatusPost('Sedang Mengubah Data');
    event.preventDefault();
    try {
      const token = await accessToken();
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const updatedProductData = {
          image: product.image,
          price: product.price,
          description: product.description,
          name: product.name,
          resources: selectedResources,
          production: product.production,
          impact: product.impact.map(item => item.id),
          contribution: product.contribution,
          category: product.category,
        };

        const response = await axios.put(`https://c23-gt01-01.et.r.appspot.com/products/${id}`, updatedProductData, config);
        alert(response.data.message);

        setLoading(false);
        navigate(0);
      } else {
        console.log("No access token available.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="w-full p-4 ">
      {loading ? (
        <div className="loading-indicator">
          <Loading />
          <h1 className="text-sm font-inter mt-1 text-center">{statusPost}</h1>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-4">

          {resources.map((reso) => {
            const isChecked = selectedResources.includes(reso.id);
            return (
              <div key={reso.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={reso.id}
                  value={reso.id}
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(reso.id)}
                />
                <label htmlFor={reso.id} className="ml-2">{reso.name}</label>
              </div>
            );
          })}
          <div onClick={() => move('Tambah Bahan Baku')}> + Tambah Resources</div>
          <button type="submit" className="bg-[#9f7451] text-white py-2 px-4 rounded-md w-full mt-2 hover:bg-[#886345] md:col-span-2">
            Konfirmasi
          </button>
        </form>
      )}
    </div>
  );
};

export default SelectResource;
import React, { useState, useEffect } from "react";
import accessToken from "../../utils/accesToken";
import axios from "axios";
import Loading from "../Elements/Loading";
import { useNavigate, useParams } from "react-router-dom";

const SelectImpacts = ({ move }) => {
  const { id } = useParams();
  const [impacts, setImpacts] = useState([]);
  const [product, setProduct] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState("Mulai Mengupload");
  const [selectedImpacts, setSelectedImpacts] = useState([]);

  useEffect(() => {
    axios.get(`https://c23-gt01-01.et.r.appspot.com/products/${id}`)
      .then(function (response) {
        setProduct(response.data.data.product);
        console.log('product', response.data.data)
        setSelectedImpacts(
          response.data.data.product.impact.map((impact) => impact.id) || []
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id,statusPost]);

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
          const response = await axios.get(`https://c23-gt01-01.et.r.appspot.com/impacts`, config);

          setImpacts(response.data.data.impacts || []);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [statusPost]);

  const handleCheckboxChange = (impactId) => {
    if (selectedImpacts.includes(impactId)) {
      setSelectedImpacts(selectedImpacts.filter((id) => id !== impactId));
    } else {
      setSelectedImpacts([...selectedImpacts, impactId]);
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
          resources: product.resources.map(item => item.id),
          production: product.production,
          impact:  selectedImpacts,
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

          {impacts.map((imp) => {
            const isChecked = selectedImpacts.includes(imp.id);
            return (
              <div key={imp.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={imp.id}
                  value={imp.id}
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(imp.id)}
                />
                <label htmlFor={imp.id} className="ml-2">{imp.name}</label>
              </div>
            );
          })}
          <div onClick={() => move('Tambah Impact')}> + Tambah Impacts</div>
          <button type="submit" className="bg-[#9f7451] text-white py-2 px-4 rounded-md w-full mt-2 hover:bg-[#886345] md:col-span-2">
            Konfirmasi
          </button>
        </form>
      )}
    </div>
  );
};

export default SelectImpacts;
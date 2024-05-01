import React, { useState, useEffect } from "react";
import accessToken from "../../utils/accesToken";
import axios from "axios";
import Loading from "../Elements/Loading";
import { useNavigate, useParams } from "react-router-dom";

const SelectSummary = ({ move }) => {
  const { id } = useParams();
  const [resources, setResources] = useState([]);
  const [product, setProduct] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState("Mulai Mengupload");
  const [selectedSummary, setSelectedSummary] = useState([]);
  const [summary] = useState([
    {
      id: 1,
      name: 'Minimalisasi Carboon Footprints'
    },
    {
      id: 2,
      name: 'Efisiensi Energi'
    },
    {
      id: 3,
      name: 'Pengelolaan Limbah'
    },
    {
      id: 4,
      name: 'Penggunaan bahan baku lokal'
    },
    {
      id: 5,
      name: 'Efisiensi Air'
    },
    {
      id: 6,
      name: 'Daur Ulang Produk'
    },
    {
      id: 7,
      name: 'Kesejahteraan Pekerja'
    },
    {
      id: 8,
      name: 'Kesehatan dan Keamanan Lingkungan'
    },
  ])


  useEffect(() => {
    axios.get(`https://c23-gt01-01.et.r.appspot.com/products/${id}`)
      .then(function (response) {
        setProduct(response.data.data.product);
        console.log('product', response.data.data)
        setSelectedSummary(
          response.data.data.product.contribution
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id, statusPost]);


  const handleCheckboxChange = (summaryId) => {
    if (selectedSummary.includes(summaryId)) {
      setSelectedSummary(selectedSummary.filter((id) => id !== summaryId));
    } else {
      setSelectedSummary([...selectedSummary, summaryId]);
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
          impact: product.impact.map(item => item.id),
          contribution: [...selectedSummary],
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
  console.log(selectedSummary)
  return (
    <div className="w-full p-4 ">
      {loading ? (
        <div className="loading-indicator">
          <Loading />
          <h1 className="text-sm font-inter mt-1 text-center">{statusPost}</h1>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-4">

          {summary.map((smr) => {
            const isChecked = selectedSummary.includes(smr.id);
            return (
              <div key={smr.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={smr.id}
                  value={smr.id}
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(smr.id)}
                />
                <label htmlFor={smr.id} className="ml-2">{smr.name}</label>
              </div>
            );
          })}
          <button type="submit" className="bg-[#9f7451] text-white py-2 px-4 rounded-md w-full mt-2 hover:bg-[#886345] md:col-span-2">
            Konfirmasi
          </button>
        </form>
      )}
    </div>
  );
};

export default SelectSummary;
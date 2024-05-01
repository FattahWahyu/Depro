import { MdPhotoCamera } from "react-icons/md";
import React, { useState } from 'react';
import Icon from '../Elements/Icon';
import accessToken from "../../utils/accesToken";
import axios from "axios";
import Loading from "../Elements/Loading";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AddProduct = ({ move }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState('');
  const [selectedFile, setSelectedFile] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [fileLocation, setFileLocation] = useState('https://storage.googleapis.com/trackmate_bucket1/assets/images/placeholder.jpg');
  const [fileLocationUpdated, setFileLocationUpdated] = useState(false);


  useEffect(() => {
    console.log('File Location Updated:', fileLocation);
  }, [fileLocation]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleCategoryChange = (event) => {
    const value = parseInt(event.target.value, 10); // Mengonversi nilai ke integer dengan radix 10
    setCategory(value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    const file = selectedFile;

    try {

      if (selectedFile) {
        setStatusPost('Sedang Mengupload Gambar')
        const formData = new FormData();
        formData.append('data', file);


        const token = await accessToken();

        if (token) {
          console.log(file);
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };

          const response = await axios.post('https://c23-gt01-01.et.r.appspot.com/upload/images', formData, config);
          console.log('Server response:', response.data.data.fileLocation);
          setFileLocation(response.data.data.fileLocation);
          console.log('Server response:', response.data.data.fileLocation);
          setFileLocationUpdated(true);

        } else {
          console.log('No access token available.');
        }
      } else {
        setFileLocationUpdated(true);
      }


    } catch (error) {
      console.error('Error uploading image:', error);

    } finally {
      setStatusPost('Upload Gambar Selesai')


    }
  }


  useEffect(() => {
    setStatusPost('Sedang Mengupload Data')
    const fetchData = async () => {
      if (fileLocationUpdated) {
        try {
          setFileLocationUpdated(false);
          let imageLocation = fileLocation;
          console.log([fileLocation]);
          console.log([imageLocation]);

          const token = await accessToken();

          if (token) {
            const config = {
              headers: {
                Authorization: `Bearer ${token}`
              }
            };
            const productData = {
              image: [imageLocation],
              price: price,
              description: description,
              resources: [],
              name: name,
              production: [],
              impact: [],
              contribution: [9],
              category: category
            };

            const response = await axios.post('https://c23-gt01-01.et.r.appspot.com/products', productData, config);
            setStatusPost('Selesai');
            alert(response.data.message);

          } else {
            console.log('No access token available.');
          }
        } catch (error) {
          console.error('Error posting resource:', error);
        } finally {
          setStatusPost('Selesai');
          setLoading(false);
          navigate(0);
        }
      }
    };

    fetchData();
  }, [fileLocationUpdated, fileLocation, price, description, name, category, statusPost, navigate]);

  return (
    <div className="w-full p-4 ">
      {loading ? (
        <div className="loading-indicator">
          <Loading />
          <h1 className='text-sm font-inter mt-1 text-center'>{statusPost}</h1>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='grid gap-4'>
          <div className="mb-4 md:col-span-2">
            <label htmlFor="fileInput" className="block font-semibold mb-1">Gambar</label>
            <div className="w-full h-72 border rounded-md  relative flex justify-center">
              {selectedFile && (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  className="w-fuli-full object-contain rounded-md"
                />
              )}

              <label htmlFor="fileInput" className="w-full border flex justify-center items-center h-full absolute rounded-md cursor-pointer top-0 ">
                {(!selectedFile) && <Icon active><MdPhotoCamera /></Icon>}
              </label>
            </div>
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />

          </div>
          <div className="mb-4 ">
            <label htmlFor="name" className="block font-semibold mb-1 ">Nama Produk</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-4 ">
            <label htmlFor="price" className="block font-semibold mb-1 ">Harga(Rp)</label>
            <input
              type="number"
              min='0'
              id="price"
              value={price}
              onChange={handlePriceChange}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-4 md:col-span-2">
            <label htmlFor="category" className="block font-semibold mb-1">Kategory</label>
            <select
              id="category"
              value={category}
              onChange={handleCategoryChange}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            >
              <option value="">Pilih Kategori</option>
              <option value="1">Agrikultur</option>
              <option value="2">Makanan</option>
              <option value="3">Minuman</option>
            </select>
          </div>


          <div className="mb-4 md:col-span-2">
            <label htmlFor="description" className="block font-semibold mb-1 ">Deskripsi</label>
            <textarea
              type="text"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              className="w-full border rounded-md py-2 px-3 h-32"
              autoComplete="off"
              required
            />
          </div>
          <button type="submit" className="bg-[#9f7451] text-white py-2 px-4 rounded-md w-full mt-2 hover:bg-[#886345] md:col-span-2">
            Konfirmasi
          </button>

        </form>)}
    </div>

  );
};

export default AddProduct;
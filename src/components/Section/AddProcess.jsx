import { MdPhotoCamera } from "react-icons/md";
import React, { useState } from 'react';
import Icon from '../Elements/Icon';
import accessToken from "../../utils/accesToken";
import axios from "axios";
import Loading from "../Elements/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const AddProcess = ({ move }) => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState('Mulai Mengupload');
  const [selectedFile, setSelectedFile] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fileLocation, setFileLocation] = useState('https://storage.googleapis.com/trackmate_bucket1/assets/images/placeholder.jpg');
  const [fileLocationUpdated, setFileLocationUpdated] = useState(false);
  const [product, setProduct] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  useEffect(() => {
    axios.get(`https://c23-gt01-01.et.r.appspot.com/products/${id}`)
      .then(function (response) {
        setProduct(response.data.data.product);
        console.log('product', response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

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
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };

          const response = await axios.post('https://c23-gt01-01.et.r.appspot.com/upload/images', formData, config);
          console.log('Server response:', response.data.data.fileLocation);
          setFileLocation(response.data.data.fileLocation);
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
      setStatusPost('Sedang Mengupload Data')


    }
  };
  useEffect(() => {
    setStatusPost('Sedang Mengupload Data')
    const fetchData = async () => {
      if (fileLocationUpdated) {
        setFileLocationUpdated(false);
        try {
          let imageLocation = fileLocation; // Ambil lokasi gambar dari respons upload

          const token = await accessToken();

          if (token) {
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };

            const processData = {
              image: imageLocation,
              description: description,
              name: name,
            };

            const updatedProductData = {
              image: product.image,
              price: product.price,
              description: product.description,
              name: product.name,
              resources: product.resources.map(item => item.id),
              production: [...product.production, processData],
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
          console.error('Error posting resource:', error);
        } finally {
          setStatusPost('Selesai')
          setLoading(false)
          navigate(0);
        }
      }
    };

    fetchData();
  }, [fileLocationUpdated, fileLocation, description, name, statusPost, navigate, product, id]);


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
          <div className="mb-4 md:col-span-2">
            <label htmlFor="name" className="block font-semibold mb-1 ">Nama Process</label>
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


          <div className="mb-4 md:col-span-2">
            <label htmlFor="description" className="block font-semibold mb-1">Deskripsi</label>
            <textarea
              type="text"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              className="w-full border rounded-md py-2 px-3 h-72"
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

export default AddProcess;
import { MdPhotoCamera } from "react-icons/md";
import React, { useState } from 'react';
import Icon from '../Elements/Icon';
import accessToken from "../../utils/accesToken";
import axios from "axios";
import Loading from "../Elements/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const EditImpact = ({ id }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState('Mulai Mengupload');
  const [selectedFile, setSelectedFile] = useState(false);
  const [fileLocation, setFileLocation] = useState('https://storage.googleapis.com/trackmate_bucket1/assets/images/placeholder.jpg');
  const [fileLocationUpdated, setFileLocationUpdated] = useState(false);
  const [impacts, setImpacts] = useState(false);
  const [description, setDescription] = useState('');
  const [nameImpact, setNameImpact] = useState('');


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      setFileLocation(URL.createObjectURL(file));
    } else {
      setFileLocation('https://storage.googleapis.com/trackmate_bucket1/assets/images/placeholder.jpg');
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleNameImpactChange = (event) => {
    setNameImpact(event.target.value);
  };


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

          const response = await axios.get(`https://c23-gt01-01.et.r.appspot.com/impacts/${id}`, config);
          setImpacts(response.data.data.impact);
          console.log(response.data.data.impact)
          if (response.data.data.impact.image !== null) {
            setFileLocation(response.data.data.impact.image);
            setDescription(response.data.data.impact.description);
            setNameImpact(response.data.data.impact.name);
          }
        } else {
          console.log('No access token available.');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
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
          let imageLocation = fileLocation;

          const token = await accessToken();

          if (token) {
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };



            const updatedImpactData = {
              image: imageLocation,
              description: description,
              name: nameImpact,
            };

            const response = await axios.put(`https://c23-gt01-01.et.r.appspot.com/impacts/${id}`, updatedImpactData, config);
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
        }
      }
    };

    fetchData();
  }, [fileLocationUpdated, fileLocation, statusPost, navigate, id, description, nameImpact]);


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
            <label htmlFor="fileInput" className="block font-semibold mb-1">Banner</label>
            <div className="w-full h-72 border rounded-md relative flex justify-center">
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  className="w-full h-full object-contain rounded-md"
                />
              ) : (
                <img
                  src={fileLocation}
                  alt="Preview"
                  className="w-full h-full object-contain rounded-md"
                />
              )}
              <label htmlFor="fileInput" className="w-full border flex justify-center items-center h-full absolute rounded-md cursor-pointer top-0 ">
                {/* {(!selectedFile) && <Icon active><MdPhotoCamera /></Icon>} */}
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
            <label htmlFor="nameUmkm" className="block font-semibold mb-1 text-left ">Nama UMKM</label>
            <input
              type="text"
              id="nameUmkm"
              value={nameImpact}
              onChange={handleNameImpactChange}
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
              className="w-full border rounded-md py-2 px-3 h-48"
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

export default EditImpact;
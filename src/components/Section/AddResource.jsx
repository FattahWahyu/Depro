import { MdPhotoCamera } from "react-icons/md";
import React, { useState, useEffect } from 'react';
import MapPicker from '../Elements/MapPicker';
import Icon from '../Elements/Icon';
import accessToken from "../../utils/accesToken";
import axios from "axios";
import Loading from "../Elements/Loading";
import { useNavigate } from "react-router-dom";

const AddResource = ({ move }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState('Mulai Mengupload');
  const [selectedFile, setSelectedFile] = useState(false);
  const [name, setName] = useState('');
  const [umkm, setUmkm] = useState(null);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [position, setPosition] = useState({ lat: -6.2088, lng: 106.8456 });
  const [fileLocation, setFileLocation] = useState('https://storage.googleapis.com/trackmate_bucket1/assets/images/placeholder.jpg');
  const [fileLocationUpdated, setFileLocationUpdated] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleUmkmChange = (event) => {
    setUmkm(event.target.value);
  };

  const handleLatChange = (event) => {
    const lat = parseFloat(event.target.value);
    setPosition({
      ...position,
      lat: isNaN(lat) ? 0 : lat, // Menetapkan nilai 0 jika input tidak valid atau kosong
    });
  };

  const handleLngChange = (event) => {
    const lng = parseFloat(event.target.value);
    setPosition({
      ...position,
      lng: isNaN(lng) ? 0 : lng, // Menetapkan nilai 0 jika input tidak valid atau kosong
    });
  };


  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleMapClick = (event) => {
    setPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
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

    }
  };


  useEffect(() => {
    setStatusPost('Sedang Mengupload Data')
    const fetchData = async () => {
      if (fileLocationUpdated) {

        try {
          setFileLocationUpdated(false);
          setStatusPost('Sedang Mengupload Data')
          let imageLocation = fileLocation; // Ambil lokasi gambar dari respons upload

          const token = await accessToken();

          if (token) {
            const config = {
              headers: {
                Authorization: `Bearer ${token}`
              }
            };
            const resourceData = {
              name: name,
              image: imageLocation,
              location: {
                lat: position.lat,
                lng: position.lng,
                name: location
              },
              umkm: umkm,
              description: description
            };

            const response = await axios.post('https://c23-gt01-01.et.r.appspot.com/resources', resourceData, config);
            setStatusPost('Selesai')
            alert(response.data.message);
          } else {
            console.log('No access token available.');
          }
        } catch (error) {
          console.error('Error posting resource:', error);
        } finally {
          setStatusPost('Mulai Mengupload')
          setLoading(false)
          navigate(0);
        }
      }
    };

    fetchData();
  }, [fileLocationUpdated, fileLocation, description, name, statusPost, navigate, position.lat, position.lng, location, umkm]);


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
            <label htmlFor="name" className="block font-semibold mb-1 ">Nama Bahan Baku</label>
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


          <div className='mb-4 md:col-span-2'>
            <label htmlFor="map" className="block font-semibold mb-1">Lokasi</label>
            <MapPicker id="map" handleGet={handleMapClick} position={position} />
          </div>

          <div className="mb-4 ">
            <label htmlFor="lat" className="block font-semibold mb-1">Latitude</label>
            <input
              type="text"
              id="lat"
              value={position.lat}
              onChange={handleLatChange}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lng" className="block font-semibold mb-1">Longitude</label>
            <input
              type="text"
              id="lng"
              value={position.lng}
              onChange={handleLngChange}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-4 md:col-span-2">
            <label htmlFor="location" className="block font-semibold mb-1">Alamat</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={handleLocationChange}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-4 md:col-span-2">
            <label htmlFor="umkm" className="block font-semibold mb-1">UMKM (Optional)</label>
            <input
              type="text"
              id="umkm"
              value={umkm}
              onChange={handleUmkmChange}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
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

export default AddResource;
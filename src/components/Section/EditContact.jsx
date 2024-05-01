import { MdPhotoCamera } from "react-icons/md";
import React, { useState } from 'react';
import Icon from '../Elements/Icon';
import accessToken from "../../utils/accesToken";
import axios from "axios";
import Loading from "../Elements/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const EditContact = ({ move }) => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState('Mulai Mengupload');
  const [email, setEmail] = useState('');
  const [noHP, setNoHP] = useState('');
  const [noWA, setNoWA] = useState('');
  const [isWA, setIsWA] = useState(false);
  const [umkm, setUmkm] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCheckboxChange = () => {
    setIsWA(!isWA)
  };

  const handleNoHPChange = (event) => {
    const input = event.target.value;
    // Menggunakan regex untuk memeriksa hanya angka yang dimasukkan
    const regex = /^[0-9]*$/;

    // Jika nilai yang dimasukkan sesuai dengan regex atau kosong, maka setNilaiNoHP akan diupdate
    if (input === '' || regex.test(input)) {
      setNoHP(input);
    }
  };

  const handleNoWAChange = (event) => {
    const input = event.target.value;
    // Menggunakan regex untuk memeriksa hanya angka yang dimasukkan
    const regex = /^[0-9]*$/;

    // Jika nilai yang dimasukkan sesuai dengan regex atau kosong, maka setNilaiNoWA akan diupdate
    if (input === '' || regex.test(input)) {
      setNoWA(input);
    }
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

          const response = await axios.get(`https://c23-gt01-01.et.r.appspot.com/umkm/profile`, config);
          setUmkm(response.data.data.umkm);
          if (response.data.data.umkm.contact !== null) {
            setEmail(response.data.data.umkm.contact[0].email);
            setIsWA(response.data.data.umkm.contact[0].phone.isWhatsApp);
            setNoHP(response.data.data.umkm.contact[0].phone.phoneNumber);

            if (!response.data.data.umkm.contact[0].phone.isWhatsApp) {
              setNoWA(response.data.data.umkm.contact[0].phone.waNumber);
            } else {
              setNoWA('');
            }

          }
        } else {
          console.log('No access token available.');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    setStatusPost('Sedang Mengupload Data')
    try {
      const fetchData = async () => {

        const token = await accessToken();

        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };


          const phoneData = {
            isWhatsApp: isWA,
            phoneNumber: noHP,
            waNumber: noWA
          }


          const contactData =
            [
              {
                email: email,
                phone: phoneData
              }

            ]


          const updatedUmkmData = {
            image: umkm.image,
            logo: umkm.logo,
            history: umkm.history,
            description: umkm.description,
            employe: umkm.employe,
            impact: umkm.impact,
            name: umkm.name,
            location: umkm.location,
            contact: contactData,
          };

          const response = await axios.put(`https://c23-gt01-01.et.r.appspot.com/umkm`, updatedUmkmData, config);
          alert(response.data.message);

          setLoading(false);
          navigate(0);
        } else {
          console.log("No access token available.");
        }

      }
      fetchData();
    } catch (error) {
      console.error(error)
    }

  };



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
            <label htmlFor="email" className="block font-semibold mb-1 text-left ">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-4 md:col-span-2">
            <label htmlFor="noHP" className="block font-semibold mb-1 text-left  ">Nomor Telepon</label>

            <input
              type="text"
              id="noHP"
              value={noHP}
              onChange={handleNoHPChange}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />

            <div className="flex items-center pt-2">
              <input
                type="checkbox"
                id='isWA'
                value={isWA}
                checked={isWA}
                onChange={handleCheckboxChange}
              />
              <label htmlFor='isWA' className="ml-2">Ini nomor Whatsapp</label>
            </div>
          </div>
          {!isWA &&
            <div className="mb-4 md:col-span-2">
              <label htmlFor="noWA" className="block font-semibold mb-1 text-left  ">Whatsapp</label>
              <input
                type="text"
                id="noWA"
                value={noWA}
                onChange={handleNoWAChange}
                className="w-full border rounded-md py-2 px-3"
                autoComplete="off"
                required
              />
            </div>
          }
          <button type="submit" className="bg-[#9f7451] text-white py-2 px-4 rounded-md w-full mt-2 hover:bg-[#886345] md:col-span-2">
            Konfirmasi
          </button>

        </form>)}
    </div>

  );
};

export default EditContact;
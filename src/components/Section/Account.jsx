import { FaHandHoldingHeart } from "react-icons/fa";
import { BsStack } from "react-icons/bs";
import { MdStore } from "react-icons/md";
import { AiFillShop } from "react-icons/ai";
import { MdAddBusiness, MdBusiness } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../Elements/Loading';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import isHasUmkm from '../../utils/isHasUmkm';
import Dashboard from './Dashboard';
import accessToken from '../../utils/accesToken';
import ErrorPage from '../../pages/404';
import Icon from '../Elements/Icon';


const Account = ({ move }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [hasUmkm, setHasUmkm] = useState('');
  const [notLogin, setNotLogin] = useState(false);
  const [profile, setProfile] = useState(null);
  const [statusLoading, setStatusLoading] = useState("Loading");


  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const check = await isHasUmkm();

        (check) ? setHasUmkm(true) : setHasUmkm(false)
      } catch (error) {
        console.error("Error fetching data:", error);
        setHasUmkm(false)
      } finally {
        setLoading(false)
      }

    }

    fetchData();
  }, []);

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

          const response = await axios.get(`https://c23-gt01-01.et.r.appspot.com/users/profile`, config);
          setProfile(response.data.data.user);

          setLoading(false);
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


  if (notLogin) {
    return (
      <ErrorPage />
    )
  }




  const handleLogout = async () => {
    setLoading(true);
    const refreshToken = Cookies.get('refreshToken');
    Cookies.remove("refreshToken");
    setStatusLoading('Sedang Logout');
    try {
      const response = await axios({
        method: 'delete',
        url: 'https://c23-gt01-01.et.r.appspot.com/authentications',
        data: { refreshToken }
      });

      console.log(response.data);
      setStatusLoading('Logout berhasil!');
      alert('Logout berhasil!');
      move('Login')

    } catch (error) {
      console.error('Error:', error);
      alert('Logout berhasil!');
      move('Login')
    } finally {
      setStatusLoading('Loading');
      setLoading(false); // Mengubah state loading menjadi false setelah proses selesai, baik berhasil maupun gagal
    }

  };

  return (
    <div className="w-full p-4 ">
      {loading ? (
        <div className="loading-indicator">
          <Loading />
          <h1 className='text-sm font-inter mt-1 text-center'>{statusLoading}</h1>
        </div>
      ) : (
        <div className='grid sm:grid-cols-2 gap-4 -mt-4'>
          {

            profile !== null && hasUmkm !== '' && <Dashboard data={profile} umkm={hasUmkm} />
          }

          {hasUmkm ?
            <>
              <Link to={'/umkm/profile'} className=" h-32 font-inter outline py-2 px-4 rounded-md mt-2 hover:scale-105 flex flex-col justify-around ">
                <Icon active>
                  <MdStore />
                </Icon>
                Manajemen UMKM
              </Link>
              <Link to={'/umkm/resource'} className=" h-32 font-inter outline py-2 px-4 rounded-md mt-2 hover:scale-105 flex flex-col justify-around ">
                <Icon active>
                  <BsStack />
                </Icon>
                Manajemen Bahan Baku
              </Link>
              <Link to={'/umkm/impact'} className=" h-32 font-inter outline py-2 px-4 rounded-md mt-2 hover:scale-105 flex flex-col justify-around ">
                <Icon active>
                  <FaHandHoldingHeart />
                </Icon>
                Manajemen Impact
              </Link>
            </>
            :
            <div onClick={() => move('Registrasi UMKM')} className=" h-32 font-inter outline py-2 px-4 rounded-md mt-2 hover:scale-105 flex flex-col justify-around ">
              <Icon active>
                <MdAddBusiness />
              </Icon>
              Buat UMKM
            </div>
          }

          <div className="h-32 font-inter outline py-2 px-4 rounded-md mt-2 hover:scale-105 flex flex-col justify-around " onClick={handleLogout}>
            <Icon active>
              <MdLogout />
            </Icon>
            Logout
          </div>
        </div>
      )}

    </div>

  );
};

export default Account;
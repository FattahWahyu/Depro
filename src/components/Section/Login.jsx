import React, { useState } from 'react';
import axios from 'axios';
import Loading from '../Elements/Loading';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const Login = ({ move }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isFilled, setIsFilled] = useState(false);
  const [statusLoading, setStatusLoading] = useState("Sedang Login");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    checkIsFilled(event.target.value, password);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    checkIsFilled(username, event.target.value);

  };

  const checkIsFilled = (usernameValue, passwordValue) => {
    if (usernameValue.trim() !== '' && passwordValue.trim() !== '') {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  };

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginData = {
        username,
        password
      };
      const response = await axios.post('https://c23-gt01-01.et.r.appspot.com/authentications', loginData);

      const accessToken = response.data.data.accessToken;
      const refreshToken = response.data.data.refreshToken;

      const refreshTokenExpires = new Date();
      refreshTokenExpires.setDate(refreshTokenExpires.getDate() + 7);

      const accessTokenExpires = new Date();
      accessTokenExpires.setSeconds(accessTokenExpires.getSeconds() + 100);

      Cookies.set("refreshToken", refreshToken, { expires: refreshTokenExpires });
      Cookies.set('accessToken', accessToken, { expires: accessTokenExpires });

      setStatusLoading(response.data.message);


    } catch (error) {
      console.error('Error:', error);
      setStatusLoading(error.response.data.message);
    }


  }


  useEffect(() => {
    if (statusLoading === 'Login berhasil') {
      setTimeout(() => {
        setLoading(false);
        move('Account')
      }, 1500);
    } else if (statusLoading === 'Username / Password Salah') {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [move, statusLoading]);


  return (
    <div className="w-full mx-auto p-4">
      {loading ? (
        <div className="loading-indicator">
          <Loading />
          <h1 className='text-sm font-inter mt-1 text-center'>{statusLoading}</h1>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block font-semibold mb-1">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="w-full border rounded-md py-2 px-3"

              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full border rounded-md py-2 px-3"

              required
            />
          </div>
          <button type="submit" className={`${isFilled ? 'bg-[#886345]' : 'bg-[#BBB]'} text-white py-2 px-4 rounded-md w-full mt-2  ${isFilled && 'hover:bg-[#6f5138]'}`} disabled={!isFilled}>
            Login
          </button>

          <h2 onClick={() => move('Register')} className='text-sm text-[#BBB]  font-inter mt-4 text-center hover:text-[#886345]'>Belum punya akun? Daftar</h2>
        </form>
      )}
    </div>

  );
};

export default Login;
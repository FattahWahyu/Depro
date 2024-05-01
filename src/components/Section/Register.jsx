import axios from 'axios';
import React, { useState } from 'react';

const Register = ({ move }) => {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const handleFullnameChange = (event) => {
    setFullname(event.target.value);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword2Change = (event) => {
    setPassword2(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password == password2) {
      const userData = {
        fullname,
        username,
        email,
        password,
      };
      console.log(userData);

      try {
        const response = await axios.post('https://c23-gt01-01.et.r.appspot.com/users', userData);
        alert(response.data.message)
        move('Login')
      } catch (error) {
        alert(error.response.data.message)
      }
    } else {
      alert('Konfirmasi password tidak sama')
    }

  };
  return (
    <div className="w-full p-4 ">
      <form onSubmit={handleSubmit} className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div className="mb-4 sm:col-span-2 ">
          <label htmlFor="fullname" className="block font-semibold mb-1 ">Fullname</label>
          <input
            type="text"
            id="fullname"
            value={fullname}
            onChange={handleFullnameChange}
            className="w-full border rounded-md py-2 px-3"
            autoComplete="off"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block font-semibold mb-1">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="w-full border rounded-md py-2 px-3"
            autoComplete="off"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-1">Email</label>
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
        <div className="mb-4">
          <label htmlFor="password" className="block font-semibold mb-1">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full border rounded-md py-2 px-3"
            autoComplete="off"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password2" className="block font-semibold mb-1">Confirm Password</label>
          <input
            type="password2"
            id="password2"
            value={password2}
            onChange={handlePassword2Change}
            className="w-full border rounded-md py-2 px-3"
            autoComplete="off"
            required
          />
        </div>
        <button type="submit" className="bg-[#BBB] text-white py-2 px-4 rounded-md w-full mt-2 hover:bg-[#886345] sm:col-span-2">
          Register
        </button>

        <h2 onClick={move} className='text-sm text-[#BBB] font-inter mt-4 text-center hover:text-[#886345] sm:col-span-2'>Sudah Punya Akun? Login</h2>
      </form>
    </div>

  );
};

export default Register;
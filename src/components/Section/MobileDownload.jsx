import { HiOutlineArrowSmRight } from "react-icons/hi"; 
import { MdPhoneIphone } from "react-icons/md";
import React from 'react';
import Icon from '../Elements/Icon';
import logo from '../../assets/img/tr-logo.png'

const MobileDownload = () => {


  return (
    <div className="w-full p-4 ">
      <div className="mb-4 md:col-span-2 overflow-hidden flex justify-center" >
        <Icon active>
          <img src={logo} alt="" className="w-11 mr-1" />
        </Icon>
        <Icon active><HiOutlineArrowSmRight />
        </Icon>
        <Icon active>
          <MdPhoneIphone />
        </Icon>
      </div>

      <div className="mb-4 md:col-span-2 overflow-hidden" >
        <h1 className='font-inter'>Download Mobile App untuk menikmati fitur lebih lengkap</h1>
        <ul className='font-inter list-disc translate-x-6'>
          <li className='font-inter'>Filter Kategori</li>
          <li className='font-inter'>Pencarian Produk</li>
          <li className='font-inter'>Rekomendasi Produk</li>
          <li className='font-inter'>Scanner yang lebih cepat</li>
        </ul>

      </div>



      <a href='https://github.com/C23-GT01/android-app/releases/download/Final-Deliverables/trackmate-1.0.apk' className="block text-center bg-[#9f7451] text-white py-2 px-4 rounded-md w-full  hover:bg-[#886345] md:col-span-2 mt-4">
        Download Now!
      </a>
    </div>

  );
};

export default MobileDownload;
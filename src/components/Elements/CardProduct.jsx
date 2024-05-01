import { MdQrCode } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import placeholder from '../../assets/img/placeholder.jpg'
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from 'react-router-dom';
import Icon from './Icon';
import accessToken from "../../utils/accesToken";
import axios from "axios";
import Loading from "./Loading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalLayout from "../Layouts/ModalLayouts";
import QRCodeGenerator from "../Elements/qr";

const CardProduct = ({ id, image, name, price, edited = false }) => {
  const navigate = useNavigate();
  const [loadingDelete, setLoadingDelete] = useState(false);

  const deleteProductHandle = async (event, id) => {
    event.stopPropagation();
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus produk ini?');
    if (confirmDelete) {
      setLoadingDelete(true);
      try {
        const token = await accessToken();
        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
          const response = await axios.delete(`https://c23-gt01-01.et.r.appspot.com/products/${id}`, config);
          alert(response.data.message);
          setLoadingDelete(false);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      } finally {
        navigate(0);
      }
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState('Account');

  const handleOpenModal = (val = "QR Code") => {
    setContentModal(val);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let modalContent = null;

  if (contentModal === 'QR Code') {
    modalContent = <QRCodeGenerator id={id} />;
  }



  return (


    <div className={`w-full h-full relative rounded-xl overflow-hidden flex flex-col ${(!edited) && 'hover:scale-105'} bg-white rounded-2xl shadow-lg`} >
      {loadingDelete && (
        <div className="loading-indicator">
          <Loading />
          <h1 className='text-sm font-inter mt-1 text-center'>Sedang Menghapus Produk</h1>
        </div>
      )}
      {!loadingDelete && (
        <>
          <Link to={`/product/${id}`} className="absolute bg-transparant w-full h-56 top-0" >
          </Link>
          <LazyLoadImage src={image[0]} placeholderSrc={placeholder} className="w-full h-56 object-cover" alt="img" />
          {edited && (
            <div className='w-full justify-between flex gap-2 py-2 px-2 -mb-4'  >
              <Icon size="w-6 h-6" ><MdQrCode onClick={() => handleOpenModal()} /></Icon>
              <div className="flex">
                <Link to={`/product/edit/${id}`} >
                  <Icon size="w-6 h-6" ><MdEdit  /></Icon>
                </Link>
                <Icon size="w-6 h-6" ><MdDelete onClick={(event) => deleteProductHandle(event, id)} /></Icon>
              </div>
            </div>
          )}
          <Link to={`/product/${id}`} className="text-black">
            <div className="flex py-4 justify-between items-start p-2">
              <h1 className="font-h1 text-sm font-inter">{name}</h1>
              {(price > 0) && <h1 className="font-h1 text-sm font-inter text-[#886345]">{price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</h1>}
            </div>
          </Link>
        </>
      )}
      {
        (isModalOpen) && <ModalLayout title={contentModal} onClose={handleCloseModal} >
          {modalContent}
        </ModalLayout>
      }
    </div>
  );
};

export default CardProduct;
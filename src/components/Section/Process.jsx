import { MdClear } from "react-icons/md";
import CardProcess from "../Elements/CardProcess";
import Section from "./Index";
import AddBox from "../Elements/AddBox";
import ModalLayout from "../Layouts/ModalLayouts";
import { useState } from "react";
import AddProcess from "./AddProcess";
import Icon from "../Elements/Icon";
import accessToken from "../../utils/accesToken";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Elements/Loading";


const Process = ({ data, edited = false, product = null }) => {


  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState("Account");
  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState('Mulai Mengupload');

  const handleOpenModal = (val = "Tambah Proses") => {
    setContentModal(val);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let modalContent = null;

  if (contentModal === "Tambah Proses") {
    modalContent = <AddProcess />;
  }


  const deleteProcessHandle = async (event, id) => {
    event.stopPropagation();
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus Proses');
    if (confirmDelete) {
      setLoading(true);
      const token = await accessToken();
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const updatedProductData = {
          image: product.image,
          price: product.price,
          description: product.description,
          name: product.name,
          resources: product.resources.map(item => item.id),
          production: [],
          impact: product.impact.map(item => item.id),
          contribution: product.contribution,
          category: product.category,
        };

        const response = await axios.put(`https://c23-gt01-01.et.r.appspot.com/products/${product.id}`, updatedProductData, config);
        alert(response.data.message);

        setLoading(false);
        navigate(0);
      } else {
        console.log("No access token available.");
      }
    }
  };

  return (
    <Section title="Proses Produksi">
      {loading ? (
        <div className="loading-indicator">
          <Loading />
          <h1 className='text-sm font-inter mt-1 text-center'>{statusPost}</h1>
        </div>
      ) : (<>
        <>
          {
            (edited) && (data.length >0) &&
            <div className="flex justify-end">
              <div className="flex items-center bg-[#886345] font-inter text-white font-bold w-fit px-2 rounded-2xl text-xl hover:bg-[#71533a] hover:animate-pulse drop-shadow-2xl" onClick={deleteProcessHandle}>
                <Icon nonactive>
                  <MdClear />
                </Icon>
                Kosongkan
              </div></div>
          }
        </>
        <div className="flex mt-4">
          <div className="md:w-2 w-1 h-[1] box-border md:pt-32 md:pb-24 translate-x-[50px] pt-32  md:translate-x-[100px] ">
            <div className="w-full h-full bg-[#886345]"></div>
          </div>
          <div>

            {
              data.length > 0
                ? (
                  data.map((process, index) => (
                    <CardProcess key={index} name={process.name} description={process.description} src={process.image} />
                  ))
                )
                : (!edited) && (<p className="menu-list__empty">Belum Ada</p>)
            }
            {edited && <AddBox openModal={() => handleOpenModal()} />}
            {isModalOpen && (
              <ModalLayout title={contentModal} onClose={handleCloseModal}>
                {modalContent}
              </ModalLayout>
            )}
          </div>
        </div>
      </>)}

    </Section>
  );
};

export default Process;
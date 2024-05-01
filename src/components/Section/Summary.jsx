import CardSummary from "../Elements/ItemSummary";
import ModalLayout from "../Layouts/ModalLayouts";
import { useState } from "react";
import SelectSummary from "./SelectSummary";

const Summary = ({ data, edited = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState("Account");



  const handleOpenModal = (val = "Pilih Kontribusi") => {
    setContentModal(val);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let modalContent = null;

  if (contentModal === "Pilih Kontribusi") {
    modalContent = <SelectSummary />;
  } 


  return (
    <div className="py-4 xl:px-0 p-4 bg-white mt-12">
      <h1 className="font-h1 font-inter text-xl text-center mb-8">Dengan membeli produk ini Anda telah mendukung ...</h1>
      <div className="flex gap-8 flex-wrap justify-start sm:justify-center">
        
        {

          data.length > 0
            ? (
              data.map((code, index) => (
                <CardSummary key={index} code={code} />
              ))
            )
            : (<p className="menu-list__empty">Umkm Indonesia</p>)
        }
        {edited &&
          (
            <div onClick={() =>handleOpenModal()} className="flex gap-2 items-center font-bold ">+ Tambah Kontribusi</div>
          )
        }
        {isModalOpen && (
          <ModalLayout title={contentModal} onClose={handleCloseModal}>
            {modalContent}
          </ModalLayout>
        )}
      </div>
    </div>
  );
};

export default Summary;
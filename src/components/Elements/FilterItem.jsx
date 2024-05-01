import { useState } from "react";
import ModalLayout from "../Layouts/ModalLayouts";
import MobileDownload from "../Section/MobileDownload";


const FilterItem = ({ children, image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState("Account");

  const handleOpenModal = (val = "Download Mobile App") => {
    setContentModal(val);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let modalContent = null;

  if (contentModal === "Download Mobile App") {
    modalContent = <MobileDownload />
  }

  return (
    <>
      <div className="flex flex-col items-center gap-2 w-[100px]" onClick={() => handleOpenModal()}>
        <div className="rounded-full w-[110px] h-[110px] ">
          <img src={image} alt="" />
        </div>
        <h3 className="font-inter font-semibold w-full text-center">{children}</h3>
      </div>
      {isModalOpen && (
        <ModalLayout title={contentModal} onClose={handleCloseModal}>
          {modalContent}
        </ModalLayout>
      )}
    </>
  );
};

export default FilterItem;
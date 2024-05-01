import { useState } from "react";
import Pencil from "./Pencil";
import EditHistory from "../Section/EditHistory";
import ModalLayout from "../Layouts/ModalLayouts";

const HistoryBox = ({ image, text, edited = false }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contentModal, setContentModal] = useState("Account");

    const handleOpenModal = (val = "Edit Sejarah") => {
        setContentModal(val);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    let modalContent = null;

    if (contentModal === "Edit Sejarah") {
        modalContent = <EditHistory />;
    }


    return (
        <div className="flex gap-5 flex-wrap">
            <img src={image} alt="history umkm" className="w-64 h-64 rounded-2xl drop-shadow-xl" />
            <div className="flex flex-col gap-5">
                <div>{text}

                    {
                        edited &&
                        <span className="mt-5 block w-min">
                            <span className="rounded-full block  hover:outline p-2" onClick={() => handleOpenModal()}><Pencil  /></span>
                        </span>
                    }
                     {isModalOpen && (
                        <ModalLayout title={contentModal} onClose={handleCloseModal}>
                            {modalContent}
                        </ModalLayout>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HistoryBox;
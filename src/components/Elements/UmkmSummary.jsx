import Pencil from "./Pencil";
import ModalLayout from "../Layouts/ModalLayouts";
import { useState } from "react";
import EditBanner from "../Section/EditBanner";
import EditUmkmSummary from "../Section/EditUmkmSummary";

const UmkmSummary = ({ logo, name = '...', description = '...', edited = false }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contentModal, setContentModal] = useState("Account");

    const handleOpenModal = (val = "Edit Banner") => {
        setContentModal(val);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    let modalContent = null;

    if (contentModal === "Edit Banner") {
        modalContent = <EditBanner move={handleOpenModal} />
    } else if (contentModal === "Edit Info UMKM") {
        modalContent = <EditUmkmSummary move={handleOpenModal} />
    }



    return (
        <div className="bg-white py-4 xl:px-0 p-4">
            <div className="max-w-[1240px] mx-auto flex gap-4 flex-wrap sm:flex-nowrap ">
                <img src={logo} alt="" className="w-[130px] h-[130px] rounded-full" />
                <div className="w-full">
                    <h1 className="font-h1 text-2xl font-inter flex gap-2 w-full items-center justify-between">{name}
                        {(edited) &&
                            <div className="rounded-full  hover:outline p-2" onClick={() => handleOpenModal()}>
                                <Pencil />
                            </div>}
                    </h1>
                    <p className="font-inter text-justify">{description}</p>
                </div>
            </div>
            {isModalOpen && (
                <ModalLayout title={contentModal} onClose={handleCloseModal}>
                    {modalContent}
                </ModalLayout>
            )}
        </div>

    );
}

export default UmkmSummary;
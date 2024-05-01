import ContactBox from "../Elements/ContactBox";
import Section from "./Index";
import Pencil from "../Elements/Pencil";
import { useState } from "react";
import EditContact from "./EditContact";
import ModalLayout from "../Layouts/ModalLayouts";

const ContactUs = ({ data, edited = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState("Account");

  const handleOpenModal = (val = "Edit Contact") => {
    setContentModal(val);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let modalContent = null;

  if (contentModal === "Edit Contact") {
    modalContent = <EditContact />;
  }




  let wa = false;
  let phone = false;
  if (data !== null) {
    if (data.phone.isWhatsApp) {
      wa = data.phone.phoneNumber;
    } else {
      wa = data.phone.waNumber;
      phone = data.phone.phoneNumber
    }
  }


  return (
    <Section title="Contact UMKM" titlecenter >

      {
        data !== null
          ? <ContactBox email={data.email} phone={phone} wa={wa} />
          : !edited && <p className="menu-list__empty">Belum Ada</p>
      }
      {
        edited === true &&
        <span className="rounded-full block w-min  hover:outline p-2 absolute top-0 right-0" onClick={() => handleOpenModal()} ><Pencil /></span>
      }
      {isModalOpen && (
        <ModalLayout title={contentModal} onClose={handleCloseModal}>
          {modalContent}
        </ModalLayout>
      )}

    </Section>
  )
}

export default ContactUs;
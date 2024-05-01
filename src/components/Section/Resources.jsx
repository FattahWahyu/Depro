import CardResource from "../Elements/CardResource";
import Section from "./Index";
import AddBox from "../Elements/AddBox";
import ModalLayout from "../Layouts/ModalLayouts";
import AddResource from "./AddResource";
import { useState } from "react";
import SelectResource from "./SelectResources";

const Resources = ({ data, title = "Bahan Baku", edited = false, select = false, style = "flex gap-4 w-full overflow-auto scrollbar-none py-8" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState("Account");

  const handleOpenModal = (val = "Tambah Bahan Baku") => {
    setContentModal(val);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let modalContent = null;

  if (contentModal === "Tambah Bahan Baku") {
    modalContent = <AddResource />;
  } else if (contentModal === "Pilih Bahan Baku") {
    modalContent = <SelectResource move={handleOpenModal} />;
  }

  return (
    <Section title={title}>
      <div className={style}>
        {edited && <AddBox openModal={() => handleOpenModal()} />}
        {select && <AddBox openModal={() => handleOpenModal("Pilih Bahan Baku")} />}
        {
          data && data.length > 0
            ? data.map((resource, index) =>
              (resource !== null) &&
              <CardResource
                key={index}
                name={resource.name}
                description={resource.description} s
                src={resource.image}
                umkm={resource.umkm || null}
                location={resource.location.name || null}
                lat={resource.location.lat || null}
                lng={resource.location.lng || null}
                edited={edited}
                id={resource.id}
              />)
            : <p className="menu-list__empty">Belum Ada </p>
        }
        {isModalOpen && (
          <ModalLayout title={contentModal} onClose={handleCloseModal}>
            {modalContent}
          </ModalLayout>
        )}
      </div>
    </Section>
  );
};

export default Resources;

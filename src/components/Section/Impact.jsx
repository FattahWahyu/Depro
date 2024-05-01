import CardImpact from "../Elements/CardImpact";
import Section from "./Index";
import Summary from "./Summary";
import AddBox from "../Elements/AddBox";
import ModalLayout from "../Layouts/ModalLayouts";
import { useState } from "react";
import AddImpact from "./AddImpact";
import SelectImpacts from "./SelectImpacts";


const Impact = ({ name = "Produk Impact", useSummary = false, data, summary = false, edited = false, select = false }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState('Account');

  const handleOpenModal = (val = "Tambah Impact") => {
    setContentModal(val);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let modalContent = null;

  if (contentModal === 'Tambah Impact') {
    modalContent = <AddImpact />;
  } else if (contentModal === "Pilih Impact") {
    modalContent = <SelectImpacts move={handleOpenModal} />;
  }

  return (
    <Section title={name}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-8 mt-4">
        {edited && <AddBox openModal={() => handleOpenModal()} />}
        {select && <AddBox openModal={() => handleOpenModal("Pilih Impact")} />}
        {
          (data!=null) && data.length > 0
            ? data.map((impact, index) =>
              (impact !== null) &&
              <CardImpact
                key={index}
                name={impact.name}
                description={impact.description}
                src={impact.image}
                edited={edited}
                id={impact.id}
              />
            )
            : (!select && !edited) && (<p className="menu-list__empty">Belum Ada</p>)
        }
      </div>
      {
        (useSummary) && <Summary data={summary} edited={select} />
      }
      {
        (isModalOpen) && <ModalLayout title={contentModal} onClose={handleCloseModal} >
          {modalContent}
        </ModalLayout>
      }
    </Section>
  );
};

export default Impact;
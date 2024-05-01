import AddBox from "../Elements/AddBox";
import CardProduct from "../Elements/CardProduct";
import Section from "./Index";
import ModalLayout from "../Layouts/ModalLayouts";
import { useState } from "react";
import AddProduct from "./AddProduct";

const Products = ({ name = "Semua Produk", data, edited = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState('Account');

  const handleOpenModal = () => {
    setContentModal('Tambah Produk')
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

  };

  let modalContent = null;

  if (contentModal === 'Tambah Produk') {
    modalContent = <AddProduct />;
  }

  return (
    <Section title={name} nomb>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mt-4">
        {
          (edited) &&
          <AddBox openModal={handleOpenModal} />
        }
        {
          data.length > 0
            ? (
              data.map((product) => (
                <CardProduct key={product.id} {...product} edited={edited} />
              ))
            )
            : (!edited) && (<p className="menu-list__empty">Belum Ada</p>)
        }
      </div>{
        (isModalOpen) && <ModalLayout title={contentModal} onClose={handleCloseModal} >
          {modalContent}
        </ModalLayout>
      }
    </Section>
  );
};

export default Products;
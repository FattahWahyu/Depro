import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import Icon from '../Elements/Icon';

const ModalLayout = ({ title = 'Pop up', children = 'test', onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleOutsideClick = (event) => {
    if (event.target.classList.contains('backdrop-blur-sm')) {
      handleClose();
    }
  };

  return isOpen ? (
    <div
      className="fixed top-0 left-0 w-screen h-screen z-50 backdrop-blur-sm flex justify-center items-end md:items-center cursor-pointer"
      onClick={handleOutsideClick}
    >
      <div className="bg-white rounded-2xl min-h-[100px] min-w-[100px] w-full md:w-2/3 lg:w-[600px]  p-4  shadow-2xl flex flex-col max-h-[90vh] ">
        <div className="pl-4 flex justify-between items-center w-full h-full  mb-2 ">
          <h1 className='font-inter font-semibold text-[#886345]'>{title}</h1>
          <Icon>
            <MdClose onClick={handleClose} />
          </Icon>
        </div>
        <div className="w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#886345] scrollbar-track-[#BBB]">{children}</div>
      </div>
    </div>
  ) : null;
};

export default ModalLayout;
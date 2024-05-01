import Jumbotron from "../Elements/Jumbotron";
import FLotbar from "../Elements/Floatbar";
import QrScanner from "../Elements/QrScanner";
import { useEffect, useRef, useState } from 'react';
import ModalLayout from "../Layouts/ModalLayouts";
import Login from "../Section/Login";
import Register from "../Section/Register";
import Account from "../Section/Account";
import Cookies from "js-cookie";
import AddResource from "../Section/AddResource";
import AddUmkm from "../Section/AddUmkm";

const Header = ({ jumbotron, fbBg, home = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openScan = () => {
    setIsOpen(!isOpen);
  }

  const jumbotronRef = useRef(null);
  const [showSearch, setShowSearch] = useState(true);
  const [hideFloatbar, setHideFloatbar] = useState(false); // Initial state set to true

  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      let jumbotronHeight
      try {
        jumbotronHeight = jumbotronRef.current.offsetHeight;
      } catch {
        jumbotronHeight = 0;
      }

      const scrollPosition = window.scrollY;

      (scrollPosition > jumbotronHeight - 300)
        ? setShowSearch(false)
        : setShowSearch(true);


      clearTimeout(timeoutId);
      if (scrollPosition > 200) {
        setHideFloatbar(false);
        timeoutId = setTimeout(() => {
          setHideFloatbar(true);
        }, 1500);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Login Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState('Account');

  useEffect(() => {
    const isLoggedIn = Cookies.get('refreshToken');
    setContentModal(isLoggedIn ? 'Account' : 'Login');
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    const isLoggedIn = Cookies.get('refreshToken');
    setContentModal(isLoggedIn ? 'Account' : 'Login');
  }


  const handleOpenLogin = () => {
    setIsModalOpen(true);
  };

  const handleContentModal = (val) => {
    setContentModal(val);
  };


  let modalContent = null;

  if (contentModal === 'Login') {
    modalContent = <Login move={handleContentModal} />;
  } else if (contentModal === 'Register') {
    modalContent = <Register move={() => handleContentModal('Login')} />;
  } else if (contentModal === 'Account') {
    modalContent = <Account move={handleContentModal} />;
  } else if (contentModal === 'Tambah Bahan Baku') {
    modalContent = <AddResource />;
  } else if (contentModal === 'Registrasi UMKM') {
    modalContent = <AddUmkm />;
  }

  return (
    <header >
      <FLotbar bg={fbBg} openScan={openScan} showSearch={showSearch} hidden={hideFloatbar} home={home} openLogin={handleOpenLogin} />
      {jumbotron ? (<Jumbotron showSearch={showSearch} jumbotronRef={jumbotronRef} />) : null}
      <QrScanner isActive={true} isOpen={isOpen} closeScan={openScan}></QrScanner>
      {isModalOpen &&
        <ModalLayout title={contentModal} onClose={handleCloseModal} >
          {modalContent}
        </ModalLayout>}
    </header>
  )
}

export default Header;

import { MdClose } from "react-icons/md";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import Icon from "./Icon";


const QrScanner = ({ isOpen, closeScan }) => {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
      rememberLastUsedCamera: true,
    });

    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setScanResult(result);
      closeScan()
      window.location.href = 'http://' + result;
      scanner.clearUserMedia();
    }

    function error(err) {
      console.warn(err);
    }

    return () => {
      scanner.clear();
    };
  }, [closeScan, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      // Perform cleanup if isOpen becomes false
      setScanResult(null);

    }
  }, [isOpen]);



  return (
    <div className={`fixed top-0 h-screen left-0 right-0 backdrop-blur-[3.2px] z-30 ${isOpen ? 'flex justify-center items-center' : 'hidden'}`}>

      <div className="bg-white p-4 rounded-2xl shadow-2xl">
        <div className="flex justify-between items-center">
          <h1>QR Scanner</h1>
          <button onClick={closeScan}>
            <Icon>
              <MdClose />
            </Icon>
          </button>
        </div>
        {scanResult ? (
          <div id="reader">Success: {scanResult}</div>
        ) : (
          <div id="reader" width="600px"></div>
        )}
      </div>
    </div>
  );
};

export default QrScanner;
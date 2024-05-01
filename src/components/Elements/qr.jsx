import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ id }) => {
  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    const qrCodeSize = 150;
    const padding = 10;
    const canvasSize = qrCodeSize + padding * 2;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    const ctx = canvas.getContext('2d');

    // Gambar latar belakang putih
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Gambar QR code di atas latar belakang putih
    const qrCodeDataURL = document.querySelector('#qrcode canvas').toDataURL();
    const qrCodeImage = new Image();
    qrCodeImage.src = qrCodeDataURL;

    qrCodeImage.onload = () => {
      ctx.drawImage(qrCodeImage, padding, padding, qrCodeSize, qrCodeSize);

      // Unduh gambar QR code beserta latar belakang putih
      const downloadLink = document.createElement('a');
      downloadLink.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      downloadLink.download = 'qrcode.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
  };

  return (
    <div className='flex flex-col justify-center items-center gap-5 my-4'>
      <div id="qrcode" className='p-4 bg-white'>
        <QRCode value={`web-app-five-beta.vercel.app/product/${id}`} size={150} />
      </div>
      {id && (
        <button onClick={handleDownload} className="bg-[#9a7353] hover:bg-[#6d5038] text-white font-bold py-2 px-4 rounded">
          Download QR Code
        </button>
      )}
    </div>
  );
};

export default QRCodeGenerator;

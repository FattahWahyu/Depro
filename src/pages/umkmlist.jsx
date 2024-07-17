import React, { useState, useEffect } from "react";
import { getContactUmkm, getUmkm } from "../services/umkm.service";
import Brand from "../components/Elements/Brand";

const UmkmList = () => {
  const contact = () => {
    const randomNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    return `+62${randomNumber}`;
  };
  const [umkm, setUmkm] = useState(null);

  useEffect(() => {
    getUmkm((data) => {
      setUmkm(data);
    });
  }, []);

  return (
    <>
      <div className="flex justify-between items-center p-3">
        <Brand />
        <h1 className="text-center w-full text-2xl my-5 font-bold">
          Rekap Data UMKM
        </h1>
        <div className="w-20 h-10"></div>
      </div>
      <div
        className="fixed top-4 right-5 p-4 bg-blue-500 text-white rounded-md print:hidden"
        onClick={() => window.print()}
      >
        Print
      </div>
      <hr className="border-3" />
      <div className="w-full flex justify-center p-5">
        <table className="border-collapse border border-gray-400 w-full">
          <thead>
            <tr className="border border-gray-400">
              <th className="border border-gray-400 p-2">No</th>
              <th className="border border-gray-400 p-2">Nama Umkm</th>
              <th className="border border-gray-400 p-2">Logo</th>
              <th className="border border-gray-400 p-2">Alamat</th>
              <th className="border border-gray-400 p-2">Kontak</th>
            </tr>
          </thead>
          <tbody>
            {umkm &&
              umkm.map((item, index) => (
                <tr key={item.id} className="border border-gray-400">
                  <td className="border border-gray-400 p-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-400 p-2">{item.name}</td>
                  <td className="border border-gray-400 p-2 flex justify-center">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="h-10 w-10"
                    />
                  </td>
                  <td className="border border-gray-400 p-2">
                    {item.location.name}
                  </td>
                  <td className="text-center">{contact()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UmkmList;

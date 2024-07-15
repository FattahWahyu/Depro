import React from "react";
import CardUmkm from "../Elements/CardUmkm";
import Section from "./Index";

const Umkm = ({ umkm }) => {
  // Duplicate the umkm list to create the infinite scroll effect
  const doubledUmkm = [...umkm, ...umkm];

  return (
    <Section title="UMKM Partner">
      <div className="scroll-container mt-4">
        <div className="scroll-content">
          {doubledUmkm.map((umkmItem, index) => (
            <CardUmkm
              id={umkmItem.id}
              key={index}
              name={umkmItem.name}
              image={umkmItem.logo}
              className="card mx-3"
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Umkm;

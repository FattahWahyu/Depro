import { Children } from "react";

const DescriptionProduct = ({ children }) => {
  return (
    <p className="font-inter text-justify">
      {children}
    </p>
  );
};

export default DescriptionProduct;
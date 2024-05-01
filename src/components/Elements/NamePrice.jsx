import Pencil from "./Pencil";
const NamePrice = ({ name, price, edited = false }) => {
 
  return (
    <div className="flex py-4 justify-between gap-4 items-start">
      <h1 className="font-h1 text-2xl font-inter">{name} {(edited) && <Pencil />}</h1>
      {(price > 0) &&<h1 className="font-h1 text-xl font-inter text-[#886345]">{price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</h1>}
    </div>
  );
};

export default NamePrice;
import ImageBox from "../Elements/Image-box";
import NamePrice from "../Elements/NamePrice";
import DescriptionProduct from "../Elements/DesriptionProduct";


const TopDetail = ({ src, name, price, description, edited = false }) => {

  return (
    <div className="py-4 xl:px-0 p-4 mt-28 bg-white">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex gap-4 w-full overflow-x-auto scrollbar-thin  md:py-8 " >
          
          {
            src.length > 0
              ? (
                src.map((src, index) => (
                  <ImageBox key={index} src={src} />
                ))
              )
              : (<p className="menu-list__empty">Nout Found</p>)
          }
        </div>
        <NamePrice name={name} price={price} edited={edited} />
        <DescriptionProduct>{description}</DescriptionProduct>
      </div>
    </div>
  );
};

export default TopDetail;
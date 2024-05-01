import FilterItem from "../Elements/FilterItem";
import CategoryImage from "../../assets/img/categoryAll.png";
import Agrikultur from "../../assets/img/agricultur.png"
import MakananImage from "../../assets/img/makanan.png";
import MinumanImage from "../../assets/img/minuman.png";


const FIlter = () => {
  return (
    <div className="w-full bg-white">
      <div className="flex gap-4 max-w-[1240px] mx-auto overflow-x-auto xl:px-0  p-4">
        <FilterItem image={CategoryImage}>Semua Kategori</FilterItem>
        <FilterItem image={Agrikultur}>Agrikultur</FilterItem>
        <FilterItem image={MakananImage}>Makanan</FilterItem>
        <FilterItem image={MinumanImage}>Minuman</FilterItem>
      </div>
    </div>
  );
};

export default FIlter;
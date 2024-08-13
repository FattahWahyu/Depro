import { MdSearch } from "react-icons/md";
import Icon from "./Icon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = ({ float = false }) => {
  const [isActive, setIsActive] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleInputFocus = () => {
    setIsActive(true);
  };

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleInputBlur = () => {
    setIsActive(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && keyword !== "") {
      navigate(`/search/${keyword}`);
    }
  };

  return (
    <div
      className={`${
        float
          ? ""
          : "absolute top-0 w-full h-full flex justify-center items-center px-4"
      }`}
    >
      <div
        className={`${
          float ? "m-auto" : "h-14  xl:mx-0 px-2 m-12 translate-y-14 max-w-[500px]"
        } w-full  bg-white rounded-2xl opacity-90 flex items-center`}
      >
        <Icon active={isActive}>
          <MdSearch />
        </Icon>
        <input
          type="text"
          className="h-8 outline-none gap-2 font-semibold text-xl w-full placeholder:font-semibold placeholder:text-lg md:placeholder:text-xl font-inter"
          placeholder="Temukan produk lokal unggulan"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />

        <a
          href={`/search/${keyword}`}
          className={`${
            keyword === "" ? "hidden" : ""
          } bg-[#05C6FB] text-white py-2 px-4 rounded-lg w-min ml-4 hover:bg-[#4B70F5]`}
        >
          Cari
        </a>
      </div>
    </div>
  );
};

export default Search;

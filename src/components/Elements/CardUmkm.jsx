import placeholder from '../../assets/img/placeholder.jpg'
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from 'react-router-dom';

const CardUmkm = ({id, name, image}) => {
  return (
    <div className='w-36 h-max'>
      <Link to={`umkm/${id}`}>
        <div className="relative hover:scale-110">
          <LazyLoadImage src={image} placeholderSrc={placeholder} className="w-36 h-36 rounded-full overflow-hidden flex flex-col shadow-xl" />
          {/* <p className="absolute w-full leading-[144px] top-0 text-center text-white font-bold opacity-70 text-2xl">5km</p> */}
        </div>
        <p className="text-center font-semibold  w-full">{name}</p>
      </Link>
    </div>

  );
};

export default CardUmkm;
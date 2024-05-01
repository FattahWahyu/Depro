import placeholder from '../../assets/img/placeholder.jpg'
import { LazyLoadImage } from "react-lazy-load-image-component";

const ImageBox = ({ src }) => {
  return (

      <LazyLoadImage src={src} placeholderSrc={placeholder} className="w-96 h-64 object-cover block rounded-2xl drop-shadow-xl" alt="img" />
    
  );
};

export default ImageBox;
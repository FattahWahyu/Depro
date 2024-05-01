import placeholder from '../../assets/img/placeholder.jpg'
import { LazyLoadImage } from "react-lazy-load-image-component";

const CardProcess = ({ src, name, description }) => {
    return (
        <div className="flex mt-8 w-full" >
            <div className="w-24 md:w-48 h-48  flex justify-center items-center">
                <div className="w-5 h-5 bg-[#886345] rounded-full"></div>
            </div>
            <div className="flex flex-col sm:flex-row min-w-[100px] gap-4">
                <LazyLoadImage src={src} placeholderSrc={placeholder} className="w-64 h-48 object-cover block rounded-2xl drop-shadow-xl mb-1" alt="img" />
                <div className="w-64 sm:w-full">
                    <h1 className="font-inter text-xl mb-2 w-full">{name}</h1>
                    <p className="mb-2 font-inter">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default CardProcess;
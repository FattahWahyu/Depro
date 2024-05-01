import { MdDelete, MdEdit, MdLocationOn } from "react-icons/md";
import { MdShoppingBag } from "react-icons/md";
import Icon from "./Icon";
import placeholder from '../../assets/img/placeholder.jpg'
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useNavigate } from "react-router-dom";
import accessToken from "../../utils/accesToken";
import { useState } from "react";
import axios from "axios";


const CardResource = ({ src, name = "...", description = "...", umkm = null, location = null, lat, lng, edited = false, id }) => {
    const navigate = useNavigate();
    const [loadingDelete, setLoadingDelete] = useState(false);

    const deleteResourceHandle = async (event, id) => {
        event.stopPropagation();
        const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus bahan baku ini?');
        if (confirmDelete) {
            setLoadingDelete(true);
            try {
                const token = await accessToken();
                if (token) {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    };
                    const response = await axios.delete(`https://c23-gt01-01.et.r.appspot.com/resources/${id}`, config);
                    alert(response.data.message);
                    setLoadingDelete(false);
                }
            } catch (error) {
                console.error('Error deleting product:', error);
            } finally {
                navigate(0);
            }
        }
    };
    return (
        <div className="flex flex-col w-min-64 drop-shadow-xl bg-white rounded-2xl">
            <LazyLoadImage src={src} placeholderSrc={placeholder} className="w-full h-48 object-cover block mb-1" alt="img" />
            <div className="w-64 p-4">

                {
                    (edited) &&

                    <div className='w-full justify-end flex gap-2 py-2' >
                        <Link to={`/product/edit`} >
                            <Icon size="w-6 h-6" ><MdEdit /></Icon></Link>
                        <Icon size="w-6 h-6" ><MdDelete onClick={(event) => deleteResourceHandle(event, id)} /></Icon>
                    </div>
                }
                <h1 className="font-inter text-xl mb-2">{name}</h1>

                <p className="mb-2 pr-1">{description}</p>
                <div>
                    {
                        (umkm !== null) &&
                        <p className="flex gap-2 items-center font-bold mb-2 mt-4">
                            <Icon size="h-[37x] w-[37px]" active={true}><MdShoppingBag /></Icon>
                            {umkm}
                        </p>
                    }
                    {
                        (location !== null) &&
                        <a href={`https://maps.google.com/?q=${lat},${lng}`} target="_blank" rel="noopener noreferrer">
                            <p className="flex gap-2 items-center font-bold">
                                <Icon size="h-[37px] w-[37px]" active={true}><MdLocationOn /></Icon>
                                {location}
                            </p>
                        </a>
                    }

                </div>

            </div>
        </div>
    );
};

export default CardResource;
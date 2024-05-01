import { MdShareLocation } from "react-icons/md"; 
import { MdEmojiPeople } from "react-icons/md"; 
import { ImLeaf } from "react-icons/im"; 
import { IoMdTrendingUp } from "react-icons/io"; 
import { BiTrendingUp } from "react-icons/bi"; 
import { MdRecycling } from "react-icons/md"; 
import { MdWaterDrop } from "react-icons/md"; 
import { IoMdTrash } from "react-icons/io"; 
import { CgSmileNone } from "react-icons/cg"; 
import { MdElectricBolt } from "react-icons/md"; 
import { BiWind } from "react-icons/bi"; 

import Icon from "./Icon";

const CardSummary = ({ code }) => {

    let text = '...'
    let icon = <CgSmileNone />
    if (code === 1) {
        icon = <BiWind />
        text = 'Minimalisasi Carboon Footprints'
    }
    else if (code === 2) {
        icon =<MdElectricBolt />
        text = 'Efisiensi Energi'
    }
    else if (code === 3) {
        icon = <IoMdTrash />
        text = 'Pengelolaan Limbah'
    }
    else if (code === 4) {
        icon = <MdShareLocation />
        text = 'Penggunaan bahan baku lokal'
    }
    else if (code === 5) {
        icon= <MdWaterDrop />
        text = 'Efisiensi Air'
    }
    else if (code === 6) {
        icon = <MdRecycling />
        text = 'Daur Ulang Produk'
    }
    else if (code === 7) {
        icon = <MdEmojiPeople />
        text = 'Kesejahteraan Pekerja'
    }
    else if (code === 8) {
        icon = <ImLeaf />
        text = 'Kesehatan dan Keamanan Lingkungan'
    }
    else if (code === 9) {
        icon = <IoMdTrendingUp />
        text = 'Kemajuan UMKM Indonesia'
    }
    else {
        text = 'Not Found'
    }




    return (
        <p className="flex gap-2 items-center font-bold ">
            <Icon size="h-[37x] w-[37px]" active={true}>{icon}</Icon>
            {text}
        </p>
    );
};

export default CardSummary;
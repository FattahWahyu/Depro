import { MdWhatsapp } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { MdMail } from "react-icons/md";
import { AiTwotoneMail } from "react-icons/ai";
import { IoIosCall } from "react-icons/io";
import Icon from "./Icon";


const ContactBox = ({ email = '...', phone = false, wa = '...' }) => {
    return (
        <div className="flex w-full justify-center mt-5 flex-wrap">
            {
                (phone) &&
                <div className="flex gap-3 ml-6 mr-5 md:flex-col items-center ">
                    <p><Icon className="text-5xl text-inter font-medium"><MdPhone /></Icon></p>
                    <h3>{phone}</h3>
                </div>
            }
            {
                (phone) &&
                <div className="hidden md:block w-1 h-[10vh] bg-black"></div>
            }
            <div className="flex md:flex-col items-center gap-3 ml-6 mr-5">
                <p><Icon className="text-5xl text-inter font-medium"><MdWhatsapp /></Icon></p>
                <h3>{wa}</h3>
            </div>
            <div className="w-1 h-[10vh] bg-black hidden md:block"></div>
            <div className="flex gap-3 ml-6 md:flex-col items-center ">
                <p><Icon className="text-5xl text-inter font-medium"><MdMail /></Icon></p>
                <h3>{email}</h3>
            </div>


        </div>
    );
}


export default ContactBox;
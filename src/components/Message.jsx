/* eslint-disable react/prop-types */

import { MdCropSquare } from "react-icons/md";
import { RiStarLine } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedMail } from '../redux/appSlice';
import { motion } from 'framer-motion';

const Message = ({ email }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const openMail = () => {
        dispatch(setSelectedMail(email));
        navigate(`/mail/${email.id}`);
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const today = new Date();
        if (date.toDateString() === today.toDateString()) {
            // If the date is today, return the time only
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',hour12: false });
        } else {
            // Otherwise, return the date in 'D MMM' format
            return date.toLocaleDateString([], { day: 'numeric', month: 'short' });
        }
    };


    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={openMail} className="flex 
            flex-col lg:flex-row items-start 
            border-b border-gray-200  py-3 text-sm hover:cursor-pointer hover:shadow-md w-full ">
            <div className="flex items-center
             px-4 w-full lg:w-[40%]">
                <div className="flex-none text-gray-300">
                    <MdCropSquare className="w-5 h-5" />
                </div>
                <div className="hidden lg:block flex-none text-gray-300 ml-2">
                    <RiStarLine className="w-5 h-5" />
                </div>
                <div className="flex justify-between  w-full ml-2 lg:flex-none  ">
                    <h1 className="font-semibold">{email?.to}</h1>
                    <pre className="lg:hidden text-sm text-gray-700 ml-auto">{formatDate(email?.createdAt?.seconds)}</pre>
                </div>
            </div>
            <div className="flex-1 overflow-hidden ">
                <p className="hidden  
                lg:block text-gray-600 truncate overflow-hidden 
               lg:w-[80%] ">{email.message}</p>
            </div>
            <div className="hidden lg:block  text-sm ml-auto pr-2 lg:pr-6">
            <p>{formatDate(email?.createdAt?.seconds)}</p>
            </div>
            <div className="lg:hidden overflow-hidden w-[100%] ">
                <p className=" py-3 truncate pl-10  w-[80%] ">{email.message}</p>
            </div>
        </motion.div>
    )
}

export default Message
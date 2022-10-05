import Button from "../../components/button";
import { UilStopwatch } from '@iconscout/react-unicons'
import { useState } from "react";
import ModalWindow from "../../components/modal-window";

const InProgressPage = () =>{
    const [openModal,setOpenModal] =useState(false)

    return(
        <div className="flex flex-col w-full">
            <div className='flex flex-row justify-between px-20 items-baseline'>
                <div className='capitalize text-4xl font-bold text-blue-600 pt-8 h-fit flex flex-row items-center '>
                    <UilStopwatch size="30" color="#959daa" />
                    In Progress tasks
                </div>
                <Button setOpenModal={setOpenModal} />
            </div>
              {openModal && <ModalWindow setOpenModal={setOpenModal}/>} 
        </div>
    )
}
export default InProgressPage;
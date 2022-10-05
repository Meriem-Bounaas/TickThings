import { useState } from "react";
import Button from "../../components/button";
import ModalWindow from "../../components/modal-window";
import { UilClipboardNotes } from '@iconscout/react-unicons'

const PrincipalePage = () =>{
    const [openModal,setOpenModal] =useState(false)

    return(
        <div className="flex flex-col w-full">
            <div className='flex flex-row justify-between px-20 items-baseline'>
                <div className='capitalize text-4xl font-bold text-blue-600 pt-8 h-fit flex flex-row items-center '>
                    <UilClipboardNotes size="30" color="#959daa" />
                    all tasks
                </div>
                <Button setOpenModal={setOpenModal} />
            </div>
              {openModal && <ModalWindow setOpenModal={setOpenModal}/>} 
        </div>
        
    )
}

export default PrincipalePage;
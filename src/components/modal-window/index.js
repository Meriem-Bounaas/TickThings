import Button from "../button";

const ModalWindow = ({setOpenModal}) =>{
    return(
        <div className="absolute top-0 left-0 bg-slate-500 w-screen h-screen opacity-75 flex align-middle">
            <div className="w-1/3 h-fit bg-white rounded-sm flex flex-col m-auto justify-between p-4 ">
                <header className="flex flex-row justify-end p-2 text-semibold ">
                    <button onClick={()=>setOpenModal(false)}>X</button>
                </header>
                <div className=" flex flex-col">
                    <input    className="border border-slate-400 my-1 p-1 rounded-sm" type={'text'} placeholder='title'/>
                    <textarea className="border border-slate-400 my-1 p-1 rounded-sm" rows={6} placeholder='descreption'/>
                </div>
                <footer className="flex flex-row justify-end">
                    <Button />
                </footer>
            </div>
        </div>
    )
}

export default ModalWindow;
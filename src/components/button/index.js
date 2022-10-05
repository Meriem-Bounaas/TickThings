const Button =({setOpenModal}) =>{
    return (
        <button className="button" >
            <p className="btnText capitalize text-lg">add task</p>
            <button className="btnTwo" onClick={()=>{setOpenModal(true)}}>
                <p className="btnText2 capitalize text-lg font-bold">+</p>
            </button>
        </button>
    )
}

export default Button;
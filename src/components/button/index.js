 const Button =({handleOnClick}) =>{
 
    return (
        <button className="button" >
            <p className="btnText capitalize text-lg">add task</p>
            <button className="btnTwo" onClick={()=>{
              handleOnClick()
            }}>
                <p className="btnText2 capitalize text-lg font-bold">+</p>
            </button>
        </button>
    )
}

export default Button;
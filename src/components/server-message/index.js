const ServerMessage = ({ serverMessage, color }) => {
    return (
        <div className={`bg-${color} text-white p-2 w-1/2 text-center rounded-2xl`}>{serverMessage}</div>


    )                     
}

export default ServerMessage;
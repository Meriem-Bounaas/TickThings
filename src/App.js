import Navbar from './components/navbar';
import './style/index.css';
import { Outlet } from "react-router-dom";
import src from './media/todo.png';

function App() {
  return (
      <div className="flex flex-col h-screen font-font">
            <div className="border-b-2 border-gray-200 w-screen items-end flex flex-row p-4 ">
                <img src={src} alt="img" className='w-8 h-auto'/>
                <span className='capitalize text-2xl  text-end font-logo'>todo List</span>
            </div>
            <div className='flex flex-row h-full'>
                <div className='flex flex-col border-r-2 border-gray-200 h-full w-1/5 gap-5 items-center'>
                  <span className='text-xl text-gray-300 capitalize pt-2 font-title'>task management</span>
                  <Navbar />
                </div>
                <Outlet />
            </div> 
      </div> 
  )
}

export default App;

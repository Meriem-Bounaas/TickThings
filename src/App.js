import Navbar from './components/navbar';
import './style/index.css';
import { Outlet } from "react-router-dom";
import src from './media/todo.png';
import { useTranslation } from "react-i18next";
import Translate from './components/translate';
import { useEffect } from 'react';
import { addTask } from './redux/task-slice';
import { useDispatch } from 'react-redux';

function App() {

  const keyList =  []
  const { t } = useTranslation();
  const dispatch = useDispatch()

  useEffect(()=>{
    const tasks = Object.entries(localStorage)        
    tasks.forEach(task => {   
      if(!keyList.find(e=>e === task[0])) {
        dispatch(addTask(JSON.parse(task[1])));
        keyList.push(task[0])
      }
    });    
  }, [])

  return (
    <div className="flex flex-col h-screen font-font">
      <div className='flex flex-row border-b-2 border-third-color'>
        <div className=" w-screen items-end flex flex-row p-4 ">
          <img src={src} alt="img" className='w-8 h-auto' />
          <span className='capitalize text-2xl text-primary-color text-end font-logo'>todo List</span>
        </div>
        <Translate/>
      </div>

      <div className='flex flex-row h-full'>
        <div className='flex flex-col border-r-2 border-third-color h-full w-1/5 gap-5 items-center'>
          <span className='text-xl text-forth-color capitalize pt-4 font-title'>{t('task management')}</span>
          <Navbar />
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default App;

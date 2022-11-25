import Navbar from './components/navbar';
import './style/index.css';
import {  Outlet } from "react-router-dom";
import src from './media/todo.png';
import { useTranslation } from "react-i18next";
import Translate from './components/translate';
import { useContext, useEffect, useState } from 'react';
import { addTask } from './redux/task-slice';
import { useDispatch } from 'react-redux';
import LogOut from './components/log-out';
import AuthContext from './auth-context';
import { db } from './firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { setIsLoading } from './redux/loading-slice';
import NotificationSystem from './components/notification-system';
import  { isNotify } from './redux/notify-slice';


function App() {
  const keyList = []
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const [emailUser, setEmailUser] = useState()
  
  // ==========> load tasks from local storage
  // const loadFromLocalStorage = () => {
  //   const tasks = Object.entries(localStorage)
  //   tasks.forEach(task => {
  //     if (!keyList.find(e => e === task[0])) {
  //       dispatch(addTask(JSON.parse(task[1])));
  //       keyList.push(task[0])
  //     }
  //   });
  // }

  //  ==========> load all tasks
  // const loadTasks = async () => {
  //   const tasks = await getDocs(collection(db, "todos"));
  //   tasks.forEach(task => {
  //     if (!keyList.find(e => e === task.data().key)) {
  //       dispatch(addTask(task.data()));
  //       keyList.push(task.data().key)
  //     }
  //   });
  // }

  // ============> load tasks by user
  const loadTasksByUser = async () => {
    if (!user)
      return;
    setEmailUser(user.email);
    dispatch(setIsLoading(true));
    try {
      const myquery = query(collection(db, "todos"), where("user", "==", user.uid));
      if (myquery) {
        const querySnapshot = await getDocs(myquery);
        dispatch(setIsLoading(false));
        querySnapshot.forEach((task) => {
          if (!keyList.find(e => e === task.data().key)) {
            dispatch(addTask(task.data()));
            keyList.push(task.data().key)
          }
        });
      }
    } catch (e) {
      // dispatch(isNotify('error in server'));
    }
  }

  useEffect(() => {
    // loadFromLocalStorage();
    // loadTasks();
    loadTasksByUser();
  }, [])

  return (
    <div className="flex flex-col h-screen font-font p-2 lg:p-0">
      <div className='flex flex-row border-b-2 border-third-color'>
        <div className=" w-screen items-end flex flex-row p-4 ">
          <img src={src} alt="img" className='w-8 h-auto' />
          <span className='capitalize text-2xl text-second-color text-end font-logo'>TickThings</span>
        </div>
        <div className='flex flex-row items-baseline gap-2'>
          <Translate />
          <LogOut emailUser={emailUser} />
        </div>
      </div>

      <div className='flex flex-col lg:flex-row h-full'>
        <div className='flex flex-col lg:border-r-2 lg:border-third-color lg:h-full lg:w-1/5 gap-5 items-center mt-4 lg:mt-0'>
          <span className='hidden lg:block text-xl text-forth-color capitalize pt-4 font-title mb-8'>{t('task management')}</span>
          <Navbar />
        </div>
        <Outlet />
      </div>
      <NotificationSystem />
    </div>
  )
}

export default App;

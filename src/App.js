import Navbar from './components/navbar';
import './style/index.css';
import { Navigate, Outlet } from "react-router-dom";
import src from './media/todo.png';
import { useTranslation } from "react-i18next";
import Translate from './components/translate';
import { useContext, useEffect } from 'react';
import { addTask } from './redux/task-slice';
import { ReactReduxContext, useDispatch } from 'react-redux';
import LogOut from './components/log-out';
import AuthContext from './auth-context';
import { db } from './firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';

function App() {
  const keyList = []
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);

  //  ==========> load tasks from local storage
  const loadFromLocalStorage = () => {
    const tasks = Object.entries(localStorage)
    tasks.forEach(task => {
      if (!keyList.find(e => e === task[0])) {
        dispatch(addTask(JSON.parse(task[1])));
        keyList.push(task[0])
      }
    });
  }

  //  ==========> load all tasks
  const loadTasks = async () => {
    const tasks = await getDocs(collection(db, "todos"));
    tasks.forEach(task => {
      if (!keyList.find(e => e === task.data().key)) {
        dispatch(addTask(task.data()));
        keyList.push(task.data().key)
      }

    });
  }

  // ============> load tasks by user
  const loadTasksByUser = async () => {
    if (!user)
      return;
    const myquery = query(collection(db, "todos"), where("user", "==", user.uid));
    if (myquery) {
      const querySnapshot = await getDocs(myquery);
      querySnapshot.forEach((task) => {
        if (!keyList.find(e => e === task.data().key)) {
          dispatch(addTask(task.data()));
          keyList.push(task.data().key)
        }
      });
    }
  }

  useEffect(() => {
    // loadFromLocalStorage();
    // loadTasks();
    loadTasksByUser();
  }, [])

  if (!user) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="flex flex-col h-screen font-font">
      <div className='flex flex-row border-b-2 border-third-color'>
        <div className=" w-screen items-end flex flex-row p-4 ">
          <img src={src} alt="img" className='w-8 h-auto' />
          <span className='capitalize text-2xl text-second-color text-end font-logo'>todo List</span>
        </div>
        <div className='flex flex-row items-end mr-10 mb-4'>
          <Translate />
          <LogOut />
        </div>
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

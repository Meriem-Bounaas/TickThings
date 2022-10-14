import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { isNotify } from '../../redux/notify-slice';
import { useEffect } from 'react';


const NotificationSystem = () => {
  const dispatch = useDispatch();
  const notify = useSelector(state => state.notify.notify)

  useEffect(() => {
    if (notify) {
      toast(notify);
      setTimeout((() => {
        dispatch(isNotify(''))
      }, 1000))
    }
  }, [notify])

  return (
    <ToastContainer />
  )
}

export default NotificationSystem;
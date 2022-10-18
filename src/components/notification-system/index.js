import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { isMessage, isNotify } from '../../redux/notify-slice';
import { useEffect } from 'react';
import { t } from 'i18next';

const NotificationSystem = () => {
  const dispatch = useDispatch();
  const notify = useSelector(state => state.notify.notify)
  const message = useSelector(state => state.notify.message)

  if (notify) {
    toast(t(notify));
    dispatch(isNotify(""))
  }

  useEffect(() => {
    if (message) {
      toast(message);
      setTimeout((() => {
        dispatch(isMessage(''))
      }, 1000))
    }
  }, [message])


  return (
    <ToastContainer />
  )
}

export default NotificationSystem;
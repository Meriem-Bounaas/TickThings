import React, { memo, useContext, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import CompletedPage from './pages/completed-tasks-page';
import InProgressPage from './pages/in-progress-page';
import PrincipalePage from './pages/principale-page';
import { store } from './redux/store/index.js'
import { Provider } from 'react-redux'
import './i18n/index.js';
import Login from './pages/login-page';
import { AuthProvider } from './auth-provider';
import SignUp from './pages/sign-up';
import AuthContext from './auth-context';


const AuthComponent =() => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()
   //console.log('zzz');
   
  if (user) {
    navigate('/dashboard')
    return (
      <Routes>
        <Route path="/dashboard" element={<App />}>
          <Route index element={<PrincipalePage />} />
          <Route path="completed" element={<CompletedPage />} />
          <Route path="inprogress" element={<InProgressPage />} />
        </Route>
      </Routes>
    )
  }  
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>         
          <AuthComponent />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

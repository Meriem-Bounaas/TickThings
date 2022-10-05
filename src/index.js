import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompletedPage from './pages/completed-tasks-page';
import InProgressPage from './pages/in-progress-page';
import PrincipalePage from './pages/principale-page';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<App/>}>
          <Route path="/" element={<PrincipalePage/>} />
          <Route path="completed" element={<CompletedPage/>} />
          <Route path="inprogress" element={<InProgressPage/>} />
        </Route>
    </Routes>    
  </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

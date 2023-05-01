import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import "./css/reset.css"
import NotFound from './pages/NotFound';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>{/* 리액트 Router 연결 */}
      <NotFound></NotFound>
      <App />
    </BrowserRouter>
  </>
);



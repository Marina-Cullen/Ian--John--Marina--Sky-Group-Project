import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './views/Main';
import HomePage from './components/HomePage';
import UserInfo from './components/UserInfo';
import './styles/App.css';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Main />} path="/" />
          <Route element={<HomePage />} path="/home" />
          {/* <Route element={<UserInfo />} path="/userInfo/:id" /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

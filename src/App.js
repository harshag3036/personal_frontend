import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import SignIn from './component/SignIn';
import Home from './component/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
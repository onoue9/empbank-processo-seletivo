import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Wallet from './pages/Wallet';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={ <Navigate to="/login" /> } />
    <Route path="/login" element={ <Login /> } />
    <Route path="/register" element={ <Register /> } />
    <Route path="/wallet" element={ <Wallet /> } />
  </Routes>
)

export default AppRoutes;
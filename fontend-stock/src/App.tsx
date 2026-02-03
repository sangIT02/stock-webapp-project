import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SettingsLayout from './layout/SettingsLayout';
import ProfilePage from './pages/ProfilePage';
import PasswordPage from './pages/PasswordPage';
import SecurityPage from './pages/SecurityPage';
import { RegisterPage } from './pages/user/register/Register.page';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import type { CandlestickData, Time } from 'lightweight-charts';
import DNSEChart from './pages/StockPage';
// import { StockPage } from './pages/StockPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/settings" element={<SettingsLayout />}>
          <Route index element={<ProfilePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="password" element={<PasswordPage />} />
          <Route path="security" element={<SecurityPage />} />
        </Route> */}

      </Routes>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Routes>
        <Route path="/home" element={<DNSEChart />} />
      </Routes>
    </BrowserRouter>
    
  );

}

export default App;

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
import { HomePageLayout } from './layout/HomePageLayout';
import { PriceTable } from './pages/PriceTable';
import { Portfolio } from './pages/Portfolio';
// import { StockPage } from './pages/StockPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>

      </Routes>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Routes>
      <Route path="/home" element={<HomePageLayout />}>
        
        {/* Route con mặc định (index) -> Vào /market là hiện Chart luôn */}
        <Route index element={<DNSEChart />} />
        
        {/* Các Route con cụ thể */}
        <Route path="chart" element={<DNSEChart />} />
        <Route path="price" element={<PriceTable />} />
        <Route path="portfolio" element={<Portfolio />} />

      </Route>        
      </Routes>
    </BrowserRouter>
    
  );

}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './Portfolio';
import DashboardLayout from './pages/admin/DashboardLayout';
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin/*" element={<DashboardLayout />} />
      </Routes>
    </Router>
  );
};

export default App;

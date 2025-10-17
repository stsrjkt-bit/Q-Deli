import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import WelcomePage from './pages/WelcomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import StudentAnalyticsPage from './pages/StudentAnalyticsPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import ConsultantPage from './pages/ConsultantPage.jsx';
import InviteCodePage from './pages/InviteCodePage.jsx';
import Header from './components/Header.jsx';
import MenuDrawer from './components/MenuDrawer.jsx';

export default function App(){
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header onMenuClick={() => setDrawerOpen(true)} />
        <MenuDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        <main className="content">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/analytics" element={<StudentAnalyticsPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/consultant" element={<ConsultantPage />} />
            <Route path="/invite" element={<InviteCodePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

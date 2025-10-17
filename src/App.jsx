import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import HomePage from './pages/HomePage.jsx';
import AnswerPage from './pages/AnswerPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

/**
 * Root application component defining routes and common navigation.
 * @returns {JSX.Element}
 */
export default function App() {
  return (
    <div className="app-container">
      <Navigation />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/answer" element={<AnswerPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </div>
  );
}

import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Explore from './pages/Explore';
import About from './pages/About';
import Support from './pages/Support';
import LoginPage from './pages/LoginPage';
import HackathonDetail from './pages/HackathonDetail';
import AdminDashboard from './pages/AdminDashboard';
import ContestantDashboard from './pages/ContestantDashboard';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="App">
            <Header />
            <main className="App-main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/about" element={<About />} />
                <Route path="/support" element={<Support />} />
                <Route path="/hackathon/:id" element={<HackathonDetail />} />
                <Route path="/login/admin" element={<LoginPage role="admin" />} />
                <Route path="/login/contestant" element={<LoginPage role="contestant" />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/dashboard" element={<ContestantDashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

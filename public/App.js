// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Contact from './Components/Contact';
import Login from './Components/Login';
import About from './Components/About';
import HeroSection from './Components/HeroSection';
import Footer from './Components/Footer';
import SignUp from './Components/SignUp';
import ImageCarousel from './Components/ImageCarousel';
import UserProfile from './Components/UserProfile';
import HomePage from './Components/HomePage';
import ProtectedRoute from './Components/ProtectedRoute';
import { AuthProvider } from './Contexts/AuthContext';
import UserProfilePage from './Components/UserProfilePage.js';

function App() {
  return (
    <AuthProvider> {/* Wrap the entire Router with AuthProvider */}
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <SignUp />
              <ImageCarousel />
              
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected routes */}

          <Route path="/userprofile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path="/homepage" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/userprofilepage" element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          } />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
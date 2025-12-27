
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { Routes, Route, Navigate } from 'react-router';
import HOME from './pages/HomePage.jsx';
import ABOUT from './pages/AboutPage.jsx';
import ProblemsPage from './pages/ProblemsPage.jsx';
import React from 'react';
import DashboardPage from './pages/DashboardPage.jsx';

import { Toaster } from 'react-hot-toast';

function App() {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) return null;
  return (
    <>
      <Routes>
        <Route path="/" element={!isSignedIn ? <HOME /> : <Navigate to={"/dashboard"} />} />
        <Route path="/about" element={<ABOUT />} />
        <Route path='/problems' element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} />
        <Route path='/dashboard' element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />} />
      </Routes>
      <Toaster toastOptions={{ duration: 1500 }} />
    </>
  );
}

export default App


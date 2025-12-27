
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { Routes, Route, Navigate } from 'react-router';
import HOME from './pages/HomePage.jsx';
import ABOUT from './pages/AboutPage.jsx';
import ProblemsPage from './pages/ProblemsPage.jsx';
import React from 'react';

import { Toaster } from 'react-hot-toast';

function App() {
  const { isSignedIn } = useUser();
  return (
    <>
      <Routes>
        <Route path="/" element={<HOME />} />
        <Route path="/about" element={<ABOUT />} />
        <Route path='/problems' element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} />
      </Routes>
      <Toaster toastOptions={{ duration: 1500 }} />
    </>
  );
}

export default App


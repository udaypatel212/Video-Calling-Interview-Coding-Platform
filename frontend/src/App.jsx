import { Routes, Route, Navigate } from 'react-router';
import HOME from './pages/HomePage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ProblemsPage from './pages/ProblemsPage.jsx';
import ProblemPage from './pages/ProblemPage.jsx';
import { Toaster } from 'react-hot-toast';
import { useUser } from '@clerk/clerk-react';

function App() {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) return null;
  return (
    <>
      <Routes>
        <Route path="/" element={!isSignedIn ? <HOME /> : <Navigate to={"/dashboard"} />} />
        <Route path='/problems' element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} />
        <Route path='/problem/:id' element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />} />
        <Route path='/dashboard' element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />} />
      </Routes>
      <Toaster toastOptions={{ duration: 1500 }} />
    </>
  );
}

export default App


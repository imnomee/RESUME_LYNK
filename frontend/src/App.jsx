import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Dashboard from './pages/Home/Dashboard';
import EditResume from './pages/ResumeUpdate/EditResume';
import UserProvider from './context/userContext';

const App = () => {
    return (
        <UserProvider>
            <div>
                <Router>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route
                            path="/resume/:resumeId"
                            element={<EditResume />}
                        />
                    </Routes>
                </Router>
            </div>
            <Toaster
                toastOptions={{
                    className: '',
                    style: {
                        fontSize: '13px',
                    },
                }}></Toaster>
        </UserProvider>
    );
};

export default App;

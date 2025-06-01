import React, { useContext, useState } from 'react';
import Input from '../../components/inputs/Input.jsx'; // Reusable input component
import { validateEmail } from '../../utils/helper.js'; // Helper function to validate emails
import { UserContext } from '../../context/userContext.jsx'; // Global context to store user info
import axiosInstance from '../../utils/axiosInstance.js'; // Pre-configured Axios client
import { API_PATHS } from '../../utils/apiPaths.js'; // Centralized API endpoints
import { useNavigate } from 'react-router-dom';

const Login = ({ setCurrentPage }) => {
    const { updateUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // NEW: loading state
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Basic form validations
        if (!email || !validateEmail(email)) {
            setError('Please enter a valid email');
            return;
        }

        if (!password || password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        setError('');
        setLoading(true); // Start loading

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password,
            });

            const { token } = response.data;

            if (token) {
                localStorage.setItem('token', token); // Store token in browser
                updateUser(response.data); // Update global context
                navigate('/dashboard'); // Redirect to dashboard
            }
        } catch (err) {
            // Show error message returned from backend (fallback to generic)
            setError(err.response?.data?.message || 'Login failed. Try again.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
            <p className="text-xs text-slate-700 mt-[5px] mb-6">
                Please enter your details
            </p>
            <form onSubmit={handleLogin}>
                <Input
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    label="Email Address"
                    placeHolder="john@example.com"
                    type="email"
                />
                <Input
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    label="Password"
                    placeHolder="Min 8 Characters"
                    type="password"
                />

                {error && (
                    <p className="text-red-500 text-xs pb-2.5">{error}</p>
                )}

                <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading}>
                    {loading ? 'Logging in...' : 'LOGIN'}
                </button>

                <p className="text-base text-slate-800 mt-3">
                    Don't have an account?{' '}
                    <button
                        type="button"
                        className="font-medium text-primary underline cursor-pointer"
                        onClick={() => setCurrentPage('signup')}>
                        Sign Up
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Login;

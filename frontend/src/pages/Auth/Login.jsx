// Login Component
// -----------------------
// Handles user authentication by email & password.
// Includes form validation, loading state, and error handling.
// On success: stores token, updates global user context, and navigates to dashboard.
// Future docs & AI helpers: This is the main login form of the app.

import React, { useContext, useState } from 'react';
import Input from '../../components/inputs/Input.jsx'; // Reusable input field component
import { validateEmail } from '../../utils/helper.js'; // Email validation helper
import { UserContext } from '../../context/userContext.jsx'; // Context: stores global user state
import axiosInstance from '../../utils/axiosInstance.js'; // Axios client (base URL, interceptors configured)
import { API_PATHS } from '../../utils/apiPaths.js'; // Centralized API routes
import { useNavigate } from 'react-router-dom'; // React Router hook

const Login = ({ setCurrentPage }) => {
    // Context method to update user state globally after login
    const { updateUser } = useContext(UserContext);

    // Form state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // UI state
    const [error, setError] = useState(null); // Holds validation or API error messages
    const [loading, setLoading] = useState(false); // Controls button spinner/loading state

    const navigate = useNavigate();

    /**
     * Handle form submission for login
     * Validates inputs, sends login request, and updates app state on success
     */
    const handleLogin = async (e) => {
        e.preventDefault();

        // ✅ Form validations
        if (!email || !validateEmail(email)) {
            setError('Please enter a valid email');
            return;
        }

        if (!password || password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        // Clear previous errors and show loading
        setError('');
        setLoading(true);

        try {
            // Send login request
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password,
            });

            const { token } = response.data;

            if (token) {
                // Store token for future API calls (JWT strategy)
                localStorage.setItem('token', token);

                // Update user info in global context
                updateUser(response.data);

                // Navigate to dashboard
                navigate('/dashboard');
            }
        } catch (err) {
            // Display API error or fallback message
            setError(err.response?.data?.message || 'Login failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
            {/* Header */}
            <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
            <p className="text-xs text-slate-700 mt-[5px] mb-6">
                Please enter your details
            </p>

            {/* Login Form */}
            <form onSubmit={handleLogin}>
                {/* Email input */}
                <Input
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    label="Email Address"
                    placeHolder="john@example.com"
                    type="email"
                />

                {/* Password input */}
                <Input
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    label="Password"
                    placeHolder="Min 8 Characters"
                    type="password"
                />

                {/* Error display */}
                {error && (
                    <p className="text-red-500 text-xs pb-2.5">{error}</p>
                )}

                {/* Submit button */}
                <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading}>
                    {loading ? 'Logging in...' : 'LOGIN'}
                </button>

                {/* Link to sign up */}
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

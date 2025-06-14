// SignUp Component
// -----------------------
// Handles user registration by collecting full name, email, and password.
// Performs basic validation, manages loading & error states, and updates global user context on success.
// On successful registration: stores token, updates user state, navigates to dashboard.

import { useContext, useState } from 'react';
import Input from '../../components/inputs/Input.jsx'; // Reusable form input component
import { validateEmail } from '../../utils/helper.js'; // Helper function for email format check
import axiosInstance from '../../utils/axiosInstance.js'; // Pre-configured Axios client
import { API_PATHS } from '../../utils/apiPaths.js'; // Centralized API endpoints
import { UserContext } from '../../context/userContext.jsx'; // App-wide user state context
import { useNavigate } from 'react-router-dom'; // React Router navigation

const SignUp = ({ setCurrentPage }) => {
    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext); // Update user globally after successful signup

    // Form fields
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // UI state
    const [error, setError] = useState(null); // Error message for validation/API failures
    const [loading, setLoading] = useState(false); // Controls button loading state

    /**
     * Handle sign-up form submission.
     * Validates inputs, sends API request, handles response.
     */
    const handleSignUp = async (e) => {
        e.preventDefault();

        // ✅ Client-side validation
        if (!fullName.trim()) {
            return setError('Full Name is required');
        }

        if (!email || !validateEmail(email)) {
            return setError('Invalid Email');
        }

        if (!password || password.length < 8) {
            return setError('Password must be at least 8 characters');
        }

        setError(''); // Clear previous errors
        setLoading(true); // Start loading

        try {
            // Send API request to register user
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                name: fullName,
                email,
                password,
            });

            const { token } = response.data;

            if (token) {
                // Persist auth token (JWT) for future requests
                localStorage.setItem('token', token);

                // Update user context with new user info
                updateUser(response.data);

                // Redirect to dashboard after successful signup
                navigate('/dashboard');
            }
        } catch (error) {
            // Show API error or fallback message
            setError(
                error.response?.data?.message || 'Register failed. Try again.'
            );
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
            {/* Heading */}
            <h3 className="text-lg font-semibold text-black">
                Create an Account
            </h3>
            <p className="text-xs text-slate-700 mt-2 mb-6">
                Join us today by entering your details below
            </p>

            {/* Sign-up form */}
            <form onSubmit={handleSignUp}>
                <div className="grid grid-cols-1 gap-2">
                    {/* Full name field */}
                    <Input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        label="Full Name"
                        placeHolder="John Doe"
                        type="text"
                        required
                    />

                    {/* Email field */}
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email"
                        placeHolder="john@example.com"
                        type="email"
                        required
                    />

                    {/* Password field */}
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        placeHolder="Min 8 Characters"
                        type="password"
                        required
                    />
                </div>

                {/* Display error if any */}
                {error && (
                    <p className="text-red-500 text-xs pb-2.5">{error}</p>
                )}

                {/* Submit button */}
                <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading} // Prevent multiple submissions
                >
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>

                {/* Link to login */}
                <p className="text-base text-slate-800 mt-3">
                    Already have an account?{' '}
                    <button
                        type="button"
                        className="font-medium text-primary underline cursor-pointer"
                        onClick={() => setCurrentPage('login')}
                        disabled={loading} // Prevent switching mid-request
                    >
                        Login
                    </button>
                </p>
            </form>
        </div>
    );
};

export default SignUp;

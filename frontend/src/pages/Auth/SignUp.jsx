import { useContext, useState } from 'react';
import Input from '../../components/inputs/Input.jsx';
import { validateEmail } from '../../utils/helper.js';
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import { UserContext } from '../../context/userContext.jsx';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ setCurrentPage }) => {
    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext);

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // 🆕 Loading state

    const handleSignUp = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!fullName.trim()) return setError('Full Name is required');
        if (!validateEmail(email) || !email) return setError('Invalid Email');
        if (!password || password.length < 8)
            return setError('Password must be at least 8 characters');

        setError('');
        setLoading(true); // ⏳ Start loading

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                name: fullName,
                email,
                password,
            });

            const { token } = response.data;

            if (token) {
                localStorage.setItem('token', token);
                updateUser(response.data);
                navigate('/dashboard');
            }
        } catch (error) {
            setError(
                error.response?.data?.message || 'Register failed. Try again.'
            );
        } finally {
            setLoading(false); // ✅ End loading
        }
    };

    return (
        <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-black">
                Create an Account
            </h3>
            <p className="text-xs text-slate-700 mt-2 mb-6">
                Join us today by entering your details below
            </p>

            <form onSubmit={handleSignUp}>
                <div className="grid grid-cols-1 gap-2">
                    <Input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        label="Full Name"
                        placeHolder="John Doe"
                        type="text"
                        required
                    />
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email"
                        placeHolder="john@example.com"
                        type="email"
                        required
                    />
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        placeHolder="Min 8 Characters"
                        type="password"
                        required
                    />
                </div>

                {error && (
                    <p className="text-red-500 text-xs pb-2.5">{error}</p>
                )}

                <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading} // 🚫 Prevent resubmission
                >
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>

                <p className="text-base text-slate-800 mt-3">
                    Already have an account?{' '}
                    <button
                        type="button"
                        className="font-medium text-primary underline cursor-pointer"
                        onClick={() => setCurrentPage('login')}
                        disabled={loading}>
                        Login
                    </button>
                </p>
            </form>
        </div>
    );
};

export default SignUp;

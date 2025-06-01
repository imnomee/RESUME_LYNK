import React, { useContext, useState } from 'react';
import Input from '../../components/inputs/Input.jsx';
import { validateEmail } from '../../utils/helper.js';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector.jsx';
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import { UserContext } from '../../context/userContext.jsx';
import { useNavigate } from 'react-router-dom';
import uploadImage from '../../utils/uploadImage.js';

const SignUp = ({ setCurrentPage }) => {
    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext);
    const [profilePic, setProfilepic] = useState(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSignUp = async (e) => {
        e.preventDefault();
        let profileImageUrl = '';
        if (!fullName) {
            setError('Full Name is required');
            return;
        }
        if (!validateEmail(email) || !email) {
            setError('Invalid Email');
            return;
        }
        if (!password || password.length < 8) {
            setError('Password is required');
            return;
        }
        setError('');
        try {
            if (profilePic) {
                const imageUploads = await uploadImage(profilePic);
                profileImageUrl = imageUploads.imageUrl || '';
            }
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                name: fullName,
                email,
                password,
                profileImageUrl,
            });
            const { token } = response.data;
            if (token) {
                localStorage.setItem('token', token);
                updateUser(response.data);
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error signing up:', error);
            setError('An error occurred. Please try again.');
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
                <ProfilePhotoSelector
                    image={profilePic}
                    setImage={setProfilepic}
                />
                <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
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
                        placeHolder="John@example.com"
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
                <button type="submit" className="btn-primary">
                    Sign Up
                </button>
                <p className="text-base text-slate-800 mt-3">
                    Already have an account?{' '}
                    <button
                        className="font-medium text-primary underline cursor-pointer"
                        onClick={() => setCurrentPage('login')}>
                        Login
                    </button>
                </p>
            </form>
        </div>
    );
};

export default SignUp;

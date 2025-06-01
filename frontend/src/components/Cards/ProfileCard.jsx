import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const ProfileCard = () => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // 🆕 loading state

    const handleLogout = () => {
        if (loading) return; // Prevent multiple clicks
        setLoading(true);

        // Simulate a short delay (e.g. clearing sessions or cleanup)
        setTimeout(() => {
            localStorage.clear();
            clearUser();
            navigate('/');
        }, 500); // Optional: tweak duration as needed
    };

    return (
        user && (
            <div className="flex items-center">
                <div>
                    <div className="font-bold leading-3">{user.name || ''}</div>
                    <button
                        className="text-purple-500 text-sm font-semibold cursor-pointer hover:underline disabled:opacity-50"
                        onClick={handleLogout}
                        disabled={loading} // 🚫 Prevent spam clicks
                    >
                        {loading ? 'Logging out...' : 'Logout'}
                    </button>
                </div>
            </div>
        )
    );
};

export default ProfileCard;

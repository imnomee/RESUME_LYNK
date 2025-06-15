// ProfileCard Component
// -----------------------------------------------------
// Purpose: Display user's name and a logout button
// Features:
// - Uses UserContext to get current user and clearUser function
// - Disables logout button while logging out
// - Navigates to home page after logout

import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const ProfileCard = () => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Tracks logout in progress

    const handleLogout = () => {
        if (loading) return; // Prevent multiple clicks
        setLoading(true);

        // Simulate delay for cleanup tasks
        setTimeout(() => {
            localStorage.clear();
            clearUser();
            navigate('/');
        }, 500);
    };

    // Render nothing if no user
    if (!user) return null;

    return (
        <div className="flex items-center">
            <div>
                <div
                    className="font-bold leading-3 truncate max-w-[150px]"
                    title={user.name}>
                    {user.name || ''}
                </div>
                <button
                    className="text-purple-500 text-sm font-semibold cursor-pointer hover:underline disabled:opacity-50"
                    onClick={handleLogout}
                    disabled={loading}
                    aria-label="Logout">
                    {loading ? 'Logging out...' : 'Logout'}
                </button>
            </div>
        </div>
    );
};

export default ProfileCard;

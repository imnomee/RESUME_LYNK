// Navbar Component
// -----------------------------------------------------
// Purpose: Displays the top navigation bar with brand link and user profile card
// Features:
// - Sticky top bar with shadow and border
// - Responsive container and spacing
// - Includes ProfileCard component for user info & actions

import { Link } from 'react-router-dom';
import ProfileCard from '../Cards/ProfileCard';

const Navbar = ({ activeMenu }) => {
    return (
        <header className="h-16 bg-white border-b border-gray-400/50 shadow-lg sticky top-0 z-30">
            <div className="container mx-auto h-full flex items-center justify-between px-4 md:px-0 gap-5">
                <Link to="/dashboard" aria-label="Go to dashboard">
                    <h1 className="text-lg md:text-xl font-medium text-black leading-5">
                        Resume Builder
                    </h1>
                </Link>
                <ProfileCard />
            </div>
        </header>
    );
};

export default Navbar;

import { useContext, useState } from 'react';
import HERO_IMG from '../assets/hero-img.png';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import Modal from '../components/Modal';
import { UserContext } from '../context/userContext';
import ProfileCard from '../components/Cards/ProfileCard';
import { useNavigate } from 'react-router-dom';

// Delay in ms for modal open animation and loading state
const MODAL_DELAY = 400;

const LandingPage = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    // Track modal visibility and which auth form to show
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [currentPage, setCurrentPage] = useState('login');

    // Show loading while navigation or modal is opening
    const [loading, setLoading] = useState(false);

    /**
     * Handles the CTA click from hero section.
     * Navigates to dashboard if logged in; otherwise opens signup modal.
     */
    const handleCTA = () => {
        if (loading) return;
        setLoading(true);

        if (!user) {
            setTimeout(() => {
                setOpenAuthModal(true);
                setCurrentPage('signup');
                setLoading(false);
            }, MODAL_DELAY);
        } else {
            navigate('/dashboard');
        }
    };

    /**
     * Handles Login / Sign Up button in the header.
     * Always shows login modal.
     */
    const handleAuthClick = () => {
        if (loading) return;
        setLoading(true);

        setTimeout(() => {
            setOpenAuthModal(true);
            setCurrentPage('login');
            setLoading(false);
        }, MODAL_DELAY);
    };

    return (
        <div className="w-full min-h-full bg-white">
            <div className="mx-auto px-4 py-6">
                {/* Header with branding and user login control */}
                <header className="flex justify-between items-center mb-8">
                    <div className="text-xl font-bold">Resume Builder</div>

                    {user ? (
                        <ProfileCard />
                    ) : (
                        <button
                            onClick={handleAuthClick}
                            disabled={loading}
                            className="bg-purple-100 text-sm font-semibold text-black px-7 py-2.5 rounded-lg hover:bg-gray-800 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                            aria-label="Login or Sign Up">
                            {loading ? 'Opening...' : 'Login / Sign Up'}
                        </button>
                    )}
                </header>

                {/* Hero Section */}
                <div className="flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
                        <h1 className="text-5xl font-extrabold mb-6 leading-tight">
                            Build Your{' '}
                            <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#7182ff_0%,_#3cff52_100%)] bg-[length:200%_200%] animate-text-shine">
                                Resume Effortlessly
                            </span>
                        </h1>
                        <p className="text-lg text-gray-700 mb-8">
                            Craft a standout resume in minutes with our smart
                            and intuitive resume builder.
                        </p>
                        <button
                            onClick={handleCTA}
                            disabled={loading}
                            className="bg-black text-sm font-semibold text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50"
                            aria-label="Get Started with Resume Builder">
                            {loading ? 'Please wait...' : 'Get Started'}
                        </button>
                    </div>

                    {/* Hero Image */}
                    <div className="w-full md:w-1/2">
                        <img
                            src={HERO_IMG}
                            alt="Illustration of a resume-building process"
                            className="w-full rounded-lg"
                        />
                    </div>
                </div>

                {/* Features Section */}
                <section className="mt-5">
                    <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
                        Features That Make You Shine
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Easy Editing',
                                desc: 'Update your resume sections with live preview and instant formatting.',
                            },
                            {
                                title: 'Beautiful Templates',
                                desc: 'Choose from modern, professional templates that are easy to customize.',
                            },
                            {
                                title: 'One-Click Export',
                                desc: 'Download your resume instantly as a high-quality PDF with one click.',
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
                                <h3 className="text-lg font-semibold mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Footer */}
            <div className="text-sm bg-gray-50 text-secondary text-center p-5 mt-5">
                Made with ❤️... Happy Resuming
            </div>

            {/* Modal for Auth */}
            <Modal
                isOpen={openAuthModal}
                onClose={() => {
                    setOpenAuthModal(false);
                    setCurrentPage('login'); // Reset to login view on close
                }}
                hideHeader
                width="auto max-w-[30vw]"
                height="auto max-h-[30vh]">
                <div>
                    {currentPage === 'login' && (
                        <Login setCurrentPage={setCurrentPage} />
                    )}
                    {currentPage === 'signup' && (
                        <SignUp setCurrentPage={setCurrentPage} />
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default LandingPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import Input from '../../components/inputs/Input';

const CreateResumeForm = () => {
    // State to track the resume title input
    const [title, setTitle] = useState('');

    // State to show error messages to the user
    const [error, setError] = useState(null);

    // State to indicate loading during form submission
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Handle form submission
    const handleCreateResume = async (e) => {
        e.preventDefault();

        // Prevent submission if title is empty or only spaces
        if (!title.trim()) {
            setError('Please enter a title');
            return;
        }

        setError('');
        setLoading(true);

        try {
            // Send request to create a new resume
            const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
                title: title.trim(),
            });

            // If resume is successfully created, navigate to its editor page
            if (response.data?._id) {
                navigate(`/resume/${response.data._id}`);
            }
        } catch (error) {
            console.error('Create resume error:', error);

            // Gracefully handle and show error messages
            setError(
                error?.response?.data?.message ||
                    'Something went wrong. Please try again.'
            );
        } finally {
            // End loading state
            setLoading(false);
        }
    };

    return (
        <div className="w-[90vw] md:w-[70vw] p-7 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-black">
                Create New Resume
            </h3>

            <p className="text-xs text-slate-700 mt-2 mb-3">
                Give your resume a title. This helps you identify it later.
            </p>

            <form onSubmit={handleCreateResume}>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    label="Resume Title"
                    placeHolder="e.g., Mike's Resume"
                    type="text"
                    required
                />

                {/* Display error if present */}
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

                {/* Submit button with loading indicator */}
                <button
                    type="submit"
                    className="btn-primary mt-4"
                    disabled={loading}>
                    {loading ? 'Creating...' : 'Create Resume'}
                </button>
            </form>
        </div>
    );
};

export default CreateResumeForm;

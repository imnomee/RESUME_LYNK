// CreateResumeForm Component
// -----------------------------------------------------
// Simple form for creating a new resume.
// Handles title input, basic validation, API call, and redirects to the editor.

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import Input from '../../components/inputs/Input';

const CreateResumeForm = () => {
    // Form field: Resume title input
    const [title, setTitle] = useState('');

    // UI states: Error message and loading status
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    /**
     * Handles form submission.
     * Validates input, calls API, navigates on success.
     */
    const handleCreateResume = async (e) => {
        e.preventDefault();

        // Validate: Title must not be empty or whitespace
        if (!title.trim()) {
            setError('Please enter a title');
            return;
        }

        setError(''); // Clear old errors
        setLoading(true); // Start loading UI

        try {
            // API: Create a new resume
            const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
                title: title.trim(),
            });

            // Success: Navigate to editor
            if (response.data?._id) {
                navigate(`/resume/${response.data._id}`);
            }
        } catch (error) {
            console.error('Create resume error:', error);

            // Display a friendly error message
            setError(
                error?.response?.data?.message ||
                    'Something went wrong. Please try again.'
            );
        } finally {
            setLoading(false); // Stop loading UI
        }
    };

    return (
        <div className="w-full p-7 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-black">
                Create New Resume
            </h3>

            <p className="text-xs text-slate-700 mt-2 mb-3">
                Give your resume a title. This helps you identify it later.
            </p>

            <form onSubmit={handleCreateResume}>
                {/* Title input field */}
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    label="Resume Title"
                    placeHolder="e.g., Mike's Resume"
                    type="text"
                    required
                />

                {/* Error display */}
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

                {/* Submit button with loading feedback */}
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

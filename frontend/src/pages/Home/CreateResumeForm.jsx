import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import Input from '../../components/inputs/Input';

const CreateResumeForm = () => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const handleCreateResume = async (e) => {
        e.preventDefault();
        if (!title) {
            setError('Please enter a title');
            return;
        }
        setError('');
        try {
            const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
                title,
            });
            if (response.data?._id) {
                navigate(`/resume/${response.data._id}`);
            }
        } catch (error) {
            console.error('Something went wrong, Please try again.');
            setError(error.response.data.message);
        }
    };
    return (
        <div className="w-[90vw] md:w-[70vw] p-7 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-black">
                Create New Resume
            </h3>
            <p className="text-xs text-slate-700 mt-2 mb-3">
                Give your resume a title .
            </p>
            <form onSubmit={handleCreateResume}>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    label="Resume Title"
                    placeHolder="Eg: Mikes Resume"
                    type="text"
                    required
                />
                {error && <p className="text-red-500 text-xs">{error}</p>}
                <button type="submit" className="btn-primary">
                    Create Resume
                </button>
            </form>
        </div>
    );
};

export default CreateResumeForm;

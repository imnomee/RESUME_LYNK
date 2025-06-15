// Dashboard Component
// --------------------------------------------
// Displays a list of user resumes with an option to create new ones.
// Handles API fetch, error/loading states, and integrates a modal for resume creation.

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import DashboardLayout from '../../components/layouts/DashboardLayout';
import ResumeSummaryCard from '../../components/Cards/ResumeSummaryCard';
import CreateResumeForm from '../Home/CreateResumeForm';
import Modal from '../../components/Modal';
import { LuCirclePlus } from 'react-icons/lu';

import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const Dashboard = () => {
    const navigate = useNavigate();

    // Controls visibility of the create resume modal
    const [openCreateModal, setOpenCreateModal] = useState(false);

    // Resumes data & UI state
    const [allResumes, setAllResumes] = useState([]); // List of user resumes
    const [loading, setLoading] = useState(true); // Loading state for API call
    const [error, setError] = useState(null); // Error message for UI

    /**
     * Fetches all resumes from the backend API.
     * Sorts them by updated date (newest first) and updates state.
     */
    const fetchAllResumes = async () => {
        try {
            setLoading(true); // Start loading spinner/message
            setError(null); // Reset previous errors

            const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
            const { total, resumes } = response.data;

            if (total > 0 && Array.isArray(resumes)) {
                const sortedResumes = resumes.sort(
                    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
                );
                setAllResumes(sortedResumes);
                console.log(sortedResumes); // TODO: Remove or replace with proper logging if needed
            } else {
                // No resumes found
                setAllResumes([]);
            }
        } catch (err) {
            console.error('Failed to fetch resumes:', err);
            setError('Failed to load resumes. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch resumes on component mount
    useEffect(() => {
        fetchAllResumes();
    }, []);

    return (
        <DashboardLayout>
            <div className="px-4 md:px-0 pt-1 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-7">
                    {/* Create Resume Card (opens modal) */}
                    <div
                        onClick={() => setOpenCreateModal(true)}
                        role="button"
                        aria-label="Create a new resume"
                        className="h-[300px] flex flex-col gap-5 items-center justify-center bg-purple-50 rounded-lg border border-purple-100 hover:border-purple-300 hover:bg-purple-50/5 cursor-pointer transition-shadow hover:shadow-lg">
                        <div className="w-12 h-12 flex items-center justify-center bg-purple-200/60 rounded-2xl">
                            <LuCirclePlus className="text-xl text-purple-500" />
                        </div>
                        <h3 className="font-medium text-gray-800">
                            Add New Resume
                        </h3>
                    </div>

                    {/* Resume List / Empty State / Loading / Error */}
                    {loading ? (
                        <div className="col-span-full text-center text-gray-500 pt-6">
                            Loading your resumes...
                        </div>
                    ) : error ? (
                        <div className="col-span-full text-center text-red-500 pt-6">
                            {error}
                        </div>
                    ) : allResumes.length === 0 ? (
                        <div className="col-span-full text-center pt-6 text-gray-700 flex flex-col items-center gap-3">
                            <p className="text-lg font-medium">
                                No resumes found
                            </p>
                            <p className="text-sm text-gray-500">
                                Start by creating your first resume!
                            </p>
                            <button
                                onClick={() => setOpenCreateModal(true)}
                                className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                                Create Resume
                            </button>
                        </div>
                    ) : (
                        allResumes.map((resume) => (
                            <ResumeSummaryCard
                                key={resume._id}
                                imgUrl={resume.thumbnailLink || null}
                                title={resume.title}
                                lastUpdated={
                                    resume?.updatedAt
                                        ? moment(resume.updatedAt).format(
                                              'Do MMM YYYY'
                                          )
                                        : 'Unknown'
                                }
                                onSelect={() =>
                                    navigate(`/resume/${resume._id}`)
                                }
                            />
                        ))
                    )}
                </div>
            </div>

            {/* Create Resume Modal */}
            <Modal
                isOpen={openCreateModal}
                onClose={() => {
                    setOpenCreateModal(false);
                }}
                hideHeader
                width="max-w-[30vw]"
                height="max-h-[30vh]">
                <CreateResumeForm
                    onSuccess={() => {
                        setOpenCreateModal(false);
                        fetchAllResumes(); // Refresh list after successful creation
                    }}
                />
            </Modal>
        </DashboardLayout>
    );
};

export default Dashboard;

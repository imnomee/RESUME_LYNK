export const BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    'https://resume-lynk.vercel.app/api/v1';

export const API_PATHS = {
    AUTH: {
        LOGIN: `${BASE_URL}/auth/login`,
        REGISTER: `${BASE_URL}/auth/register`,
        GET_PROFILE: `${BASE_URL}/auth/profile`,
    },
    RESUME: {
        GET_ALL: `${BASE_URL}/resumes`,
        GET_BY_ID: (resumeId) => `${BASE_URL}/resumes/${resumeId}`,
        CREATE: `${BASE_URL}/resumes`,
        UPDATE: (resumeId) => `${BASE_URL}/resumes/${resumeId}`,
        DELETE: (resumeId) => `${BASE_URL}/resumes/${resumeId}`,
        UPLOAD_IMAGES: (resumeId) =>
            `${BASE_URL}/resumes/${resumeId}/upload-images`,
    },
    IMAGE: {
        UPLOAD_IMAGE: `${BASE_URL}/auth/upload-image`,
    },
};

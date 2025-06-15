import TEMPLATE_ONE_IMG from '../assets/template-one.png';

export const resumeTemplates = [
    {
        id: '01',
        thumbnailImg: TEMPLATE_ONE_IMG,
        colorPaletteCode: 'themeOne',
    },
];

export const themeColorPalette = {
    themeOne: [
        ['#ebfdff', '#a1f4fd', '#cefafe', '#d058db', '#4a5565'],
        ['#e9fbf8', '#b4efe7', '#93e2da', '#2ac9ad', '#3048ca'],
    ],
    themeTwo: [
        ['#fff4e6', '#ffd8a8', '#ffa94d', '#e8590c', '#343a40'], // Warm sunset vibes
        ['#fff9db', '#ffe066', '#ffd43b', '#fab005', '#5f3dc4'], // Golden sand + accent purple
    ],
    themeThree: [
        ['#f3f0ff', '#d0bfff', '#9775fa', '#5f3dc4', '#212529'], // Lavender + deep violet
        ['#e7f5ff', '#74c0fc', '#228be6', '#1c7ed6', '#212529'], // Cool blues
    ],
    themeFour: [
        ['#e6fcf5', '#96f2d7', '#38d9a9', '#20c997', '#0b7285'], // Minty fresh
        ['#f8f9fa', '#ced4da', '#868e96', '#495057', '#212529'], // Neutral minimalist
    ],
    themeFive: [
        ['#fff0f6', '#ffdeeb', '#faa2c1', '#e64980', '#343a40'], // Soft pink + strong dark
        ['#f1f3f5', '#e9ecef', '#dee2e6', '#adb5bd', '#495057'], // Sleek grayscale
    ],
};

export const DUMMY_RESUME_DATA = {
    title: '',
    thumbnailLink: '',
    profileInfo: {
        profileImg: null,
        profilePreviewUrl: '',
        fullName: 'Gemmi Bear',
        designation: 'Senior Software Engineer',
        summary:
            'As a self-taught web developer, I am seeking a professional role where I can apply the skills I have acquired over two years of dedicated self-study. I am known for my quick learning ability, hard work, honesty, and commitment to continuous improvement.',
    },
    template: {
        theme: '',
        colorPalette: '',
    },
    contactInfo: {
        email: 'contactus@joblynk.site',
        phone: '+447440700830',
        location: 'Birmgingham, United Kingdom',
        linkedIn: 'https://linkedin.com/imnomee',
        github: 'https://github.com/imnomee',
        website: 'https://nrportfolio.site',
    },
    workExperience: [
        {
            companyName: 'Tech Solutions',
            role: 'Senior Full Stack Developer',
            startDate: '2018-03',
            endDate: '2020-02',
            description:
                'As a self-taught web developer, I am seeking a professional role where I can apply the skills I have acquired over two years of dedicated self-study. I am known for my quick learning ability, hard work, honesty, and commitment to continuous improvement.',
        },
        {
            companyName: 'Coding devs',
            role: 'Backend Developer',
            startDate: '2016-03',
            endDate: '2018-02',
            description:
                'As a self-taught web developer, I am seeking a professional role where I can apply the skills I have acquired over two years of dedicated self-study. I am known for my quick learning ability, hard work, honesty, and commitment to continuous improvement.',
        },
    ],
    education: [
        {
            degree: 'M.Sc. Software Engineering',
            institutionName: 'Tech University',
            startDate: '2014-08',
            endDate: '2016-06',
        },
        {
            degree: 'B.Sc. Computer Sciences',
            institutionName: 'State University',
            startDate: '2011-02',
            endDate: '2013-04',
        },
        {
            degree: 'High School Diploma',
            institutionName: 'Central High School',
            startDate: '2004-02',
            endDate: '2006-04',
        },
    ],
    skills: [
        {
            skillName: 'JavaScript',
            progressLevel: 95,
        },
        {
            skillName: 'React',
            progressLevel: 90,
        },
        {
            skillName: 'Node.js',
            progressLevel: 85,
        },
        {
            skillName: 'TypeScript',
            progressLevel: 80,
        },
        {
            skillName: 'MongoDB',
            progressLevel: 75,
        },
    ],
    projects: [
        {
            projectName: 'Project Manager App',
            description:
                'As a self-taught web developer, I am seeking a professional role where I can apply the skills I have acquired over two years of dedicated self-study. I am known for my quick learning ability, hard work, honesty, and commitment to continuous improvement.',
            projectLink: 'https://github.com/imnomee',
            liveDemo: '',
        },
        {
            projectName: 'E-Commerce Platform',
            description:
                'As a self-taught web developer, I am seeking a professional role where I can apply the skills I have acquired over two years of dedicated self-study. I am known for my quick learning ability, hard work, honesty, and commitment to continuous improvement.',
            projectLink: 'https://github.com/imnomee',
            liveDemo: 'https://github.com/imnomee',
        },
        {
            projectName: 'Blog CMS',
            description:
                'As a self-taught web developer, I am seeking a professional role where I can apply the skills I have acquired over two years of dedicated self-study. I am known for my quick learning ability, hard work, honesty, and commitment to continuous improvement.',
            projectLink: 'https://github.com/imnomee',
            liveDemo: '',
        },
    ],
    certifications: [
        {
            title: 'Full Stack Web Developer',
            issuer: 'Udemy',
            year: '2020',
        },
        {
            title: 'React Advanced Certification',
            issuer: 'Coursera',
            year: '2021',
        },
        {
            title: 'Professional Javascript',
            issuer: 'Mozilla',
            year: '2023',
        },
    ],
    languages: [
        {
            name: 'English',
            progressLevel: 80,
        },
        {
            name: 'Urdu',
            progressLevel: 100,
        },
        {
            name: 'Arabic',
            progressLevel: 40,
        },
    ],
    interests: ['Reading', 'Open Source Contribution', 'Hiking', 'Coding'],
};

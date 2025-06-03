import Input from '../../components/inputs/Input';

const ProfileInfoForm = ({ profileData, updateSection }) => {
    return (
        <div className="px-5 pt-5">
            {/* Section Heading */}
            <h2 className="text-base md:text-lg font-semibold text-gray-900">
                Personal Information
            </h2>

            {/* Form Fields */}
            <div className="mt-4">
                <div className="flex flex-col lg:flex-row gap-3">
                    {/* Full Name Field */}
                    <div className="flex-1">
                        <Input
                            value={profileData.fullName || ''}
                            onChange={(e) =>
                                updateSection('fullName', e.target.value)
                            }
                            label="Full Name"
                            placeHolder="Enter your full name"
                            type="text"
                            required
                        />
                    </div>

                    {/* Designation Field */}
                    <div className="flex-2">
                        <Input
                            value={profileData.designation || ''}
                            onChange={(e) =>
                                updateSection('designation', e.target.value)
                            }
                            label="Designation"
                            placeHolder="Enter your designation"
                            type="text"
                            required
                        />
                    </div>
                </div>
                {/* Summary Textarea */}
                <div className="col-span-2 mt-3">
                    <label
                        htmlFor="summary"
                        className="text-sm md:text-base text-gray-600">
                        Summary
                    </label>
                    <textarea
                        id="summary"
                        placeholder="Short Introduction"
                        className="input-box w-full bg-transparent outline-none text-sm md:text-base"
                        rows={6}
                        value={profileData.summary || ''}
                        onChange={(e) =>
                            updateSection('summary', e.target.value)
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfileInfoForm;

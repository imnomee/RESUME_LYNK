import Input from '../../components/inputs/Input';

const ProfileInfoForm = ({ profileData, updateSection }) => {
    return (
        <div className="px-5 pt-5">
            {/* Section Heading */}
            <h2 className="text-lg font-semibold text-gray-900">
                Personal Information
            </h2>

            {/* Form Fields */}
            <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name Field */}
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

                    {/* Designation Field */}
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

                    {/* Summary Textarea */}
                    <div className="col-span-2 mt-3">
                        <label
                            htmlFor="summary"
                            className="text-xs font-medium text-slate-600">
                            Summary
                        </label>
                        <textarea
                            id="summary"
                            placeholder="Short Introduction"
                            className="input-box w-full"
                            rows={4}
                            value={profileData.summary || ''}
                            onChange={(e) =>
                                updateSection('summary', e.target.value)
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfoForm;

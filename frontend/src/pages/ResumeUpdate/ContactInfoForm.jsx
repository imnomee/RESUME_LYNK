import React from 'react';
import Input from '../../components/inputs/Input';

const ContactInfoForm = ({ contactInfo, updateSection }) => {
    return (
        <div className="p-3 md:p-5">
            <h2 className="text-base md:text-lg font-semibold text-gray-900">
                Contact Information
            </h2>
            <div className="mt-4 flex flex-col gap-2">
                <Input
                    label="Email"
                    placeHolder="nomeepk@gmail.com"
                    type="email"
                    value={contactInfo.email || ''}
                    onChange={(e) => updateSection('email', e.target.value)}
                />
                <div className="flex flex-row gap-2">
                    <div className="flex-3">
                        <Input
                            label="Location"
                            placeHolder="Short Address"
                            type="text"
                            value={contactInfo.location || ''}
                            onChange={(e) =>
                                updateSection('location', e.target.value)
                            }
                        />
                    </div>
                    <div className="flex-2">
                        <Input
                            label="Phone Number"
                            placeHolder="123456789"
                            type="tel"
                            value={contactInfo.phone || ''}
                            onChange={(e) =>
                                updateSection('phone', e.target.value)
                            }
                        />
                    </div>
                </div>
                <Input
                    label="LinkedIn"
                    placeHolder="https://linkedin.com/in/imnomee"
                    type="text"
                    value={contactInfo.linkedIn || ''}
                    onChange={(e) => updateSection('linkedIn', e.target.value)}
                />
                <Input
                    label="Github"
                    placeHolder="https://github.com/imnomee"
                    type="text"
                    value={contactInfo.github || ''}
                    onChange={(e) => updateSection('github', e.target.value)}
                />
                <div className="md:col-span-2">
                    <Input
                        label="Portfolio / Website"
                        placeHolder="https://nrportfolio.site"
                        type="text"
                        value={contactInfo.website || ''}
                        onChange={(e) =>
                            updateSection('website', e.target.value)
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default ContactInfoForm;

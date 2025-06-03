import React from 'react';

import Input from '../../components/inputs/Input';
import { LuTrash2, LuPlus } from 'react-icons/lu';

const CertificationInfoForm = ({
    certificationInfo,
    updateArrayItem,
    addArrayItem,
    removeArrayItem,
}) => {
    return (
        <div className="p-3 md:p-5">
            <h2 className="text-base md:text-lg font-semibold text-gray-900">
                Certifications
            </h2>
            <div className="my-2 flex flex-col gap-2">
                {certificationInfo.map((cert, index) => (
                    <div
                        key={index}
                        className="border border-purple-400/90 p-2 rounded-lg relative md:p-4">
                        <div className="flex flex-col gap-2">
                            <Input
                                label={'Certification Title'}
                                placeHolder={'Full Stack Web Developer'}
                                type={'text'}
                                value={cert.title}
                                onChange={(e) =>
                                    updateArrayItem(
                                        index,
                                        'title',
                                        e.target.value
                                    )
                                }
                            />
                            <div className="flex gap-2">
                                <div className="flex-4">
                                    <Input
                                        label="Issuer"
                                        placeHolder={'Coursera / Google /etc.'}
                                        type={'text'}
                                        value={cert.issuer}
                                        onChange={(e) =>
                                            updateArrayItem(
                                                index,
                                                'issuer',
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="flex-1">
                                    <Input
                                        label="Year"
                                        placeholder="2024"
                                        type="text"
                                        value={cert.year || ''}
                                        onChange={(e) =>
                                            updateArrayItem(
                                                index,
                                                'year',
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        {certificationInfo.length > 1 && (
                            <button
                                type="button"
                                className="absolute top-3  right-3 text-sm text-red-600 hover:underline cursor-pointer "
                                onClick={() => removeArrayItem(index)}>
                                <LuTrash2 />
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    className="self-center md:self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"
                    onClick={() =>
                        addArrayItem({
                            title: '',
                            issuer: '',
                            year: '',
                        })
                    }>
                    <LuPlus /> Add Certification
                </button>
            </div>
        </div>
    );
};

export default CertificationInfoForm;

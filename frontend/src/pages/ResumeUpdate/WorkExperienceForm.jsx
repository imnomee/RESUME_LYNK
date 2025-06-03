import React from 'react';
import Input from '../../components/inputs/Input';
import { LuPlus, LuTrash2 } from 'react-icons/lu';

const WorkExperienceForm = ({
    workExperience,
    updateArrayItem,
    addArrayItem,
    removeArrayItem,
}) => {
    return (
        <div className="p-3 md:p-5">
            <h2 className="text-base md:text-lg font-semibold text-gray-900">
                Work Experience
            </h2>

            <div className="my-2 flex flex-col gap-2">
                {workExperience.map((experience, index) => {
                    return (
                        <div
                            key={index}
                            className="border border-purple-400/90 p-2 rounded-lg relative md:p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Company"
                                    placeHolder={'ABC Corp'}
                                    type="text"
                                    value={experience.companyName || ''}
                                    onChange={(e) =>
                                        updateArrayItem(
                                            index,
                                            'companyName',
                                            e.target.value
                                        )
                                    }
                                />
                                <Input
                                    label={'Role'}
                                    placeHolder={'Frontend Developer'}
                                    type={'text'}
                                    value={experience.role || ''}
                                    onChange={(e) =>
                                        updateArrayItem(
                                            index,
                                            'role',
                                            e.target.value
                                        )
                                    }
                                />
                                <Input
                                    label={'Start Date'}
                                    type={'month'}
                                    value={
                                        experience.startDate
                                            ? new Date(
                                                  experience.startDate
                                              ).toLocaleDateString('en-CA', {
                                                  year: 'numeric',
                                                  month: '2-digit',
                                              })
                                            : ''
                                    }
                                    onChange={(e) =>
                                        updateArrayItem(
                                            index,
                                            'startDate',
                                            e.target.value
                                        )
                                    }
                                />
                                <Input
                                    label={'End Date'}
                                    type={'month'}
                                    value={
                                        experience.endDate
                                            ? new Date(
                                                  experience.endDate
                                              ).toLocaleDateString('en-CA', {
                                                  year: 'numeric',
                                                  month: '2-digit',
                                              })
                                            : ''
                                    }
                                    onChange={(e) =>
                                        updateArrayItem(
                                            index,
                                            'endDate',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="mt-4">
                                <label className="text-xs font-medium text-slate-600">
                                    Description
                                </label>
                                <textarea
                                    placeholder="What did you do in this role?"
                                    className="input-box w-full bg-transparent outline-none text-sm md:text-lg"
                                    rows={6}
                                    value={experience.description || ''}
                                    onChange={(e) =>
                                        updateArrayItem(
                                            index,
                                            'description',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            {workExperience.length > 1 && (
                                <button
                                    type="button"
                                    className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
                                    onClick={() => removeArrayItem(index)}>
                                    <LuTrash2 />
                                </button>
                            )}
                        </div>
                    );
                })}
                <button
                    type="button"
                    className="self-center md:self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-600 text-sm font-medium hover:bg-purple-200 cursor-pointer"
                    onClick={() =>
                        addArrayItem({
                            companyName: '',
                            role: '',
                            startDate: '',
                            endDate: '',
                            description: '',
                        })
                    }>
                    <LuPlus />
                    Add Work Experience
                </button>
            </div>
        </div>
    );
};

export default WorkExperienceForm;

import React from 'react';
import Input from '../../components/inputs/Input';
import { LuPlus, LuTrash2 } from 'react-icons/lu';
import RatingInput from '../../components/ResumeSections/RatingInput';

const SkillsInfoForm = ({
    skillsInfo,
    updateArrayItem,
    addArrayItem,
    removeArrayItem,
}) => {
    return (
        <div className="px-5 pt-3">
            <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
            <div className="mt-4 flex flex-col gap-4 mb-3">
                {skillsInfo.map((skill, index) => (
                    <div
                        className="border border-gray-200/80 p-4 rounded-lg relative"
                        key={index}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label={'Skill Name'}
                                placeHolder={'JavaScript'}
                                type={'text'}
                                value={skill.skillName || ''}
                                onChange={(e) =>
                                    updateArrayItem(
                                        index,
                                        'skillName',
                                        e.target.value
                                    )
                                }
                            />
                            <div className=" flex flex-col">
                                <label className="text-[13px] text-slate-800 mb-1">
                                    Proficiency ({skill.progressLevel / 20 || 0}
                                    /5)
                                </label>
                                <div className="mt-5">
                                    <RatingInput
                                        value={skill.progressLevel || 0}
                                        total={5}
                                        onChange={(newValue) =>
                                            updateArrayItem(
                                                index,
                                                'progressLevel',
                                                newValue
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        {skillsInfo.length > 1 && (
                            <button
                                type="button"
                                className="absolute top-3 right-3 text-sm text-red-600 hover:undelrine cursor-pointer"
                                onClick={() => removeArrayItem(index)}>
                                <LuTrash2 />
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"
                    onClick={() =>
                        addArrayItem({ skillName: '', progressLevel: 0 })
                    }>
                    <LuPlus /> Add Skill
                </button>
            </div>
        </div>
    );
};

export default SkillsInfoForm;

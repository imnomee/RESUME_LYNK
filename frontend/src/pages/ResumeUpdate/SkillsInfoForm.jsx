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
        <div className="p-3 md:p-5">
            <h2 className="text-base md:text-lg font-semibold text-gray-900">
                Skills
            </h2>
            <div className="my-2 flex flex-col gap-2">
                {skillsInfo.map((skill, index) => (
                    <div
                        className="border border-purple-400/90 p-2 rounded-lg relative md:p-4"
                        key={index}>
                        <div className="flex items-center">
                            <div className="flex-1/6">
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
                            </div>
                            <div className=" flex flex-col items-center flex-1">
                                <label className="text-xs md:text-sm text-gray-600">
                                    Proficiency ({skill.progressLevel / 20 || 0}
                                    /5)
                                </label>
                                <div className="mt-2">
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
                    className="self-center md:self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"
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

import Input from '../../components/inputs/Input';
import { LuTrash2, LuPlus } from 'react-icons/lu';

const EducationDetailsForm = ({
    educationInfo,
    updateArrayItem,
    addArrayItem,
    removeArrayItem,
}) => {
    return (
        <div className="p-3 md:p-5">
            <h2 className="text-base md:text-lg font-semibold text-gray-900">
                Education
            </h2>
            <div className="my-2 flex flex-col gap-2">
                {educationInfo.map((education, index) => (
                    <div
                        className="border border-purple-400/90 p-2 rounded-lg relative md:p-4"
                        key={index}>
                        <div className="flex flex-col gap-2">
                            <Input
                                label={'Degree'}
                                placeHolder={'B.Tech in Computer Science'}
                                type={'text'}
                                value={education.degree || ''}
                                onChange={(e) =>
                                    updateArrayItem(
                                        index,
                                        'degree',
                                        e.target.value
                                    )
                                }
                            />
                            <Input
                                label={'Institution'}
                                placeHolder={'XYZ University'}
                                type={'text'}
                                value={education.institutionName || ''}
                                onChange={(e) =>
                                    updateArrayItem(
                                        index,
                                        'institutionName',
                                        e.target.value
                                    )
                                }
                            />
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <Input
                                        label={'Start Date'}
                                        type={'month'}
                                        value={
                                            education.startDate
                                                ? new Date(
                                                      education.startDate
                                                  ).toLocaleDateString(
                                                      'en-CA',
                                                      {
                                                          year: 'numeric',
                                                          month: '2-digit',
                                                      }
                                                  )
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
                                </div>
                                <div className="flex-1">
                                    <Input
                                        label={'End Date'}
                                        type={'month'}
                                        value={
                                            education.endDate
                                                ? new Date(
                                                      education.endDate
                                                  ).toLocaleDateString(
                                                      'en-CA',
                                                      {
                                                          year: 'numeric',
                                                          month: '2-digit',
                                                      }
                                                  )
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
                            </div>
                        </div>
                        {educationInfo.length > 1 && (
                            <button
                                type="button"
                                className=" absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
                                onClick={() => removeArrayItem(index)}>
                                <LuTrash2 />
                            </button>
                        )}
                    </div>
                ))}
                <button
                    className="self-center md:self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-600 text-sm font-medium  hover:bg-purple-200 cursor-pointer"
                    type="button"
                    onClick={() =>
                        addArrayItem({
                            degree: '',
                            institutionName: '',
                            startDate: '',
                            endDate: '',
                        })
                    }>
                    <LuPlus /> Add Education
                </button>
            </div>
        </div>
    );
};

export default EducationDetailsForm;

import Input from '../../components/inputs/Input';
import { LuPlus, LuTrash2 } from 'react-icons/lu';
import RatingInput from '../../components/ResumeSections/RatingInput';

const AdditionalInfoForm = ({
    languages,
    updateLanguage,
    addLanguage,
    removeLanguage,
    interests,
    updateInterest,
    addInterest,
    removeInterest,
}) => {
    return (
        <div className="p-3 md:p-5">
            <h2 className="text-base md:text-lg font-semibold text-gray-900">
                Additional Info
            </h2>
            <div className="my-4">
                <h3 className="text-sm font-semibold text-purple-700 mb-2">
                    Languages
                </h3>
                <div className="my-2 flex flex-col gap-2">
                    {languages.map((lang, index) => (
                        <div
                            key={index}
                            className="border border-purple-400/90 p-2 rounded-lg relative md:p-4">
                            <div className="flex items-center">
                                <div className="flex-1/6">
                                    <Input
                                        label={'Language'}
                                        placeHolder={'e.g. English'}
                                        value={lang.name || ''}
                                        onChange={(e) =>
                                            updateLanguage(
                                                index,
                                                'name',
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="flex flex-col items-center flex-1">
                                    <label className="text-xs md:text-sm text-gray-600">
                                        Proficiency
                                    </label>
                                    <div className="mt-2">
                                        <RatingInput
                                            value={lang.progressLevel || 0}
                                            onChange={(value) =>
                                                updateLanguage(
                                                    index,
                                                    'progressLevel',
                                                    value
                                                )
                                            }
                                            total={5}
                                            activeColor={'#0ea5e9'}
                                            inactiveColor={'#e0f2fe'}
                                        />
                                    </div>
                                </div>
                            </div>
                            {languages.length > 1 && (
                                <button
                                    type="button"
                                    className="absolute top-3 right-3 text-sm text-red-600 hover:undelrine cursor-pointer"
                                    onClick={() => removeLanguage(index)}>
                                    <LuTrash2 />
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        className="self-center md:self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"
                        onClick={() =>
                            addLanguage({ name: '', progressLevel: 0 })
                        }>
                        <LuPlus /> Add Language
                    </button>
                </div>
            </div>
            <div className="my-4">
                <h3 className="text-sm font-semibold text-purple-700 mb-2">
                    Interests
                </h3>
                <div className="flex flex-col gap-1">
                    {interests.map((interest, index) => (
                        <div key={index} className="relative">
                            <Input
                                placeHolder={'e.g. Reading'}
                                value={interest || ''}
                                onChange={(e) =>
                                    updateInterest(index, null, e.target.value)
                                }
                            />
                            {interests.length > 1 && (
                                <button
                                    type="button"
                                    className="absolute top-3 md:top-6.5 right-3 text-sm text-red-600 hover:undelrine cursor-pointer"
                                    onClick={() => removeInterest(index)}>
                                    <LuTrash2 />
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        className="self-center md:self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"
                        onClick={() => addInterest('')}>
                        <LuPlus /> Add Interest
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdditionalInfoForm;

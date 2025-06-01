import Input from '../../components/inputs/Input';
import { LuPlus, LuTrash2 } from 'react-icons/lu';

const ProjectInfoForm = ({
    projectInfo,
    updateArrayItem,
    addArrayItem,
    removeArrayItem,
}) => {
    return (
        <div className="px-5 pt-5">
            <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
            <div className="mt-4 flex flex-col gap-4 mb-3">
                {projectInfo.map((project, index) => (
                    <div
                        key={index}
                        className="border border-gray-200/80 p-4 rounded-lg relative">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <Input
                                className="w-full"
                                label={'Project Title'}
                                placeHolder={'Portfolio Website'}
                                type="text"
                                value={project.projectName || ''}
                                onChange={(e) =>
                                    updateArrayItem(
                                        index,
                                        'projectName',
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="text-xs font-medium text-slate-600">
                                Description
                            </label>
                            <textarea
                                className="input-box"
                                placeholder="Short description about the project"
                                rows={3}
                                value={project.description || ''}
                                onChange={(e) =>
                                    updateArrayItem(
                                        index,
                                        'description',
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                            <Input
                                label={'Project Link'}
                                placeholder="https://github.com/imnomee"
                                type={'url'}
                                value={project.projectLink || ''}
                                onChange={(e) =>
                                    updateArrayItem(
                                        index,
                                        'projectLink',
                                        e.target.value
                                    )
                                }
                            />
                            <Input
                                label={'Live Demo Link'}
                                placeholder="http://nrportfolio.site"
                                type={'url'}
                                value={project.liveDemo || ''}
                                onChange={(e) =>
                                    updateArrayItem(
                                        index,
                                        'liveDemo',
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        {projectInfo.length > 1 && (
                            <button
                                type="button"
                                className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
                                onClick={() => removeArrayItem(index)}>
                                <LuTrash2 className="inline-block" />
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"
                    onClick={() =>
                        addArrayItem({
                            projectName: '',
                            description: '',
                            projectLink: '',
                            liveDemo: '',
                        })
                    }>
                    <LuPlus /> Add Project
                </button>
            </div>
        </div>
    );
};

export default ProjectInfoForm;

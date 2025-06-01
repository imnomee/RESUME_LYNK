import React from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, label, placeHolder, type }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div>
            <label className="text-base text-shadow-lime-800">{label}</label>
            <div className="input-box">
                <input
                    type={
                        type === 'password'
                            ? showPassword
                                ? 'text'
                                : 'password'
                            : type
                    }
                    placeholder={placeHolder}
                    className=" w-full bg-transparent outline-none"
                    value={value}
                    onChange={(e) => onChange(e)}
                />
                {type === 'password' && (
                    <>
                        {showPassword ? (
                            <FaRegEye
                                size={22}
                                className=" text-primary cursor-pointer"
                                onClick={() => toggleShowPassword()}
                            />
                        ) : (
                            <FaRegEyeSlash
                                size={22}
                                className="text-slate-400 cursor-pointer"
                                onClick={() => toggleShowPassword()}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Input;

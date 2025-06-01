import React from 'react';

const Modal = ({
    children,
    isOpen,
    onClose,
    title,
    hideHeader,
    showActionBtn,
    actionBtnIcon = null,
    actionBtnText,
    onActionClick,
}) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/50">
            <div
                className={`relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden`}>
                {!hideHeader && (
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h3 className="md:text-lg font-medium text-gray-900">
                            {title}
                        </h3>
                        {showActionBtn && (
                            <button
                                onClick={onActionClick}
                                className="btn-small-light mr-12">
                                {actionBtnIcon}
                                {actionBtnText}
                            </button>
                        )}
                    </div>
                )}
                <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5"
                    onClick={onClose}>
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14">
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1l6 6m0 0l6 7l6-6m7 7l-6 6m0 0l-6-6m0 0L1 1m6 6l7-7m-7 7l-7 7m0 0l6-6m0 0L1 1m6 6l7-7m-7 7l-7 7m0 0l6-6m0 0L1 1"
                        />
                    </svg>
                </button>
                <div className="flex-1 overflow-y-auto cutom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;

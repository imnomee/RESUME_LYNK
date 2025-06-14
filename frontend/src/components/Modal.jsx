import React, { useEffect } from 'react';

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
    showDownloadBtn,
    downloadBtnText,
    downloadBtnIcon,
    onDownloadClick,
    width = '90vw',
    height = 'auto',
}) => {
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
            <div
                className="relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden"
                style={{
                    width: 'fit-content',
                    maxWidth: width,
                    height,
                    maxHeight: '90vh',
                }}>
                {!hideHeader && (
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h3 className="md:text-lg font-medium text-gray-900">
                            {title}
                        </h3>
                        {showActionBtn && (
                            <button
                                onClick={onActionClick}
                                className="btn-small-light mr-2">
                                {actionBtnIcon}
                                {actionBtnText}
                            </button>
                        )}
                        {showDownloadBtn && (
                            <button
                                onClick={onDownloadClick}
                                className="btn-small-light mr-6">
                                {downloadBtnIcon}
                                {downloadBtnText}
                            </button>
                        )}
                    </div>
                )}

                <button
                    type="button"
                    className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5"
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
                            d="M1 1l12 12M13 1L1 13"
                        />
                    </svg>
                </button>

                <div className="overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;

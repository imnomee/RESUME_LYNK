// Modal Component
// -----------------------------------------------------
// Purpose: Reusable modal component with optional header, action buttons,
// download button, close functionality, and accessible features.
// Features:
// - ESC key closes modal
// - Clicking outside closes modal
// - Disables background scroll on open

import React, { useEffect, useRef } from 'react';

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
    const modalRef = useRef(null);

    // Disable body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Handle ESC key press to close modal
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose?.();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Handle outside click to close modal
    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose?.();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex justify-center items-center bg-black/50"
            onMouseDown={handleClickOutside}>
            <div
                ref={modalRef}
                className="relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden"
                style={{
                    width: 'fit-content',
                    maxWidth: width,
                    height,
                    maxHeight: '90vh',
                }}>
                {/* Header section (optional) */}
                {!hideHeader && (
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h3 className="md:text-lg font-medium text-gray-900">
                            {title}
                        </h3>

                        <div className="flex gap-2 mr-4">
                            {showActionBtn && (
                                <button
                                    onClick={onActionClick}
                                    className="btn-small-light mr-2 flex items-center gap-1">
                                    {actionBtnIcon}
                                    <span className="hidden md:inline">
                                        {actionBtnText}
                                    </span>
                                </button>
                            )}
                            {showDownloadBtn && (
                                <button
                                    onClick={onDownloadClick}
                                    className="btn-small-light mr-6 flex items-center gap-1">
                                    {downloadBtnIcon}
                                    <span className="hidden md:inline">
                                        {downloadBtnText}
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Close button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5"
                    aria-label="Close modal">
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

                {/* Modal body */}
                <div className="overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;

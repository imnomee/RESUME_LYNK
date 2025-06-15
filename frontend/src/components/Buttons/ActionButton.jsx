/**
 * ActionButton
 * A small reusable button with optional icon, loading state, and accessibility features.
 *
 * Props:
 * - text (string): Button label text
 * - onClick (function): Click handler
 * - icon (JSX.Element): Optional icon element
 * - disabled (boolean): Whether the button is disabled
 * - loading (boolean): Show loading text and disable button interaction
 * - tip (string): Tooltip text (optional)
 */
const ActionButton = ({
    text,
    onClick,
    icon,
    disabled = false,
    loading = false,
    tip,
}) => {
    return (
        <button
            className={`btn-small-light ${
                disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={onClick}
            disabled={disabled || loading} // ✅ Prevent interactions when disabled or loading
            title={tip || undefined} // ✅ Show tip as native browser tooltip
            aria-label={tip || text || 'Action button'} // ✅ Fallback for screen readers
        >
            {icon}
            <span className="hidden lg:block">
                {loading ? 'Loading...' : text}
            </span>
        </button>
    );
};

export default ActionButton;

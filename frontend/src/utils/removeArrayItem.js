// src/utils/removeArrayItem.js

/**
 * Removes an item from an array in a given resume section.
 *
 * @param {Function} setState - The state setter (e.g., setResumeData)
 * @param {string} section - The section name (e.g., 'experience')
 * @param {number} index - The index of the item to remove
 */
const removeArrayItem = (setState, section, index) => {
    setState((prevState) => {
        const updatedArray = [...prevState[section]];
        updatedArray.splice(index, 1); // Remove item at index
        return {
            ...prevState,
            [section]: updatedArray,
        };
    });
};

export default removeArrayItem;

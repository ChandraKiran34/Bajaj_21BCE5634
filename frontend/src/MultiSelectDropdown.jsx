import React from 'react';

const MultiSelectDropdown = ({ options, onChange }) => {
    return (
        <select multiple={true} onChange={onChange}>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default MultiSelectDropdown;

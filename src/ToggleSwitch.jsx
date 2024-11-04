import React, { useState } from 'react';

const ToggleSwitch = ({ label, onChange }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = (e) => {
        e.preventDefault();
        setIsChecked(!isChecked);
        onChange(!isChecked); // Llama a la función onChange con el nuevo estado
    };

    return (
        <div className="flex items-center">
            <span className="mr-2">{label}</span>
            <button
                onClick={handleToggle}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out ${
                    isChecked ? 'bg-blue-600' : 'bg-gray-200'
                }`}
            >
                <span
                    className={`transform transition duration-200 ease-in-out block w-5 h-5 rounded-full bg-white shadow-md ${
                        isChecked ? 'translate-x-5' : 'translate-x-1'
                    }`}
                />
            </button>
        </div>
    );
};

export default ToggleSwitch;

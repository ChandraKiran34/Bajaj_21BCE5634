import React, { useState } from 'react';

const JsonInput = ({ onSubmit }) => {
    const [jsonInput, setJsonInput] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        try {
            const parsedData = JSON.parse(jsonInput);
            onSubmit(parsedData);
            setError('');
        } catch (e) {
            setError('Invalid JSON format');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Enter JSON data"
            />
            <button onClick={handleSubmit}>Submit</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default JsonInput;

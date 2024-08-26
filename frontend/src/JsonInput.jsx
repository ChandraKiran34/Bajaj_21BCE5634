import React, { useState } from 'react';

const JsonInput = ({ onSubmit }) => {
    const [jsonInput, setJsonInput] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        console.log("JsonInput handleSubmit called"); 
        try {
            // Replace curly quotes and other non-standard quotes with standard quotes
            const normalizedInput = jsonInput
            .replace(/[“”„”«»]/g, '"') // Replace various types of double curly quotes
            .replace(/[‘’‚‛‹›]/g, "'") // Replace various types of single curly quotes
            .replace(/\s+/g, ' ') // Replace multiple whitespace with a single space
            .trim(); // Remove leading and trailing whitespace

            // Attempt to parse the JSON
            console.log("Normalized Input:", normalizedInput);

            // Attempt to parse the JSON
            const parsedData = JSON.parse(normalizedInput);
            console.log("parsedData", parsedData);
    
            
            // If successful, pass parsed data to onSubmit and clear any error
            onSubmit(parsedData);
            setError('');
        } catch (e) {
            // Set error message if JSON parsing fails
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

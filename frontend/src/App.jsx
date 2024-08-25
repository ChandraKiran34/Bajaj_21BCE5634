import React, { useState, useEffect } from 'react';
import JsonInput from './JsonInput';
import MultiSelectDropdown from './MultiSelectDropdown';

const App = () => {
    const [response, setResponse] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        document.title = '21BCE5634'; // Replace with your roll number
    }, []);

    const handleJsonSubmit = async (jsonData) => {
        try {
            const res = await fetch('http://localhost:3000/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            });
            const data = await res.json();
            console.log(data);
            setResponse(data);
            setShowDropdown(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDropdownChange = (event) => {
        const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
        setSelectedOptions(selectedValues);
    };

    const filteredResponse = () => {
      if (!response) return null;
      let result = {};
      if (selectedOptions.includes('Alphabets') && response.alphabets) {
        result['Alphabets'] = response.alphabets.map((alphabet) => alphabet.replace(/["]/g, ""));
      }
      if (selectedOptions.includes('Numbers') && response.numbers) {
        result['Numbers'] = response.numbers;
      }
      if (selectedOptions.includes('Highest lowercase alphabet') && response.highest_lowercase_alphabet) {
        result['Highest lowercase alphabet'] = response.highest_lowercase_alphabet;
      }
      return result;
    };

    return (
        <div>
            <h1>21BCE5634</h1> {/* Replace with your roll number */}
            <JsonInput onSubmit={handleJsonSubmit} />
            {showDropdown && (
                <MultiSelectDropdown
                    options={['Alphabets', 'Numbers', 'Highest lowercase alphabet']}
                    onChange={handleDropdownChange}
                />
            )}
            {response && (
                <div>
                    <h3>Response:</h3>
                    <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default App;

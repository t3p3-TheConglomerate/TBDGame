import React, { useState } from 'react';

function PasswordValidator({ ruleSets }) {
    const [password, setPassword] = useState('');
    const [currentRuleSetIndex, setCurrentRuleSetIndex] = useState(0);
    const [validationRequirements, setValidationRequirements] = useState([]);
    const [playerLevel, setPlayerLevel] = useState(1); // Track player level

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
    };

    const handleSubmit = () => {
        validatePassword();
    };

    const validatePassword = () => {
        if (ruleSets && ruleSets[currentRuleSetIndex]) {
            const currentRuleSet = ruleSets[currentRuleSetIndex];
            const requirements = [];

            if (password.trim().length === 0) {
                requirements.push('Password cannot be empty.');
            } else {
                for (const rule of currentRuleSet) {
                    if (!rule.validator(password)) {
                        requirements.push(rule.message);
                    }
                }
            }

            setValidationRequirements(requirements);

            if (requirements.length === 0) {
                // If all requirements are met, move to the next rule set
                setCurrentRuleSetIndex(currentRuleSetIndex + 1);
                setPlayerLevel(playerLevel + 1); // Increment player level
            }
        }
    };

    return (
        <div>
            <h1>Password Validator</h1>
            <h2>Level {playerLevel}</h2>
            <input
                type="text"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
            />
            <button onClick={handleSubmit}>Submit</button>
            {currentRuleSetIndex < ruleSets.length ? (
                <div>
                    <h2>Requirements for Level {playerLevel}:</h2>
                    <ul>
                        {ruleSets[currentRuleSetIndex].map((rule, index) => (
                            <li key={index}>{rule.message}</li>
                        ))}
                    </ul>
                    <h2>Validation Requirements:</h2>
                    <ul>
                        {validationRequirements.map((requirement, index) => (
                            <li key={index}>{requirement}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    <p>Password meets all requirements for Level {playerLevel}!</p>
                    <button onClick={() => setCurrentRuleSetIndex(0)}>Next Level</button>
                </div>
            )}
        </div>
    );
}

export default PasswordValidator;
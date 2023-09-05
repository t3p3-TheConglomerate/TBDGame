import React from 'react';
import PasswordValidator from '../components/PasswordValidator';

function Test() {
    // Define your sets of validation rules as an array of arrays
    const currentRuleSet= [];
    const ruleSets = [
        [
            {
                validator: (password) => password.length >= 8,
                message: 'Password must be at least 8 characters long.',
            },
            // {
            //     validator: (password) => /[A-Z]/.test(password),
            //     message: 'Password must contain at least one uppercase letter.',
            // },
            // {
            //     validator: (password) => /[a-z]/.test(password),
            //     message: 'Password must contain at least one lowercase letter.',
            // },
            {
                validator: (password) => /[a-z]/.test(password),
                message: 'Password must contain at least one letter.',
            },
            {
                validator: (password) => /[0-9]/.test(password),
                message: 'Password must contain at least one number.',
            }
        ],
        [
            {
                validator: (password) => /\W_/.test(password),
                message: 'Password must contain at least one special character.',
            },
        ],
        // Add more rule sets if needed
    ];

    return (
        <div>
            <PasswordValidator ruleSets={ruleSets} />
        </div>
    );
}

export default Test;
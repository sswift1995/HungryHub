import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const ProfileScreen = () => {
    const navigate = useNavigate();
    const { dbUser } = useAuthContext();

    // Redirect based on the authentication status
    if (dbUser) {
        navigate("/", { replace: true }); // Redirect to the home page
    }

    return (
        <div>
            {/* Your profile screen content */}
        </div>
    );
};

export default ProfileScreen;

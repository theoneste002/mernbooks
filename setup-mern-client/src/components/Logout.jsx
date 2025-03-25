import React, { useContext } from 'react';
import { AuthContext } from '../contects/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const Logout = () => {
    const { logout } = useContext(AuthContext);  
    const navigate = useNavigate();
    const location = useLocation();

    // Ensure a valid redirect path after logout
    const redirectPath = location.state?.from?.pathname || '/';   

    const handleLogout = async () => {
        try {
            await logout(); // Logout function
            alert("Logout successfully!"); 
            navigate(redirectPath, { replace: true }); // Redirect after logout
        } catch (error) {
            console.error("Logout failed:", error.message);
            alert("Logout failed. Please try again.");
        }
    };

    return (
        <div className='h-screen bg-teal-100 flex items-center justify-center'>
            <button className='bg-red-700 px-8 py-2 text-white rounded' onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Logout;

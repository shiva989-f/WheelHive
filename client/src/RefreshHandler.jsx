import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RefreshHandler = ({ setIsAuthenticated }) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setIsAuthenticated(true);

            // Redirect to home if on login/signup
            if(location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/') {
                navigate('/all-cars', { replace: false });
            }
        }
        // useEffect execute this when location, setIsAuthenticated or navigate will change
    }, [location, setIsAuthenticated, navigate]);

    return null;
};

export default RefreshHandler;

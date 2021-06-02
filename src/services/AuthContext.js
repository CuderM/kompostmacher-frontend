import { createContext, useEffect, useRef, useState } from "react";
import { authService } from './authService';

const pollingTimeout = 1000;

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    let pollingJob = useRef(null);
    const componentIsMounted = useRef(null);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        function cleanUp() {
            stopPolling();
            componentIsMounted.current = false;
        }

        componentIsMounted.current = true;
        loadCurrentUser(false);

        if(currentUser._id)
            startPolling();

        return cleanUp;
    }, []);

    function startPolling() {
        pollingJob.current = setInterval(loadCurrentUser, pollingTimeout);
    }

    function stopPolling() {
        clearInterval(pollingJob.current);
        pollingJob.current = null;
    }

    const login = async (credentials) => {
        try {
            await authService.login(credentials);
            await loadCurrentUser();
            startPolling();
            return Promise.resolve();
        } catch (ex) {
            setCurrentUser({});
            return Promise.reject(ex);
        }
    };

    const logout = async () => {
        setCurrentUser({});
        stopPolling();
        return authService.logout();
    };

    const loadCurrentUser = async (useCache = true) => {
        try {
            setCurrentUser(await authService.getCurrentUser(useCache));
        } catch (ex) {
            if (ex.status >= 400)
                setCurrentUser({});
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
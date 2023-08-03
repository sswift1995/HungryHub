import { createContext, useEffect, useState, useContext } from "react";
import { Auth } from "aws-amplify";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null)
    const [dbUser, setDbUser] = useState(null)

    useEffect(() => {
        Auth.currentAuthenticatedUser({ bypassCache: true })
            .then(setAuthUser)
    }, [])

    const sub = authUser?.attribute?.sub;

    return (
        <AuthContextProvider value={{ authUser, dbUser, sub }}>
            {children}
        </AuthContextProvider>
    )
}

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext)

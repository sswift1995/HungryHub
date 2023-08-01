import { createContext, useEffect, useState } from "react";
import { Auth } from "aws-amplify";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null)
    const [dbUser, setDbUser] = useState(null)

    useEffect(() => {
        Auth.currentAuthenticatedUser({ bypassCache: true })
            .then(setAuthUser)
    }, [])

    console.log('auth user: ', authUser)

    return (
        <AuthContextProvider value={{ authUser, dbUser }}>
            {children}
        </AuthContextProvider>
    )
}

import { createContext, useEffect } from "react";
import { useState } from 'react/cjs/react.production.min';
import { Auth } from 'aws-amplify'


const AuthContext = createContext ({ children });

const AuthContextProvider = () => {
    const [authUser, setAuthUser] = useState(null);
    const [dbUser, setDbUser] = useState(null);

    useEffect(() => {
        Auth.currentAuthenticatedUser({ bypassCache: true }).then(setAuthUser);
}, []);

    const sub = authUser?.attributes?.sub;

    return (
        <AuthContext.Provider value={{ authUser, dbUser }}>{children}</AuthContext.Provider>
    )
}

export default AuthContextProvider;

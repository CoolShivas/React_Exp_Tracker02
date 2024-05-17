import React, { createContext, useState } from 'react'

const ExpContext = createContext({
    token: "",
    isLoggedIn: false,
    logIn: () => { },
    logOut: () => { },
});


export const ExpTraContextProvider = (props) => {

    const [token, setToken] = useState(null);

    const [isUserLogIn, setIsUserLogIn] = useState(token);

    const handlerOnLogIn = (idTokey) => {
        setToken(idTokey);
        localStorage.setItem("SaveToken", idTokey);
        setIsUserLogIn(true);
    };

    const handlerOnLogOut = () => {
        setToken(null);
        localStorage.removeItem("SaveToken");
        setIsUserLogIn(false);
    };

    const expTraValue = {
        token: token,
        isLoggedIn: isUserLogIn,
        logIn: handlerOnLogIn,
        logOut: handlerOnLogOut,
    };

    return <ExpContext.Provider value={expTraValue}>
        {props.children}
    </ExpContext.Provider>
};


export default ExpContext;
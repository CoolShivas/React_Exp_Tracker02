// import React, { createContext, useState } from 'react'

// const ExpContext = createContext({
//     token: "",
//     isLoggedIn: false,
//     logIn: () => { },
//     logOut: () => { },
// });


// export const ExpTraContextProvider = (props) => {

//     const [token, setToken] = useState(null);

//     const [isUserLogIn, setIsUserLogIn] = useState(token);

//     const handlerOnLogIn = (idTokey) => {
//         setToken(idTokey);
//         localStorage.setItem("SaveToken", idTokey);
//         setIsUserLogIn(true);
//     };

//     const handlerOnLogOut = () => {
//         setToken(null);
//         localStorage.removeItem("SaveToken");
//         setIsUserLogIn(false);
//     };

//     const expTraValue = {
//         token: token,
//         isLoggedIn: isUserLogIn,
//         logIn: handlerOnLogIn,
//         logOut: handlerOnLogOut,
//     };

//     return <ExpContext.Provider value={expTraValue}>
//         {props.children}
//     </ExpContext.Provider>
// };


// export default ExpContext;







///////////******************************************************************************* */



import { configureStore, createSlice } from "@reduxjs/toolkit";




const INITIAL_VALUE = {
    isAuthenticated: false,
};


const authSlice = createSlice({
    name: "Authentication",
    initialState: INITIAL_VALUE,
    reducers: {
        signup: (currState, action) => {
            currState.isAuthenticated = true;
        },
        login: (currState, action) => {
            currState.isAuthenticated = true;
        },
        logout: (currState, action) => {
            currState.isAuthenticated = false;
        },
    }
});


const INITIAL_ADD_EXPENSES = {
    expensing: []
};


const addExpSlice = createSlice({
    name: "Add_Expenses",
    initialState: INITIAL_ADD_EXPENSES,
    reducers: {
        addItems: (currState, action) => {
            currState.expensing = [...currState.expensing, action.payload];
        },
        deleteItems: (currState, action) => {
            currState.expensing = currState.expensing.filter((exp) => {
                exp.id !== action.payload.id
            });
        },
        editItems: (currState, action) => {
            const index = currState.expensing.findIndex((exp) => exp.id === action.payload.id);
            if (index !== -1) {
                currState.expensing[index] = action.payload;
            }
        },
    }
});


const expenseConfigureStore = configureStore({
    reducer: {
        authen: authSlice.reducer,
        addExpenses: addExpSlice.reducer
    }
});


export const authActions = authSlice.actions;

export const addExpActions = addExpSlice.actions;


export default expenseConfigureStore;
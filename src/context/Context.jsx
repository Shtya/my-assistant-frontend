"use client";
import { createContext, useContext, useState } from "react";
const GlobalContext = createContext();

// Provider Component
export const GlobalProvider = ({ children }) => {
    const [collapsed, setCollapsed] = useState(true);

    
    return (
        <GlobalContext.Provider value={{collapsed, setCollapsed}}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useValues = () => {
    return useContext(GlobalContext);
};

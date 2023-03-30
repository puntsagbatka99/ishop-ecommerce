import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const LoginContext = createContext()

export const LoginProvider = ({ children }) => {
    const [login, setLogin] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            setLogin(true)
        }
    }, [])

    return (
        <LoginContext.Provider value={{ login, setLogin }}>
            {children}
        </LoginContext.Provider>
    )
}
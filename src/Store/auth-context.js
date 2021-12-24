import React, {useState} from "react"
const AuthConntext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () =>{},
})

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null)

    const userIsLoggedIn = !!token;

    const loginHandler = (token) =>{
        setToken(token)
    }

    const logoutHandler = ()=>{
        setToken(null)
    }

    const ContextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler,
    }

    return <AuthConntext.Provider value = {ContextValue}>{props.children}</AuthConntext.Provider>
};


export default AuthConntext;
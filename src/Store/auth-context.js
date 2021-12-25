import React, {useState} from "react"
const AuthConntext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () =>{},
})

export const AuthContextProvider = (props) => {

    let tokenId;
    if(localStorage.getItem('TokenId')){
        tokenId = localStorage.getItem('TokenId')
      }
      else{
          tokenId = null;
      }
    const [token, setToken] = useState(tokenId)

    const userIsLoggedIn = !!token;

    const loginHandler = (token) =>{
        setToken(token);
        localStorage.setItem('TokenId', token)
    }

    const logoutHandler = ()=>{
        localStorage.removeItem('TokenId')
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
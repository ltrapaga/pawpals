import React, { useReducer, createContext } from 'react'
import jwtDecode from 'jwt-decode';

const initialState = {
    user: null
  };
  
if (localStorage.getItem('jwtToken')) {
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));
  
    // For security reasons need the token to eventually expire
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem('jwtToken');
    } else {
      initialState.user = decodedToken;
    }
  }

const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
});

//create reducer to receive action with type and payload
function authReducer(state, action){
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
}
function AuthProvider(props){
    const [state, dispatch] = useReducer(authReducer, initialState);

function login(userData){
    //saving the token locally
    localStorage.setItem('jwtToken', userData.token);
    dispatch({
        type: 'LOGIN',
        payload: userData
    });
}

    function logout(){
        //removing token when logged out
        localStorage.removeItem('jwtToken');
        dispatch({ type: 'LOGOUT'});
    }

    return (
        <AuthContext.Provider
        value={{ user: state.user, login, logout }}
        {...props}
      />
        );
}

export { AuthContext, AuthProvider };

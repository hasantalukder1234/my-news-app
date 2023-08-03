import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../components/Firebase/Firebase.config';

 export const AuthContext = createContext(null);

 const auth = getAuth(app);

const AuthProvider = ({children}) => { 
     
    const [user, setUser] = useState(null);

    const createUser =(email,password) =>{
        return createUserWithEmailAndPassword(auth, email,password);
        
    }

    const SignIn =(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password);
    }

    const logOut=()=>{
        return signOut(auth);
    }


    useEffect(()=>{
       const unsubscribe =  onAuthStateChanged(auth, loggedUser =>{
            console.log('loggedUser',loggedUser);
            setUser(loggedUser);
         })
         return () =>{
             unsubscribe();
         }
    },[]);

    const authInfo = {
        user,
        createUser,
        SignIn,
        logOut,
    };
     
    return (
        <AuthContext.Provider value={authInfo}>
             {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
import React, { useContext, useEffect, useState } from "react";
import {auth} from '../firebase'
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { updateEmail, updatePassword } from "firebase/auth";
import { createUser } from "../firebase";
const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password){
        try{
            let signup = createUserWithEmailAndPassword(auth, email, password)

            return signup


        }catch(error){
            console.log(error)
        }
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout(){
        return auth.signOut()
    }

    function resetPassword(email){
        return sendPasswordResetEmail(auth, email)

    }

    function changeEmail(email){
        return updateEmail(currentUser,email)
    }
    function changePassword(password){
        return updatePassword(currentUser, password)
    }

    useEffect( () => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        changeEmail,
        changePassword
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
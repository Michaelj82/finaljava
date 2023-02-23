import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
export default function Privateroute(props){

    const {currentUser} = useAuth()

    return currentUser ? {...props.element} : <Navigate to='/login'></Navigate>

}
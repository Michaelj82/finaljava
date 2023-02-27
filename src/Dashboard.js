import React, { useEffect, useState } from "react";
import { Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import {receiveData} from "./firebase";
export default function Dashboard(props){

    const [error, setError] = useState('')
    const {currentUser, logout} = useAuth()
    const [info, setInfo] = useState({
    })
    const navigate = useNavigate()

    async function handleLogout(){
        setError('')
        console.log(currentUser)
        try{
            await logout()
            navigate('/login')
        }catch{
            setError('Failed to Log Out')
        }
    }

    useEffect(() => {
        try{
            let snapshot = receiveData(currentUser.email, setInfo)
        }catch(error){
            console.log(error)
        }
    }, [])

    return(
        <div>
            <Card>
                <Card.Body>
                <h2 className="text-center mb-4">Hello {info && info.firstName} {info && info.lastName}
                </h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <div><strong>Email: </strong>{currentUser.email}</div>
                <div><strong>User ID: </strong>{currentUser.uid}</div>

                <Link to={'/update-profile'} className='btn btn-primary w-100 mt-3'>Update Profile</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant='link' onClick={handleLogout}>Log Out</Button>
            </div>
        </div>
    )
}
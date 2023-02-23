import React, { useState } from "react";
import { useRef } from "react";
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
export default function Forgotpassword(){

    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading]= useState(false)
    const [message, setMessage] = useState('')

    async function handleSubmit(event){
        event.preventDefault()


        try{
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions')
        }catch(error){
            setError('Failed to reset password')
            console.log(error)
        }
        setLoading(false)
    }

    return(
        <div>
        <Card>
            <Card.Body>
            <h2>Password Reset</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>
                        Email
                    </Form.Label>
                    <Form.Control type="email" ref={emailRef} required></Form.Control>

                </Form.Group>

                <Button disabled={loading} className="w-100" type="submit">Reset Password</Button>

            </Form>
            <div className="w-100 text-center mt-3">
                <Link to={'/login'}>Log In?</Link>
            </div>

            </Card.Body>
        </Card>

        <div className="w-100 text-center mt-2">
            Need an account? <Link to={'/signup'}>Sign Up</Link>
        </div>
        </div>

    )
}
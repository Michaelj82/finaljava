import React, { useState } from "react";
import { useRef } from "react";
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
export default function Login(){

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading]= useState(false)
    const navigate = useNavigate()


    async function handleSubmit(event){
        event.preventDefault()


        try{
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/')
        }catch(error){
            setError('Failed to sign in')
            console.log(error)
        }
        setLoading(false)
    }

    return(
        <div>
        <Card>
            <Card.Body>
            <h2>Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>
                        Email
                    </Form.Label>
                    <Form.Control type="email" ref={emailRef} required></Form.Control>

                </Form.Group>

                <Form.Group id="password">
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control type="password" ref={passwordRef} required></Form.Control>

                </Form.Group>

                <Button disabled={loading} className="w-100" type="submit">Log In</Button>

            </Form>
            <div className="w-100 text-center mt-3">
                <Link to={'/forgot-password'}>Forgot password?</Link>
            </div>

            </Card.Body>
        </Card>

        <div className="w-100 text-center mt-2">
            Need an account? <Link to={'/signup'}>Sign Up</Link>
        </div>
        </div>

    )
}
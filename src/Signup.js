import React, { useState } from "react";
import { useRef } from "react";
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from "./contexts/AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "./firebase";
export default function Signup(){

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading]= useState(false)
    const navigate = useNavigate()

    function turnEmailToReadable(email){
        let newEmail = email.replace('@', 'at')
        newEmail = newEmail.replace('.', 'dot')
        return newEmail

    }

    async function handleSubmit(event){
        event.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }


        try{
            let readable = turnEmailToReadable(emailRef.current.value)
            console.log(readable)
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate('/')
            createUser('bob', 'joeman', emailRef.current.value, readable)

        }catch(error){
            setError('Failed to create an account')
            console.log(error)
        }
        setLoading(false)
    }

    return(
        <div>
        <Card>
            <Card.Body>
            <h2>Sign Up</h2>
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

                <Form.Group id="password-confirm">
                    <Form.Label>
                        Password Confirmation
                    </Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>

                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>

            </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Already have an account? <Link to={'/login'}>Log In</Link>
        </div>

        </div>

    )
}
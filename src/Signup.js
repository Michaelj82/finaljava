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
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading]= useState(false)
    const navigate = useNavigate()


    async function handleSubmit(event){
        event.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }


        try{
            //chagne this to uniqid, just need this for now while edit firebase funcs

            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate('/')
            createUser(firstNameRef.current.value, lastNameRef.current.value, emailRef.current.value, {'profilePic':'', 'posts':'', 'mood': ''})
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
                <Form.Group id="firstName">
                    <Form.Label>
                        First Name
                    </Form.Label>
                    <Form.Control type="text" ref={firstNameRef} required></Form.Control>

                </Form.Group>
                <Form.Group id="lastName">
                    <Form.Label>
                        Last Name
                    </Form.Label>
                    <Form.Control type="lastName" ref={lastNameRef} required></Form.Control>

                </Form.Group>


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
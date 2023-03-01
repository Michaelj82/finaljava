import React, { useState } from "react";
import { useRef } from "react";
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from "./contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { updateData } from "./firebase";
export default function Updateprofile(){

    const emailRef = useRef()
    const passwordRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, changeEmail, changePassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading]= useState(false)
    const navigate = useNavigate()

    function handleSubmit(event){
        let originalEmail = currentUser.email
        event.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }

        //need to make it so that it updates the
        //email and name of file in  database.
        console.log('promises')

        const promises = []
        setLoading(true)
        setError('')
        // if (emailRef.current.value !== currentUser.email){
        //     promises.push(changeEmail(emailRef.current.value))
        // }

        if (passwordRef.current.value){
            promises.push(changePassword(passwordRef.current.value))

        }
        console.log('about to do update')
        Promise.all(promises)
        .then(() => {
            try{
                updateData(firstNameRef.current.value, lastNameRef.current.value, originalEmail)
                navigate('/')
            }catch(error){
                console.log(error)
            }
        }).catch(()=>{
            setError('Failed to update account')
        }).finally(() => {
            setLoading(false)
        })

    }

    return(
        <div>
        <Card>
            <Card.Body>
            <h2>Update Profile</h2>
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

                {/* <Form.Group id="email">
                    <Form.Label>
                        Email
                    </Form.Label>
                    <Form.Control type="email" ref={emailRef}  defaultValue={currentUser.email}></Form.Control>

                </Form.Group> */}

                <Form.Group id="password">
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control type="password" ref={passwordRef}  placeholder="Leave blank to keep the same"></Form.Control>

                </Form.Group>

                <Form.Group id="password-confirm">
                    <Form.Label>
                        Password Confirmation
                    </Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef} required placeholder="Leave blank to keep the same"></Form.Control>

                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">Update</Button>

            </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            <Link to={'/'}>Cancel</Link>
        </div>

        </div>

    )
}
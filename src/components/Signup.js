import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import './css/Global.css'

export default function Signup() {
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  const usersRef = firestore.collection('users');

  const nameList = async (e) => {

    const { uid } = auth.currentUser;

    await usersRef.add({
      text: nameRef.current.value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      nameList()
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <body className="smackground">
      <h1 className="titleLogins">TeamPro</h1>
    <Link className="backBtn" to="/Home"><img src="https://img.icons8.com/ios/50/000000/circled-left-2.png" alt="backbtn"/></Link>
      <Card>
        <Card.Body className="inputBody">
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
          <Form.Group id="name" className="emailInput">
              <Form.Label className="emailHeader">Name</Form.Label>
              <Form.Control className="emailInputBox" type="name" ref={nameRef} required />
            </Form.Group>
            <Form.Group id="email" className="emailInput">
              <Form.Label className="emailHeader">Email</Form.Label>
              <Form.Control className="emailInputBox" type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password" className="emailInput">
              <Form.Label className="emailHeader">Password</Form.Label>
              <Form.Control className="emailInputBox" type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm" className="emailInput">
              <Form.Label className="emailHeader">Confirm Password</Form.Label>
              <Form.Control className="emailInputBox" type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button className="creamButton" style={{ top: "50px"}} disabled={loading} type="submit">
              Continue
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </body>
  )
}

import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import './css/Global.css'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
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
            <Form.Group id="email" className="emailInput">
              <Form.Label className="emailHeader">Email</Form.Label>
              <Form.Control className="emailInputBox" type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password" className="emailInput">
              <Form.Label className="emailHeader">Password</Form.Label>
              <Form.Control className="emailInputBox" type="password" ref={passwordRef} required />
            </Form.Group>
            <Button className="creamButton" disabled={loading} type="submit">
              Continue
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </body>
  )
}

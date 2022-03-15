import React, { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import { Box } from '@chakra-ui/react'
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

import './css/signout.css'

export default function Signout() {
    const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
      <div className="greybackground">
        <Box className="signoutbox">
            <h1 className="signoutquestion">Sign Out?</h1>
            <h2 className="ays" >Are you sure you want to sign out of TeamPro?</h2>
            <Box className="btnbox">
        <Link className="goback" to="/"><h3 className="gobacktext">Go Back</h3></Link>        
        <Button variant="link" onClick={handleLogout} className="signoutbutton"><h3 className="signouttext">Sign Out</h3></Button>
        </Box>
        </Box>
        </div>
  )
}

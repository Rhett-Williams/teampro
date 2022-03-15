import React, { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import ChatBox from "./Users"
import { Box } from '@chakra-ui/react'
import './css/dashboard.css'
import { Text, Flex, Spacer } from '@chakra-ui/react'
import ChatRoom from './Chat'
import { Link } from "react-router-dom"

export default function Dashboard() {
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
    <Box>
    <Box className="backgroundlio" />
    <Box className="logoutsidebar">
        <Text className="Header1">TeamPro</Text>
        <Box className="signoutbtn">    
        <Link className="signoutbtntext" to="/Signout">Sign Out</Link>        
        </Box>
      </Box>
      <Box>
        <Box className="theteamcard">
        <Flex style={{borderBottom: "3px solid #bbb", position: "relative", left: "17px", width: "90%"}}>
          <Box className='theteam'>
            The Team
          </Box>
          <Spacer />
          <Box className="selectallbtn">
          <button className="selectallbtntext" >
            Select All
          </button>
          </Box>
        </Flex>
        <ChatBox />
        <ChatRoom />
        </Box>
      
      </Box>
    </Box>
  )
}

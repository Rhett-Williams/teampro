import React from "react"
import { Link } from "react-router-dom"
import './css/home.css'

export default function Home() {

  return (
    <body className="smackground">
    <h1 className="title">TeamPro</h1>
    <div className="creamBtn"><Link className="creamTxt" to="/signup" >Sign Up</Link>
      </div>
    <div className="greenBtn"><Link  className="creamTxt1" to="/Login">Sign in</Link>
      </div>
    </body>
  )
}

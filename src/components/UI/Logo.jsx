import React from 'react'
import classes from "./Logo.module.css"

const Logo = ({className}) => {
  return (
    <div className={`${classes.logo} ${className || ""}`}>
        Patentic
    </div>
  )
}

export default Logo
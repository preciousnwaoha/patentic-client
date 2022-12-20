import React from 'react'
import { Link } from 'react-router-dom'
import classes from "./NavItem.module.css"

const NavItem = ({ text, link}) => {
  return (
    <Link to={link}>
        <li className={classes["nav-item"]}>
            {text}
        </li>
    </Link>
    
  )
}

export default NavItem
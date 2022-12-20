import React from 'react'
// import { useContext } from 'react'
// import ContractContext from '../../context/contract-context'
import Logo from '../UI/Logo'
import { Link } from 'react-router-dom'
// import { formatAddress } from '../../utils/contractUtils'
import classes from "./Header.module.css"
import Nav from './Nav/Nav'

const Header = () => {
  // const contractCtx = useContext(ContractContext)

  // const {connected, currentAccount} = contractCtx;

  return (
    <header className={classes.header}>
      <Link to={"/"}>
      <Logo />
      </Link>
        
        <Nav />
      
        
    </header>
  )
}

export default Header
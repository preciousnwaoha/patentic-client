import React from 'react'
import { useContext } from 'react'
import NotConnected from '../components/Errors/NotConnected'
import Header from '../components/Layout/Header'
import Patents from '../components/Patents/Patents'
import Button from '../components/UI/Button'
import Loading from '../components/UI/Loading'
import PatentsContext from '../context/patents-context'
import ContractContext from '../context/patents-context'
import classes from "./PatentsPage.module.css"

const PatentsPage = ({forAccount=false}) => {
  const patentsCtx = useContext(PatentsContext)
  const contractCtx = useContext(ContractContext)

  const { connected} = contractCtx


  return (
    <>
      <Header />
      <section className={classes["patents-page"]}>
        
        <h1>Patents</h1>
    
        <Patents forAccount={forAccount} />
        {/* {!connected && <NotConnected />} */}
    </section>
    </>
    
  )
}

export default PatentsPage
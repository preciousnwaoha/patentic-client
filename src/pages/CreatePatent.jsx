import React, { useContext} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import classes from "./CreatePatent.module.css"
import ContractContext from '../context/contract-context'
import Header from '../components/Layout/Header'
import CreatePatentForm from '../components/Patents/CreatePatentForm'

const CreatePatent = () => {
    const params = useParams();
    const navigate = useNavigate();
    const contractCtx = useContext(ContractContext)

    const { connected } = contractCtx


    if (!connected) {
        console.log("not connected")
        return ( 
        <div>
            Error
        </div>
        );
    }

    const backHandler = () => {
        navigate(-1);
    }

  return (
    <>
    <Header />
    <section className={classes["create-patent"]}>
        <h1 className={classes["title"]}>Create Patent</h1>
        <CreatePatentForm />
       
   </section>
    </>
    
  )
}

export default CreatePatent
import React, { useState, useContext } from 'react'
import Header from '../components/Layout/Header'
import Messages from '../components/Messages/Messages';
import Patents from '../components/Patents/Patents';
import ContractContext from '../context/contract-context';
import classes from "./Account.module.css"
import Button from '../components/UI/Button';
import NotConnected from '../components/Errors/NotConnected';

/**
 * 
 * @activeSpace: 0 is Patents, 1 os messages
 */

const Account = () => {
    const contractCtx = useContext(ContractContext)
    const [activeSpace, setActiveSpace ] = useState(0);

    const {connected} = contractCtx

    const changeActiveSpaceHandler = (space) => {

        if (space === "patents") {
            setActiveSpace(0)
            return
        }

        if (space === "messages") {
            setActiveSpace(1)
            return
        }

        if (space === "settings") {
            setActiveSpace(2)
            return
        }

        setActiveSpace(0);
    }

    if (!connected) {
        return (
            <>
                <Header />
                <section className={classes["account"]}>
        <h1 className={classes["title"]}>
            Your Address Space
        </h1>
        <NotConnected />
    </section>
                
            </>
            
        )
    }


  return (
    <>
    <Header />
    <section className={classes["account"]}>
        <h1 className={classes["title"]}>
            Your Address Space
        </h1>
        <div className={classes["space"]}>
            <div className={`${classes["space-title"]} ${activeSpace === 0 ? classes["active-space-title"] : ""}`} onClick={() => changeActiveSpaceHandler("patents")}>
                <h2>Patents</h2>
            </div>
            
            <div className={`${classes["space-title"]} ${activeSpace === 1 ? classes["active-space-title"] : ""}`} onClick={() => changeActiveSpaceHandler("messages")}>
            <h2>Messages</h2>
            </div>
        </div>

        <div className={classes["space-showing"]}>
            {(activeSpace === 0) ? <Patents forAccount={true} /> : <Messages />}
        </div>
    </section>
    </>
    
  )
}

export default Account
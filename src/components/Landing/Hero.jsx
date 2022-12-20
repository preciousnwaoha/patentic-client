import React from 'react'
import { useContext } from 'react'
import ContractContext from '../../context/contract-context'
import Button from '../UI/Button'
import Loading from '../UI/Loading'
import classes from "./Hero.module.css"

const Hero = () => {
    const contractCtx = useContext(ContractContext);

    const {connected, currentAccount } = contractCtx

    const connectWalletHandler = () => {
        contractCtx.connectWallet()
    }

  return (
    <div className={classes.hero}>
        <div className={classes["effect-1"]}></div>
        <div className={classes["effect-2"]}></div>
        
        <h1>
            Your Tamperproof Prove Over Intelectual Properties
        </h1>

        <h3>
            Keep your ideas, lyrics, theorems, write-ups on the blockchain <br /> as immutable proof that you came up with it.
        </h3>

        <div className={classes.actions}>
        {!connected && <Button onClick={connectWalletHandler} className={classes.btn} >Connect Wallet</Button>}
        {connected && <Button type={"link"} link={`/${currentAccount}/create-patent`} className={classes.btn}>Create Patent</Button>}
        </div>

        {false && <Loading />}
        
    </div>
  )
}

export default Hero
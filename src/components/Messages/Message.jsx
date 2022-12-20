import React from 'react'
import { useContext } from 'react'
import ContractContext from '../../context/contract-context'
import { formatAddress } from '../../utils/contractUtils'
import classes from "./Message.module.css"

const Message = ({to, from, patent, timestamp, text}) => {
    const contractCtx = useContext(ContractContext)

    const { currentAccount } = contractCtx
    
    let isSent = (from === currentAccount) ? true : false

    console.log("to: ", to)

    console.log("from: ", from)

  return (
    <li className={classes.message}>
            <div className={classes["left"]}>
                <p  className={classes["text"]}>{text}</p>
                <p className={classes["to-from"]}>{isSent ? `To ${formatAddress(to)}` : `From ${formatAddress(from)}`}</p>
            </div>

        <div className={classes["right"]}>
            <p  className={classes["time"]}>{timestamp}</p>
            <p  className={classes["patent"]}>{patent}</p>
        </div>

    </li>
  )
}

export default Message
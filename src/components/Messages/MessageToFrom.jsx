import React from 'react'
import { formatAddress } from '../../utils/contractUtils'
import {FontAwesomeIcon }from "@fortawesome/react-fontawesome"
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons"
import classes from "./MessageToFrom.module.css"

const MessageToFrom = ({to, from}) => {
  return (
    <div className={classes["to-from"]}>
        <p>
            {formatAddress(to)}
        </p>
        <div>
            <FontAwesomeIcon icon={faArrowRightLong} />
        </div>
        <div className={classes["border-arrow"]}>
            <FontAwesomeIcon icon={faArrowRightLong} />
        </div>
        <p>
            {formatAddress(from)}
        </p>
    </div>
  )
}

export default MessageToFrom
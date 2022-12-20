import React from 'react'
import { useNavigate } from 'react-router-dom'
import { formatAddress, shortenText } from '../../utils/contractUtils'
import classes from "./Patent.module.css"


const Patent = ({patentOwner, timestamp, patentName, patentText, patentType}) => {
  let navigate = useNavigate()

  const patentViewHandler = () => {
    navigate(`/patents/${patentOwner}/${timestamp}`);
  }

  console.log("patentType", patentType)

  return (
    
      <div className={classes.patent} onClick={patentViewHandler}>
        <h2 className={classes["name"]}>{patentName}</h2>
        <p className={classes["content"]}>{shortenText(patentText)}</p>
        <div className={classes["type"]}>
          <p>{patentType}</p>
          </div>
        <p className={classes["owner"]}>Owned By: {formatAddress(patentOwner)}</p>
    </div>
    
    
  )
}

export default Patent
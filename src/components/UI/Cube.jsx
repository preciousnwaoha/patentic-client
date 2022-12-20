import React from 'react'
import classes from "./Cube.module.css"

const Cube = ({className}) => {
  return (
    <div className={`${classes["cube"]} ${className || ""}`}>
        <div className={`${classes["side"]} ${classes["top"]}`}></div>
        <div className={`${classes["side"]} ${classes["left"]}`}></div>
        <div className={`${classes["side"]} ${classes["front"]}`}></div>
        <div className={`${classes["side"]} ${classes["bottom"]}`}></div>
        <div className={`${classes["side"]} ${classes["right"]}`}></div>
        <div className={`${classes["side"]} ${classes["back"]}`}></div>
    </div>
  )
}

export default Cube
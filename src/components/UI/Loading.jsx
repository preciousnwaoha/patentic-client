import React from 'react'
import Cube from './Cube'
import classes from "./Loading.module.css"

const Loading = ({text, className}) => {
  return (
    <div className={`${className || ""} ${classes.loading}`}>
        <div className={classes["icon"]}>
            <Cube className={classes["cube"]}/>
            <Cube className={classes["cube"]} />
            <Cube className={classes["cube"]}/>
            <Cube className={classes["cube"]}/>
            <Cube className={classes["cube"]}/>
        </div>

        <p>Loading {text || ""}</p>
    </div>
  )
}

export default Loading
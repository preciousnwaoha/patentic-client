import React from 'react'
import { useContext } from 'react'
import PatentsContext from '../../context/patents-context'
import useInput from '../../hooks/use-input'
import Button from '../UI/Button'
import classes from "./CreatePatentForm.module.css"

const CreatePatentForm = () => {
    const patentsCtx = useContext(PatentsContext)

    const {
        value: enteredName,
        isValid: nameIsValid,
      hasError: nameHasError,
      valueChangeHandler: nameChangeHandler,
      inputBlurHandler: nameBlurHandler,
      reset: nameResetHandler,
    } = useInput((value) => value.trim() !== "");

    const {
        value: enteredText,
        isValid: textIsValid,
      hasError: textHasError,
      valueChangeHandler: textChangeHandler,
      inputBlurHandler: textBlurHandler,
      reset: textResetHandler,
    } = useInput((value) => value.trim().length >= 50);


    const lorem = 
    `Lorem, ipsum dolor sit amet consectetur address adipisicing elit. 
    Aperiam error eaque commodi culpa beatae fuga, 
    sed sit ea quod, 
    atque obcaecati illum ipsam? 
    Cumque dolores earum modi veritatis ex tenetur!`

    const submitHandler = async (e) => {
        e.preventDefault();
        
        if (!nameIsValid && !textIsValid) {
            console.log("failed sending");
            return
        }

        const text = enteredText.replace(/\n/g, '<br />');

        await patentsCtx.addPatent(enteredName, text, "Writing");

        console.log("enteredName: ", enteredName);
        console.log("enteredText: ", text);
        console.log("sent")

        nameResetHandler();
        textResetHandler();
    }


  return (
    <form className={classes["create-patent-form"]} onSubmit={submitHandler}>
        <div className={classes.text}>
            <label htmlFor='patent-name'>Name</label>
            <input value={enteredName} type={"text"} id={"patent-name"} placeholder={"Some Name"} onChange={nameChangeHandler} onBlur={nameBlurHandler} />
            <p className={`${nameHasError && classes.error}`}>name is too short!</p>
            <label htmlFor='patent-text'>Content</label>
            <textarea value={enteredText} id={"patent-text"} placeholder={lorem} onChange={textChangeHandler} onBlur={textBlurHandler}></textarea>
            <p className={`${textHasError && classes.error}`}>description is too short</p>
        </div>
        <div className={classes.actions}>
            <div className={classes.type}>
                Select Category
            </div>
            
            <div className={classes["fee-note"]}>
                <h4>Fee</h4>
                <p className={classes.fee}>0.002ETH</p>
                <p className={classes.note}>Note</p>
            </div>

                <Button type={"submit"} className={classes.submit}>Create</Button>
            
        </div>
    </form>
  )
}

export default CreatePatentForm
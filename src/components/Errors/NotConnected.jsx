import React from "react";
import classes from "./NotConnected.module.css"
import Button from "../UI/Button";
import ContractContext from "../../context/contract-context";

const NotConnected = () => {
    const ContractCtx = React.useContext(ContractContext)

    const {connectWallet} = ContractCtx
    return (
        <div className={classes["not-connected"]}>
            <p>You're wallet is not connected</p>
            <Button type="button" onClick={connectWallet}>
                    Connect Wallet
                </Button>
        </div>
    )
}

export default NotConnected
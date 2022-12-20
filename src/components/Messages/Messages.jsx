import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import ContractContext from '../../context/contract-context';
import MessagesContext from '../../context/messages-context'
import Loading from "../UI/Loading"
import Message from './Message';
import classes from "./Messages.module.css"

const Messages = () => {
    const messagesCtx = useContext(MessagesContext);
    const contractCtx = useContext(ContractContext);
    const [loadingMessages, setLoadingMessages] = useState(false)
    const [filter, setFilter] = useState("")

    const {messages } = messagesCtx
    const {connected, currentAccount} = contractCtx

    useEffect(() => {
        const getMessagesOnAddressHandler = async () => {
            await messagesCtx.getMessagesOnAddress()
            setLoadingMessages(false)

        }
        if (connected) {
            setLoadingMessages(true)
            getMessagesOnAddressHandler()
        }
    }, [connected])

    if(loadingMessages) {
        return (

            <Loading />

        )
    }

    if ((messages.length === 0) && !loadingMessages) {
        return (
            <div>
                No Messages
            </div>
        )
    }


    const changeFilterHandler = (value) => {
        setFilter(value)
    }

    let filteredMessages = [...messages]

    if (filter === "sent") {
        filteredMessages = filteredMessages.filter(message => message.from === currentAccount);
    }

    if (filter === "received") {
        filteredMessages = filteredMessages.filter(message => message.to === currentAccount);
    }


  return (
    <>
    <div className={classes.filter}>
        <div onClick={() => changeFilterHandler("sent")}>sent</div>
        <div onClick={() => changeFilterHandler("received")}>received</div>
        <div onClick={() => changeFilterHandler("")}>none</div>
    </div>
    <ul className={classes["messages"]}>
        {filteredMessages.map(message => {
            console.log("message TIME: ", message.timestamp)
            return (
                <Message
                    key={message.patent}
                    text={message.text}
                    timestamp={"message.timestamp"}
                    from={currentAccount}
                    to={message.to}
                    patent={message.patent}
                />
            )
        })}
    </ul>
    </>
    
  )
}

export default Messages
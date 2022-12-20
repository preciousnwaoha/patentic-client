import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Layout/Header'
import MessageOwnerForm from '../components/Messages/MessageOwnerForm'
import MessageToFrom from '../components/Messages/MessageToFrom'
import ContractContext from '../context/contract-context'
import classes from "./MessageOwner.module.css"

const MessageOwner = () => {
    const params = useParams();
    // const navigate = useNavigate();
    const contractCtx = useContext(ContractContext)
    const [isMessagingYourself, setIsMessagingYourself] = useState(false)

    const {currentAccount, connected} = contractCtx;

    


    const to = params.address
    const patent =`${params.address}/${params.timestamp}`

     useEffect(() => {
        console.log(to, currentAccount)
        setIsMessagingYourself(to === currentAccount);
      }, [])

    if (!connected) {
        return (
            <div>
                Not Connected
            </div>
        )
    }
    

   

  return (
    
        <>
        <Header />
            <section className={classes["message-owner"]}>
                <h1>Patent Message</h1>
                {isMessagingYourself && <div>
                    You cannot message yourself
                    </div>}
                    {!isMessagingYourself && (
                        <>
                            <MessageToFrom to={to} from={currentAccount} />
            <MessageOwnerForm to={to} patent={patent} />
                        </>
                    )}
                
        </section>
        </>
  )
}

export default MessageOwner
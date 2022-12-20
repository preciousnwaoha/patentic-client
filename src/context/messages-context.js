import React, { useState, useContext, useEffect } from "react";
import ContractContext from "./contract-context";
import abi from "../utils/Patentic.json";
import { ethers } from "ethers";


const contractAddress = "0x8aC50E14b0968D13F0Fe9BC9FaBdCa6e989ED1ED";
const contractABI = abi.abi

const MessagesContext = React.createContext({
    messages: [],
    addMessage: () => {},
    getNoOfMessages: () => {},
    getMessagesOnAddress: () => {},
});



export const MessagesContextProvider = ({ children }) => {
    const contractCtx = useContext(ContractContext);
  const [messages, setMessages] = useState([]);
  
    const { connected } = contractCtx

    const getNoOfMessages = async () => {
        try {
          const { ethereum } = window;
    
          if (ethereum) {
            console.log("making provider")
            const provider = new ethers.providers.Web3Provider(ethereum);
            console.log("getting signer")
            const signer = provider.getSigner();
            console.log("getting contract")
            const patenticContract = new ethers.Contract(contractAddress, contractABI, signer);
            console.log("gotten contract: ", patenticContract)
            
            console.log("getting count")
            let count = await patenticContract.getTotalMessages();
            console.log("Retrieved total message count...", count.toNumber());
          } else {
            console.log("Ethereum object doesn't exist!");
          }
        } catch (error) {
          console.log(error);
        }
    }


    const addMessage = async (to, text, patent) => {
      const { ethereum } = window;
      try {
        
  
        if (ethereum) {
          console.log("making provider")
          const provider = new ethers.providers.Web3Provider(ethereum);
          console.log("getting signer")
          const signer = provider.getSigner();
          console.log("getting contract")
          const patenticContract = new ethers.Contract(contractAddress, contractABI, signer);
          console.log("gotten contract: ", patenticContract)
          
          const addMessageTxn = await patenticContract.addMessage(to, text, patent);
          console.log("Mining...", addMessageTxn.hash);

        await addMessageTxn.wait();
        console.log("Mined -- ", addMessageTxn.hash);


        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error);
      }
  }

  const getMessagesOnAddress = async () => {
    const { ethereum } = window;
    try {
      

      if (ethereum) {
        console.log("making provider")
        const provider = new ethers.providers.Web3Provider(ethereum);
        console.log("getting signer")
        const signer = provider.getSigner();
        console.log("getting contract")
        const patenticContract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log("gotten contract: ", patenticContract)
        
        let messages = await patenticContract.getMessagesOnAddress();
        

      let messagesCleaned = messages.map(message => {
        return {
          from: message.from.toLowerCase(),
        to: message.to.toLowerCase(),
          timestamp: new Date(message.timestamp * 1000),
            text: message.text,
            patent: message.patent,
        }
      });

      console.log("patentsCleaned: ", messagesCleaned) 
      setMessages(messagesCleaned)

      
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
}

  useEffect(() => {
    let patenticContract;

    const onNewMessage = (from, to, timestamp, text, patent) => {
      console.log("NewMessage", from, to, timestamp, text, patent);
      setMessages(prevState => [
        ...prevState,
        {
          from: from.toLowerCase(),
          to: to.toLowerCase(),
          timestamp: new Date(timestamp * 1000),
          text: text,
          patent: patent,
        },
      ]);
    };


    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
  
      patenticContract = new ethers.Contract(contractAddress, contractABI, signer);
      patenticContract.on("NewMessage", onNewMessage);
    }

    return () => {
      if (patenticContract) {
        patenticContract.off("NewMessage", onNewMessage);
      }
    };

  }, [])

  console.log(messages)

    // useEffect(() => {
    //     if (connected) {
    //         setMessages(DEFAULT_MSGS)
    //     }
    // }, [connected])

  // npx browserslist@latest --update-db
  return (
    <MessagesContext.Provider
      value={{
        messages: messages,
        addMessage: addMessage,
        getNoOfMessages: getNoOfMessages,
        getMessagesOnAddress: getMessagesOnAddress,
       }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesContext;

// chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#
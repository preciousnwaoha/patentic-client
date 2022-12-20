import React, { useState, useContext, useEffect } from "react";
import ContractContext from "./contract-context";
import abi from "../utils/Patentic.json";
import { ethers } from "ethers";


const contractAddress = "0xdAA6312a71a43E013B7FA0630A32c053094F18AC";
const contractABI = abi.abi


const PatentsContext = React.createContext({
  patents: [],
  patentdsOnAddress: [],
    addPatent: () => {},
    getNoOfPatents: () => {},
    getAllPatents: () => {},
    getPatentsOnAddress: () => {},
});



export const PatentsContextProvider = ({ children }) => {
    const contractCtx = useContext(ContractContext);
  const [patents, setPatents] = useState([]);
  const [patentsOnAddress, setPatentsOnAddress] = useState([]);
  
    const { connected } = contractCtx

    const getNoOfPatents = async () => {
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
            let count = await patenticContract.getTotalPatents();
            console.log("Retrieved total patent count...", count.toNumber());
          } else {
            console.log("Ethereum object doesn't exist!");
          }
        } catch (error) {
          console.log(error);
        }
    }


    const addPatent = async (name, text, type) => {
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
          
          const createPatentTxn = await patenticContract.createPatent(name, text, type);
          console.log("Mining...", createPatentTxn.hash);

        await createPatentTxn.wait();
        console.log("Mined -- ", createPatentTxn.hash);


          // console.log("getting count")
          // let count = await patenticContract.getTotalPatents();
          // console.log("Retrieved total patent count...", count.toNumber());
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error);
      }
  }

  const getAllPatents = async () => {
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
        
        let patents = await patenticContract.getAllPatents();
        
        console.log("Awaiting patents");


      let patentsCleaned = patents.map(patent => {
        console.log("time", patent.timestamp._hex)
        return {
          patentOwner: patent.patentOwner.toLowerCase(),
          timestamp: patent.timestamp._hex,
          patentData: {
            patentName: patent.patentData["patentName"],
            patentText: patent.patentData["patentText"],
            patentType: patent.patentData["patentType"],
          }
        }
      });

      console.log("patentsCleaned: ", patentsCleaned) 
      setPatents(patentsCleaned)

      
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
}

const getPatentsOnAddress = async () => {
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
      
      let patentsOnAddress = await patenticContract.getPatentsOnAddress();
      


    let patentsCleaned = patentsOnAddress.map(patent => {
      console.log("time", patent.timestamp._hex)
      return {
        patentOwner: patent.patentOwner.toLowerCase(),
        timestamp: patent.timestamp._hex,
        patentData: {
          patentName: patent.patentData["patentName"],
          patentText: patent.patentData["patentText"],
          patentType: patent.patentData["patentType"],
        }
      }
    });

    console.log("patentsCleaned: ", patentsCleaned) 
    setPatentsOnAddress(patentsCleaned)

    
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
  }

}

  useEffect(() => {
    let patenticContract;

    const onNewPatent = (from, timestamp, patentData) => {
      console.log("NewPatent", from, timestamp, patentData);
      setPatents(prevState => [
        ...prevState,
        {
          patentOwner: from.toLowerCase(),
          timestamp: new Date(timestamp * 1000),
          patentData: {
            patentName: patentData.patentName,
            patentText: patentData.patentText,
            patentType: patentData.patentType,
          }
        },
      ]);
    };


    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
  
      patenticContract = new ethers.Contract(contractAddress, contractABI, signer);
      patenticContract.on("NewPatent", onNewPatent);
    }

    return () => {
      if (patenticContract) {
        patenticContract.off("NewPatent", onNewPatent);
      }
    };

  }, [])

  console.log(patents)

    // useEffect(() => {
    //     if (connected) {
    //         setPatents(DEFAULT_Ps)
    //     }
    // }, [connected])

  // npx browserslist@latest --update-db
  return (
    <PatentsContext.Provider
      value={{
        patents: patents,
        patentsOnAddress, patentsOnAddress,
        addPatent: addPatent,
        getNoOfPatents: getNoOfPatents,
        getAllPatents: getAllPatents,
        getPatentsOnAddress: getPatentsOnAddress,
       }}
    >
      {children}
    </PatentsContext.Provider>
  );
};

export default PatentsContext;

// chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#
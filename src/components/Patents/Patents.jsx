import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import ContractContext from '../../context/contract-context'
import PatentsContext from '../../context/patents-context'
import Patent from './Patent'
import Button from "../UI/Button"
import classes from "./Patents.module.css"
import Loading from '../UI/Loading'



const Patents = ({forAccount}) => {
    const [loadingPatents, setLoadingPatents] = useState(false)
    const patentsCtx = useContext(PatentsContext)
    const contractCtx = useContext(ContractContext)

    const {connected, currentAccount } = contractCtx

    let patents = [...patentsCtx.patents]



    useEffect(() => {
        const getAllPatentsHandler = () => {
            patentsCtx.getAllPatents()
            setLoadingPatents(false)
        }
        if (connected) {
            setLoadingPatents(true)
            getAllPatentsHandler()
            
        }
    }, [connected])

    if (forAccount) {
        patents = patents.filter(patent => patent.patentOwner === contractCtx.currentAccount)
    }

    // console.log(connected, forAccount)


  return (

        <div className={classes["patents-wrapper"]}>
            <div className={classes["info-wrapper"]}>
                <p>x{patents.length} patents</p>
            {(connected && forAccount) && <Button type={"link"} link={`/${currentAccount}/create-patent`} className={classes.btn}>Create Patent</Button>}
           
            </div>

            {loadingPatents && <Loading />}
           
            {!loadingPatents && <ul className={classes.patents}>
        {patents.map(patent => {
            return (
                <Patent key={`${patent.patentOwner}${patent.timestamp}`}
                    timestamp={patent.timestamp}
                    patentOwner={patent.patentOwner}
                    patentName={patent.patentData.patentName}
                    patentText={patent.patentData.patentText}
                    patentType={patent.patentData.patentType}
                />
            )
        })}
        </ul>}
        </div>
        
        
  )
}

export default Patents
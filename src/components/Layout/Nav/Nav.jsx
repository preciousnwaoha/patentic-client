import React from 'react'
import { useContext } from 'react'
import ContractContext from '../../../context/contract-context'
import { formatAddress } from '../../../utils/contractUtils'
import classes from "./Nav.module.css"
import NavItem from './NavItem'



const Nav = () => {
    const contractCtx = useContext(ContractContext);

    const { currentAccount, connected } = contractCtx

    const DEFAULT_NAVITEMS = [
        {
            id: "nav-item1",
            text: "Explore",
            link: "/patents",
        },
        {
            id: "nav-item2",
            text: "Your Patents",
            link: `/${currentAccount}/patents`,
        },
        {
            id: "nav-item3",
            text: `${formatAddress(currentAccount)}`,
            link: `/${currentAccount}`,
        }
    ]

  return (
    <nav className={classes["nav"]}>
        <ul>
            {DEFAULT_NAVITEMS.map(item => (
                <NavItem
                    key={item.id}
                    text={item.text}
                    link={item.link}                
                />
            ))}
        </ul>
        <div className={classes["connected"]}>
            {!connected && <div className={classes["not-connected"]}></div>}
            {connected && <div className={classes["is-connected"]}>
              </div>}
        </div>
    </nav>
  )
}

export default Nav
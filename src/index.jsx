import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ContractContextProvider } from './context/contract-context';
import { PatentsContextProvider } from './context/patents-context';
import { MessagesContextProvider } from './context/messages-context';

ReactDOM.render(
        <ContractContextProvider>
        <PatentsContextProvider >
            <MessagesContextProvider >
            <App />
            </MessagesContextProvider>
        
        </PatentsContextProvider>
        
    </ContractContextProvider>
    
    , document.getElementById('root'));
 
import * as React from "react";
// import React, {Suspense} from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import './App.css';

import Home from "./pages/Home";
import PatentsPage from "./pages/PatentsPage";
// import Loading from "./components/UI/Loading";
import About from "./pages/About";
import ErrorPage404 from "./pages/ErrorPage404";
import PatentView from "./pages/PatentView";
import CreatePatent from "./pages/CreatePatent";
import Account from "./pages/Account";
import MessageOwner from "./pages/MessageOwner";

// const About = React.lazy(() => import('./pages/About'));
// const SendMeHu = React.lazy(() => import('./pages/SendMeHu'));
// const Wallet = React.lazy(() => import('./pages/Wallet'));
// const Transactions = React.lazy(() => import('./pages/Transactions'));
// const Home = React.lazy(() => import('./pages/Home'));
// const ErrorPage404 = React.lazy(() => import('./pages/ErrorPage404'));

export default function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />}>
            {/* <Route path="new-user" element={<h1>New user</h1>} /> */}
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/explore" element={<Navigate replace to="/patents" />} />
          <Route path="/patents" element={<PatentsPage />} />
          <Route path=":address/patents" element={<PatentsPage forAccount={true} />} />
          <Route path=":address" element={<Account />} />

          <Route path="patents/message-owner/:address/:timestamp" element={<MessageOwner />} />
          <Route path="patents/:address/:timestamp/message-owner" element={<MessageOwner />} />
          <Route path="patents/:address/:timestamp" element={<PatentView />} />
          

          <Route path="/:address/create-patent" element={<CreatePatent />} />
          
  
          {/* <Route path="send-me-hu/share-fixed/:shareId/:name/:amount" element={<SendMeHu withAmount={true} />} /> */}
          <Route path="*" element={<ErrorPage404 />} />
        </Routes>
      </Router>
  );
}


/*<Suspense fallback={<div className={"centered"}>
         <Loading />
    </div>}> */
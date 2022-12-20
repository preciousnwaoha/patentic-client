import React, { useContext } from "react";
import ReactDOM from 'react-dom';
import { useParams, useNavigate } from "react-router-dom";
import PatentsContext from "../context/patents-context";
import Button from "../components/UI/Button";
import classes from "./PatentView.module.css";
import ContractContext from "../context/contract-context";
import Header from "../components/Layout/Header";
import { useEffect } from "react";
import { useState } from "react";
import { formatAddress } from "../utils/contractUtils";

const PatentView = () => {
  const params = useParams();
  const navigate = useNavigate();
  const contractCtx = useContext(ContractContext);
  const patentsCtx = useContext(PatentsContext);
  const [loadingPatent, setLoadingPatent] = useState(false);

  const { connected } = contractCtx;

  const { patents } = patentsCtx;

  useEffect(() => {
    const getAllPatentsHandler = async () => {
      await patentsCtx.getAllPatents();

      setLoadingPatent(false);
    };
    if (connected) {
      setLoadingPatent(true);
      getAllPatentsHandler();
    }
  }, [connected]);

  if (!connected) {
    console.log("not connected");
    return <div>Error</div>;
  }

  if (patents.length === 0 && !loadingPatent) {
    console.log("0 patents");
    return <div>No Patents</div>;
  }

  if (loadingPatent) {
    console.log("loding patent");
    return <div>Loading</div>;
  }

  console.log("loaded patents");
  console.log("patents", patents);

  const [patent] = patents.filter((patent) => {
    return (
      patent.patentOwner === params.address &&
      `${patent.timestamp}` === `${params.timestamp}`
    );
  });

  console.log("patent", patent);
  const { patentOwner, timestamp, patentData } = patent;

  const { patentName, patentText, patentType } = patentData;

  const backHandler = () => {
    navigate(-1);
  };

  const shareClickHandler = () => {
    console.log("share")
  } 

  const createdAt = `${new Date(timestamp * 1000)}`;

function createMarkup() {
    return {__html: patentText};
  }

  return (
    <>
      <Header />
      <section className={classes["patent-view"]}>

        <div className={classes.main}>
          <div className={classes["back"]} onClick={backHandler}>
            back
          </div>
          <h1 className={classes["name"]}>{patentName}</h1>
          <p className={classes["text"]} dangerouslySetInnerHTML={createMarkup()} ></p>
        </div>
        <div className={classes.side}>
          <div className={classes["type"]}>
          <h4>Type:</h4>
           <p>{patentType}</p></div>
          <div className={classes["ownership"]}>
            <h4>Owner</h4>
            <p className={classes["address"]}>{formatAddress(patentOwner)}</p>
            {true && <p className={classes["you-own"]}>You own this patent</p>}
          </div>

          <div className={classes["date"]}>
            <h4>Created At</h4>
            <p>{createdAt || "Failed to get creation time"}</p>
          </div>
          

          <div className={classes["actions"]}>
          <Button
            type={"link"}
            link={`/patents/message-owner/${patentOwner}/${timestamp}`}
            className={classes["msg-btn"]}
          >
            Reach Owner
          </Button>
            <Button className={classes["share-btn"]} onClick={shareClickHandler}>Share</Button>

          </div>
        </div>
      </section>
    </>
  );
};

export default PatentView;

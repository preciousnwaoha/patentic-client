import React from "react";
import { Link } from "react-router-dom";
import classes from "./Button.module.css";

const Button = ({ className, onClick, type, children, link }) => {
  const onClickHandler = () => {
    onClick();
  };

  if (type === "submit") {
    return (
      <button type={type} className={`${classes.button} ${className || ""}`}>
        {children}
        <div>{children}</div>
      </button>
    );
  }

  if (type === "link") {
    return (
      <Link to={link}>
        <div className={`${classes.button} ${className || ""}`}>
          {children}
          <div>{children}</div>
        </div>
      </Link>
    );
  }
  return (
    <button
      type={type || "button"}
      className={`${classes.button} ${className || ""}`}
      onClick={onClickHandler}
    >
      {children}
      <div>{children}</div>
    </button>
  );
};

export default Button;

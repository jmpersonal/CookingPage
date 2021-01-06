import React from "react";
import "./SpinnerStyle.css";

interface Props {
  children: React.ReactNode
}

const Spinner: React.FC<Props> = ({ children }) => {
  return (
    <>
    <div className="loader"/>
    <div className="inner">{children}</div>
  </>
  );
};

export default Spinner;

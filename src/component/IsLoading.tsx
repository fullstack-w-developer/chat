import React from "react";
import ReactLoading from "react-loading";

interface props {
  type: any;
  color?: string;
}
const IsLoading = ({ type, color ="#0096f5"}: props) => {
  return (
    <div className="">
      <ReactLoading type={type} color={color} height={30} width={30} />
    </div>
  );
};

export default IsLoading;

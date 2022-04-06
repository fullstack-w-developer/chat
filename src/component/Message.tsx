import React from "react";

interface props {
  message: string;
  flex?: string;
}
const Message = ({ message, flex }: props) => {
  return (
    <div className={` flex  ${flex}`}>
      <p className=" bold p-2  text-white bg-green-400  rounded-md text-xs m-2">
        {message}
      </p>
    </div>
  );
};

export default Message;

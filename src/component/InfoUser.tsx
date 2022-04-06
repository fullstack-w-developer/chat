import React from "react";
import { BsArrowLeftShort } from "react-icons/bs";
interface props {
  selectUser: any;
  setSelectUser: any;
}
export default function InfoUser({ selectUser, setSelectUser }: props) {
  return (
    <div className="flex justify-between items-center bg-gray-400 p-2">
      <div className="flex items-center">
        <img
          className="w-16 h-16 rounded-full"
          src={`data:image/jpeg;base64,${selectUser.img}`}
          alt=""
        />
        <p className="text-white bold pr-2">{selectUser.name}</p>
      </div>
      <div className="lg:hidden">
        <BsArrowLeftShort
          onClick={() => setSelectUser({ isSelect: false, name: "", img: "" })}
          color="#fff"
          size={40}
        />
      </div>
    </div>
  );
}

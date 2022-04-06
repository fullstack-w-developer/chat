import React from "react";
import User from "./User";

interface props {
  selectUser: any;
  setSelectUser: any;
  users: any;
}

export default function Users({ users, selectUser, setSelectUser }: props) {
  return (
    <div className="users">
      {users.data?.data.data.map((item: any, index: any) => {
        return (
          <div
            key={index}
            className={selectUser.selectId === item._id ? "bg-gray-300" : " "}
            onClick={() =>
              setSelectUser({
                // @ts-ignore
                img: item.image,
                name: item.fullName,
                isSelect: true,
                selectId: item._id,
              })
            }
          >
            <User name={item.fullName} img={item.image} />
          </div>
        );
      })}
    </div>
  );
}

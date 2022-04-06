import { useEffect, useContext, useState } from "react";
import { AuthContext } from "./../../context/Auth";
import { useNavigate } from "react-router-dom";
import { AiOutlineWechat } from "react-icons/ai";
import { BiError } from "react-icons/bi";
import "./Chat.css";
import Users from "./../../component/Users";
import Content from "./../../component/Content";
import { useQuery } from "react-query";
import { usersApi } from "../../utils/API";
import IsLoading from "./../../component/IsLoading";
interface select {
  img: string;
  name: string;
  isSelect: boolean;
  selectId: string;
}
const Chat = () => {
  const { auth } = useContext(AuthContext);
  const [selectUser, setSelectUser] = useState<select>({
    img: "",
    name: "",
    isSelect: false,
    selectId: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.setIsAvatar) {
      navigate("/chat/avatar");
    }
  }, []);

  const users = useQuery(["users"], () => usersApi(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
    cacheTime: 1,
    retry: 2,
  });
  return (
    <div className="chat rtl">
      <div
        className={`users ${selectUser.isSelect ? "hidden" : "block"} lg:block`}
      >
        {users.isLoading ? (
          <div className="flex justify-center pt-10">
            <IsLoading type="bars" />
          </div>
        ) : users.isError ? (
          <div className="mt-10">
            <div className="flex justify-center">
              <BiError size={40} color="#e74c3c" />
            </div>
            <p className="text-red-500 text-sm regular text-center pt-2">
              مشکلی در گرفتن کاربران پیش آمده است
            </p>
          </div>
        ) : users.isSuccess ? (
          <Users
            users={users}
            selectUser={selectUser}
            setSelectUser={setSelectUser}
          />
        ) : null}
      </div>
      <div
        className={`content w-screen lg:w-full ${
          selectUser.isSelect ? "block" : "hidden"
        } lg:block`}
      >
        {selectUser.isSelect ? (
          <Content setSelectUser={setSelectUser} selectUser={selectUser} />
        ) : (
          <div className="h-screen grid place-items-center bg-gray-600">
            <div className="flex justify-center flex-col items-center">
              <AiOutlineWechat size={160} color="#fff" />
              <p className=" bold text-white">
                برای شروع گفتگو، یکی از دوستان خود را انتخاب کنید
              </p>{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;

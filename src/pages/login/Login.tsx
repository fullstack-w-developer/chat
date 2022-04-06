import React, { useContext, useState,useEffect } from "react";
import { useMutation } from "react-query";
import { Link ,useNavigate} from "react-router-dom";
import Input from "../../component/Input";
import { loginApi } from "../../utils/API";
import IsLoading from "./../../component/IsLoading";
import { AuthContext } from "./../../context/Auth";

interface loginTypes {
  username: string;
  password: string;
}

interface errorLoginTypes {
  errorUsername: string;
  errorPassword: string;
}
export const Login = () => {
  const { auth,setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [login, setLogin] = useState<loginTypes>({
    username: "",
    password: "",
  });

  useEffect(()=>{
    if(auth && auth.token){
      navigate("/chat")
    }
  },[])
  const [errorLogin, setErrorLogin] = useState<errorLoginTypes>({
    errorUsername: "",
    errorPassword: "",
  });

  const onKeyDownLogin = () => {
    setErrorLogin({
      errorPassword: "",
      errorUsername: "",
    });
  };

  const validation = () => {
    const { password, username } = login;
    if (username === "") {
      setErrorLogin({
        ...errorLogin,
        errorUsername: "لطفا نام کاربری خود را وارد کنید",
      });
      return false;
    } else if (password === "") {
      setErrorLogin({
        ...errorLogin,
        errorPassword: "لطفا پسورد خود را وارد کنید",
      });
      return false;
    }
    return true;
  };

  const handleChangeLogin = (e: any) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  // data send backend
  const data = {
    username: login.username,
    password: login.password,
  };
  // mutation signup
  const loginUser: any = useMutation(() => loginApi(data), {
    onSuccess: async (data: any) => {
      let item = data.data.data;
      await setAuth(item);
      if (item.setIsAvatar) {
        navigate("/chat");
      } else {
        navigate("/chat/avatar");
      }
    },
  });

  const handleSubmitLogin = (e: any) => {
    e.preventDefault();

    if (validation()) {
      loginUser.mutate();
    }
  };

  return (
    <div className="h-screen grid place-items-center w-screen  bg-gray-600 md:bg-gray-100">
      <form
        onSubmit={handleSubmitLogin}
        className="flex flex-col gap-6  rounded-md p-0 md:px-28 md:py-10 bg-transparent  md:bg-gray-600"
      >
        <h1 className="text-center text-white Extrabold text-2xl">چت آنلاین</h1>
        <Input
          value={login.username}
          name="username"
          onChange={handleChangeLogin}
          label="نام کاربری"
          maxLength={20}
          minLength={3}
          error={errorLogin.errorUsername}
          onkeydown={onKeyDownLogin}
        />

        <Input
          value={login.password}
          name="password"
          onChange={handleChangeLogin}
          label="پسورد"
          type="password"
          maxLength={20}
          minLength={8}
          error={errorLogin.errorPassword}
          onkeydown={onKeyDownLogin}
        />
        <div>
          {loginUser.isError && (
            <p className="text-center text-red-500 bold">
              {loginUser.error.response.data.message}
            </p>
          )}

          <button className="bg-gray-500 flex justify-center w-full text-white hover:bg-gray-700 transition-all bold text-sm py-2 rounded-md mt-8">
            {loginUser.isLoading ? (
              <IsLoading type="bars" color="#0096f5" />
            ) : (
              "ورود کاربر"
            )}
          </button>
        </div>
        <p className="text-white text-center bold text-sm">
          آیا تاکنون ثبت نام نکرده‌اید؟{" "}
          <Link
            to="/chat/signup"
            className="text-gray-400 hover:text-gray-500 transition-all"
          >
            ثبت نام
          </Link>
        </p>
      </form>
    </div>
  );
};

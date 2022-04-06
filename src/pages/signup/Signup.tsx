import React, { useState,useContext } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import Input from "../../component/Input";
import IsLoading from "../../component/IsLoading";
import { signupApi } from "./../../utils/API";
import {useNavigate} from "react-router-dom"
import { AuthContext } from './../../context/Auth';

interface signupTypes {
  username: string;
  fullName: string;
  password: string;
  repeatPassword: string;
}
interface errorSignupTypes {
  errorUsername: string;
  errorFullName: string;
  errorPassword: string;
  errorRepeatPassword: string;
}
const Signup = () => {
  const navigate = useNavigate()
  const {setAuth} = useContext(AuthContext)
  const [signup, setSignup] = useState<signupTypes>({
    username: "",
    fullName: "",
    password: "",
    repeatPassword: "",
  });
  const [errorSignup, setErrorSignup] = useState<errorSignupTypes>({
    errorUsername: "",
    errorFullName: "",
    errorPassword: "",
    errorRepeatPassword: "",
  });

  const onKeyDownSignup = () => {
    setErrorSignup({
      errorFullName: "",
      errorPassword: "",
      errorRepeatPassword: "",
      errorUsername: "",
    });
  };

  const handleChangeSignup = (e: any) => {
    const { value, name } = e.target;
    setSignup({
      ...signup,
      [name]: value,
    });
  };

  // validation form

  const validation = () => {
    const { fullName, password, repeatPassword, username } = signup;
    if (username === "") {
      setErrorSignup({
        ...errorSignup,
        errorUsername: "لطفا نام کاربری خود را وارد کنید",
      });
      return false;
    } else if (fullName === "") {
      setErrorSignup({
        ...errorSignup,
        errorFullName: "لطفا نام و نام خانوادگی خود را وارد کنید خود را وارد کنید",
      });
      return false;
    } else if (password === "") {
      setErrorSignup({
        ...errorSignup,
        errorPassword: "لطفا پسورد خود را وارد کنید",
      });
      return false;
    } else if (repeatPassword !== password) {
      setErrorSignup({
        ...errorSignup,
        errorRepeatPassword: "لطفا تایید پسورد خود را چک کنید",
      });
      return false;
    }
    return true;
  };

  // data send backend
  const data = {
    username: signup.username,
    fullName: signup.fullName,
    password: signup.password,
  };
  // mutation signup
  const signupUser: any = useMutation(() => signupApi(data), {
    onSuccess: async (data:any)=>{
      await setAuth(data.data.data)
      await navigate("/chat/avatar")
    }
  });
  const handleSubmitSignup = (e: any) => {
    e.preventDefault();
    if (validation()) {
      signupUser.mutate();
    }
  };
  return (
    <div className="h-screen grid place-items-center w-screen  bg-gray-600 md:bg-gray-100">
      <form
        onSubmit={handleSubmitSignup}
        className="flex flex-col gap-6  rounded-md p-0 md:px-28 md:py-10 bg-transparent  md:bg-gray-600"
      >
        <h1 className="text-center text-white Extrabold text-2xl">چت آنلاین</h1>
        <Input
          value={signup.username}
          name="username"
          onChange={handleChangeSignup}
          label="نام کاربری"
          maxLength={20}
          minLength={3}
          error={errorSignup.errorUsername}
          onkeydown={onKeyDownSignup}
        />
        <Input
          value={signup.fullName}
          name="fullName"
          onChange={handleChangeSignup}
          label="نام و نام خانوادگی"
          maxLength={40}
          minLength={3}
          error={errorSignup.errorFullName}
          onkeydown={onKeyDownSignup}
          rtl={true}
        />
        <Input
          value={signup.password}
          name="password"
          onChange={handleChangeSignup}
          label="پسورد"
          type="password"
          maxLength={20}
          minLength={8}
          error={errorSignup.errorPassword}
          onkeydown={onKeyDownSignup}
        />
        <Input
          value={signup.repeatPassword}
          name="repeatPassword"
          onChange={handleChangeSignup}
          label="تائید پسورد"
          type="password"
          maxLength={20}
          minLength={8}
          error={errorSignup.errorRepeatPassword}
          onkeydown={onKeyDownSignup}
        />
        <div className="mt-4">
          {signupUser.isError && (
            <p className="text-center text-red-500 bold">
              {signupUser.error.response.data.message}
            </p>
          )}
          <button className="  flex justify-center bg-gray-500 w-full text-white hover:bg-gray-700 transition-all bold text-sm py-2 rounded-md mt-4">
            {signupUser.isLoading ? (
              <IsLoading type="bars" color="#0096f5" />
            ) : (
              "ورود کاربر"
            )}
          </button>
        </div>
        <p className="text-white text-center bold text-sm">
          آیا قبلا ثبت نام کرده‌اید ؟{" "}
          <Link
            to="/chat/login"
            className="text-gray-400 hover:text-gray-500 transition-all"
          >
            ورود کاربر
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

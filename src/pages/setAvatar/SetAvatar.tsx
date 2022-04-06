import React, { useState,useContext } from "react";
import { useDropzone } from "react-dropzone";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { BiCheckDouble } from "react-icons/bi";
import { useMutation } from "react-query";
import { uploadImageApi } from "./../../utils/API";
import IsLoading from "./../../component/IsLoading";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../../context/Auth';
export const SetAvatar = () => {
  const navigate = useNavigate()
  const {auth,setAuth}= useContext(AuthContext)
  const [file, setFile] = useState<any>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFile(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });


  const images = file.map((file: any) => (
    <div key={file.name} className="flex justify-between">
      <div className="flex">
        <img
          className="p-1"
          src={file.preview}
          style={{ width: "50px", height: "40px" }}
          alt="preview"
        />
        <span className="regular text-xs pt-1">{file.name}</span>
      </div>
      <BiCheckDouble size={20} color="#20bf6b" />
    </div>
  ));

  const imageUpload = useMutation((data: any) => uploadImageApi(data),{
    onSuccess: async ()=>{
      await setAuth({...auth,setIsAvatar:true})
      navigate("/chat")
    }
  });

  const submitUploadImage = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file[0]);
    imageUpload.mutate(formData);
  };
  return (
    <div className="h-screen grid place-items-center w-screen  bg-gray-600 md:bg-gray-100">
      <form
        onSubmit={submitUploadImage}
        className="flex flex-col gap-6  rounded-md p-0 md:px-28 md:py-10 bg-transparent  md:bg-gray-600"
      >
        <h1 className="text-center text-white bold text-xl">
          لطفا عکس پروفایل خود را انتخاب کنید
        </h1>
        <div {...getRootProps()} className="border-2 border-dashed p-12 mt-8">
          <input {...getInputProps()} />
          <div className="flex justify-center">
            <HiOutlineCloudUpload size={35} color="#fff" />
          </div>
          <p className="text-center text-white regular text-xs pt-2">
            عکس خود را بکشید، یا کلیک کنید
          </p>
        </div>
        <div className="bg-white rounded-sm p-2">
          {images.length === 0 ? (
            <div
              className="bg-gray-200"
              style={{ width: "50px", height: "40px" }}
            ></div>
          ) : (
            images
          )}
        </div>
        <button className=" flex justify-center bg-gray-500 w-full text-white hover:bg-gray-700 transition-all bold text-sm py-2 rounded-md mt-6">
          {imageUpload.isLoading ? <IsLoading type="bars" /> : "تائید"}
        </button>
      </form>
    </div>
  );
};

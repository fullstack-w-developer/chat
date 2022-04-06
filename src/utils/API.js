import axios from "axios";

export const signupApi = (data) => axios.post("/signup", data);
export const loginApi = (data) => axios.post("/login", data);
export const uploadImageApi = (data) => axios.post("/uploadimage", data);
export const usersApi = () => axios.get("/users");
export const addMessageApi = (data) => axios.post("/message/addmsg",data);
export const getMessageApi = (data) => axios.post("/message/getmsg",data);

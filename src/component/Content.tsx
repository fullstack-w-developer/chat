import { useContext, useRef, useEffect,useState } from "react";
import InfoUser from "./InfoUser";
import InputContent from "./InputContent";
import Messages from "./Messages";
import { useMutation, useQuery } from "react-query";
import { addMessageApi, getMessageApi } from "./../utils/API";
import { AuthContext } from "./../context/Auth";
import { io } from "socket.io-client";
interface props {
  selectUser: any;
  setSelectUser: any;
}
const Content = ({ selectUser, setSelectUser }: props) => {
  const socket = useRef(null);
 
  const [messages,setMessages] = useState([])
  const[arrivalMessage,setArravilMessage] = useState(null)
  const { auth } = useContext(AuthContext);
  const addMessage = useMutation((data: any) => addMessageApi(data));

  useEffect(() => {
    if (auth) {
      // @ts-ignore
      socket.current = io("http://localhost:8080");
      // @ts-ignore
      socket.current.emit("add-user", auth._id);
    }
  }, []);


  const inputFun = (value: any) => {

    // @ts-ignore
    socket.current.emit("send-msg",{
      from: auth._id,
      to: selectUser.selectId,
       message:value,
    })


    const data = {
      from: auth._id,
      to: selectUser.selectId,
      message: value,
    };
    addMessage.mutate(data);


    const msgs = [...messages]
    // @ts-ignore
    msgs.push({fromSelf:true,message:value})
    setMessages(msgs)
  };

  useEffect(()=>{
  if(socket.current){
    // @ts-ignore
    socket.current.on("msg-recieve",(msg)=>{
      // @ts-ignore
      setArravilMessage({fromSelf:false,message:msg})
    })
  }
},[])
useEffect(()=>{
  // @ts-ignore
arrivalMessage && setMessages((prev:any)=> [...prev,arrivalMessage])
},[arrivalMessage])






  const data = {
    from: auth._id,
    to: selectUser.selectId,
  };
  const getMessage = useQuery(["getmessage", data], () => getMessageApi(data), {
    retry: 2,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    cacheTime: 1,
    enabled: selectUser.isSelect,
    onSuccess:(data)=>{
      setMessages(data.data.data)
    }
  });

  return (
    <>
      <InfoUser setSelectUser={setSelectUser} selectUser={selectUser} />
      <Messages getMessage={getMessage} message={messages}  />
      <InputContent inputFun={inputFun} />
    </>
  );
};

export default Content;

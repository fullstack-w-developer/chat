import { useEffect, useRef } from "react";
import IsLoading from "./IsLoading";
import Message from "./Message";
import "./Messages.css";
interface props {
  getMessage: any;
  message: any;
}
const Messages = ({ getMessage, message }: props) => {
  const scrollRef = useRef(null);
  useEffect(() => {
    // @ts-ignore
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div className="messages">
      {getMessage.isLoading ? (
        <div className="flex justify-center mt-2">
          <IsLoading type="bars" color="#0096f5" />
        </div>
      ) : getMessage.isSuccess ? (
        message.map((item: any, index: any) => {
          return (
            <div ref={scrollRef} key={index}>
              <Message
                message={item.message}
                flex={item.fromSelf ? "justify-start" : "justify-end"}
              />
            </div>
          );
        })
      ) : null}
    </div>
  );
};

export default Messages;

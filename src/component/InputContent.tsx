import { useCallback, useState } from "react";
import Picker from "emoji-picker-react";
import { BsFillEmojiSmileFill } from "react-icons/bs";
interface props {
  inputFun: any;
}
const InputContent = ({ inputFun }: props) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");

  const showEmoji = useCallback(() => setShow(!show), [show]);
  const onEmojiClick = (event: any, emojiObject: any) => {
    let message: any = value;
    message += emojiObject.emoji;
    setValue(message);
  };
  const onChangeInput = (e: any) => {
    setValue(e.target.value);
  };

  const onSubmitInput = async (e: any) => {
    e.preventDefault();
    await inputFun(value);
    await setValue("");
  };
  return (
    <form onSubmit={onSubmitInput} className="fixed bottom-0 w-full ">
      <input
        value={value}
        onChange={onChangeInput}
        className="w-full h-12 outline-none pr-12 regular text-sm"
      />
      <div className="absolute bottom-3 mx-3 " onClick={showEmoji}>
        <BsFillEmojiSmileFill
          className="cursor-pointer text-yellow-400 hover:text-yellow-500 "
          size={25}
        />
      </div>
      {show && (
        <Picker
          onEmojiClick={onEmojiClick}
          pickerStyle={{ position: "absolute", bottom: "48px", right: "0px" }}
        />
      )}
    </form>
  );
};

export default InputContent;

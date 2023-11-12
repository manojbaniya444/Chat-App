import React from "react";
import { IconButton } from "../../ui";
import { AiOutlineSend } from "react-icons/ai";

const SendMessageComponent = () => {
  return (
    <div className="bg-gray-900 p-2 rounded-md flex gap-2 items-center">
      <textarea name="" id="" cols="3" className="flex-1 outline-none font-thina rounded-sm p-1"></textarea>
      <IconButton>
        <AiOutlineSend />
      </IconButton>
    </div>
  );
};

export default SendMessageComponent;

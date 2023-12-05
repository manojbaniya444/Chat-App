import React, { useEffect, useState } from "react";
import { MessageList, SendMessageComponent } from "../../ui";
import { useSelector, useDispatch } from "react-redux";

const ChatComponent = () => {
  const [allMessages, setAllMessages] = useState([]);
  const { messages, currentChat, currentChatId } = useSelector(
    (state) => state.chat
  );
  const { authData } = useSelector((state) => state.user);

  // store all messages in a new state to update when socket event occurs
  useEffect(() => {
    setAllMessages(messages);
  }, [messages]);

  if (!currentChat) {
    return (
      <p className="text-center text-white text-sm md:text-base mt-5 font-bold">
        Select one chat
      </p>
    );
  }

  return (
    <div className="text-xs md:text-base py-1 px-2 text-white  flex flex-1 flex-col gap-1 h-[1px]">
      {/* to make the scrollable message component */}
      <h1 className="bg-zinc-900 p-1 text-center font-normal text-sm md:text-base">
        {currentChat.fullName}
      </h1>
      <MessageList
        messages={allMessages}
        setMessages={setAllMessages}
        friendName={currentChat.fullName}
        url={currentChat.url}
      />
      <SendMessageComponent
        setAllMessages={setAllMessages}
        receiverId={currentChat._id}
        senderId={authData._id}
        chatId={currentChatId}
      />
    </div>
  );
};

export default ChatComponent;

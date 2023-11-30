import React from "react";
import { MessageList, SendMessageComponent } from "../../ui";
import { useSelector, useDispatch } from "react-redux";

const ChatComponent = () => {
  const { messages, currentChat, currentChatId } = useSelector(
    (state) => state.chat
  );
  const { authData } = useSelector((state) => state.user);

  if (!currentChat) {
    return (
      <p className="text-center mt-5 font-bold text-xl">Select one chat</p>
    );
  }

  return (
    <div className="py-2 px-2   flex flex-1 flex-col gap-1 h-[1px]">
      {/* to make the scrollable message component */}
      <h1 className="text-center font-bold text-xl md:text-2xl">
        {currentChat.fullName}
      </h1>
      <MessageList messages={messages} friendName={currentChat.fullName} />
      <SendMessageComponent
        receiverId={currentChat._id}
        senderId={authData._id}
        chatId={currentChatId}
      />
    </div>
  );
};

export default ChatComponent;

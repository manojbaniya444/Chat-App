import React from "react";
import { MessageList, SendMessageComponent } from "../../ui";

const ChatComponent = () => {
  return (
    <div className="py-1 px-2 bg-blue-200 flex flex-1 flex-col gap-1">
      <MessageList />
      <SendMessageComponent />
    </div>
  );
};

export default ChatComponent;

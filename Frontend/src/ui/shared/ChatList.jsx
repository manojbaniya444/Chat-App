import React from "react";
import { Avatar } from "../../ui";

const ChatList = () => {
  const data = [
    {
      name: "Manoj Baniya",
      latestMessage: "Hey..",
    },
    {
      name: "Saurav Niroula",
      latestMessage: "Hey..",
    },
    {
      name: "Ishudhi Dahal",
      latestMessage: "Hey..",
    },
    {
      name: "Nirvaya Guragain",
      latestMessage: "Hey..",
    },
    {
      name: "Arvind Singh",
      latestMessage: "Hey..",
    },
    {
      name: "Kshitiz Gajurel",
      latestMessage: "Hey..",
    },
  ];
  return (
    <div className="flex-1 bg-green-200 p-2 flex flex-col gap-2">
      {/* Here map all the previous chat list with the recent messages */}
      <h1 className="text-lg font-semibold">Recent Chats</h1>
      {data.map((item, index) => {
        return (
          <section className="bg-gray-600 flex gap-2 items-center p-1 rounded-md">
            <Avatar />
            <div className="bg-gray-900 text-white rounded-md p-1 flex-1">
              <h3 className="font-medium text-lg">{item.name}</h3>
              <p className="font-thin text-sm">{item.latestMessage}</p>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default ChatList;

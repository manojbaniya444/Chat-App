import React from "react";
import { Avatar } from "../../ui";

const MessageList = () => {
  let fakeData = [
    {
      id: 1,
      message: "Hello",
    },
    {
      id: 2,
      message: "Hello",
    },
    {
      id: 3,
      message: "Hello",
    },
    {
      id: 4,
      message: "Hello",
    },
    {
      id: 5,
      message: "Hello",
    },
    {
      id: 6,
      message: "Hello",
    },
    {
      id: 7,
      message: "Hello",
    },
  ];
  return (
    <div className="bg-gray-500 text-white flex flex-col gap-2 p-2 rounded-md flex-1">
      <h1 className="text-center font-semibold text-xl md:text-2xl">
        Manoj Baniya
      </h1>
      {fakeData.map((item, index) => {
        return (
          // Here the user using is blue box and the sender is green so adjust the style according to the user
          <div
            key={index}
            className={
              item.id % 2 === 0
                ? " max-w-1/2 self-start flex items-center gap-2"
                : "bg-blue-900 max-w-1/2 self-end p-2 rounded-md"
            }
          >
            {item.id % 2 === 0 && <Avatar />}
            <p className={item.id % 2 === 0 ? "bg-green-900 p-2 rounded-md" : "bg-blue-900"}>
              {item.message}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;

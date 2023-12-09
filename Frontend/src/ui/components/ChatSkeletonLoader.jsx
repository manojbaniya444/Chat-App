import React from "react";
import Avatar from "./Avatar";

const ChatSkeletonLoader = () => {
  return (
    <div className="flex flex-col space-y-4 p-4">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className={
            index % 2 === 0 ? "self-start w-[70%] " : "self-end w-[70%]"
          }
        >
          <div
            className={`break-all font-normal text-sm md:text-base rounded-sm p-1 ${
              index % 2 === 0
                ? "bg-gray-200/5  text-black"
                : " bg-violet-900/20 text-white"
            }`}
          >
            <p className="h-4"></p>
            <p className="text-[10px]  font-thin text-gray-black h-4"></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatSkeletonLoader;

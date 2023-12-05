import React from "react";

const TypingAnimation = () => {
  return (
    <div className="flex items-center pl-2">
      <div className="w-2 h-2 bg-blue-500 rounded-full mr-1 animate-bounce"></div>
      <div className="w-2 h-2 bg-blue-500 rounded-full mr-1 animate-bounce"></div>
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
    </div>
  );
};

export default TypingAnimation;

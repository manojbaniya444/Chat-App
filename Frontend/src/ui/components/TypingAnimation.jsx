import React from "react";

const TypingAnimation = () => {
  return (
    <div className="flex items-center mt-2">
      <div className="w-3 h-3 bg-blue-500 rounded-full mr-1 animate-bounce"></div>
      <div className="w-3 h-3 bg-blue-500 rounded-full mr-1 animate-bounce"></div>
      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
    </div>
  );
};

export default TypingAnimation;

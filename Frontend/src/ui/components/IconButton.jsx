import React from "react";

const IconButton = ({ onClick, children }) => {
  return (
    <button
      className="bg-gray-100 p-2 rounded-[50%] cursor-pointer outline-none w-9 h-9 flex items-center justify-center"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;

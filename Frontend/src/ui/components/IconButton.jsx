import React from "react";

const IconButton = ({ onClick, children, disabled, type }) => {
  return (
    <button
      className="bg-gray-300 text-black p-2 rounded-[50%] cursor-pointer outline-none w-7 h-7 md:w-9 md:h-9 flex items-center justify-center"
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default IconButton;

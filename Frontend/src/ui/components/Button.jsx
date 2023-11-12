import React from "react";

const Button = ({ children, onClick, type }) => {
  return (
    <button
      className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-900 outline-none"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;

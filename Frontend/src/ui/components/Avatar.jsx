import React from "react";
import image from "../../assets/blank-profile.png";

const Avatar = ({ src = image }) => {
  return (
    <img src={src} alt="" className="w-9 h-9 rounded-full object-cover " />
  );
};

export default Avatar;

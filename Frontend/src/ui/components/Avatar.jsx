import React from "react";
import img from  "../../assets/blank-profile.png"

const Avatar = () => {
  return (
    <img
      src={img}
      alt=""
      className="w-9 h-9 rounded-full object-cover "
    />
  );
};

export default Avatar;

import React from "react";
import image from "../../assets/blank-profile.png";

const Avatar = ({ src = image, size = "sm" }) => {
  return (
    <img
      src={src}
      alt=""
      className={`${
        size === "sm" ? "w-9 h-9" : "w-14 h-14"
      }  rounded-full object-cover`}
    />
  );
};

export default Avatar;

import React from "react";
import image from "../../assets/blank-profile.png";

const Avatar = ({ src = image, size = "sm" }) => {
  return (
    <img
      src={src}
      alt=""
      className={`${
        size === "sm" ? "w-9 h-9" : "w-12 h-12"
      }  rounded-full object-cover`}
    />
  );
};

export default Avatar;

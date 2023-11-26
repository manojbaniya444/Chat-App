import React from "react";
import Avatar from "./Avatar";

const SingleUser = ({ data }) => {
  return (
    <div className="flex gap-2 items-center text-xl font-semibold bg-white p-2 rounded-md cursor-pointer">
      <Avatar src={data.url} size="lg"/>
      <p>{data.fullName}</p>
    </div>
  );
};

export default SingleUser;

import React from "react";
import { Avatar } from "../../ui";

const FriendList = () => {
  let fakeList = ["Manoj", "Saurav", "Ishudhi", "Arvind"];
  return (
    <div className="flex gap-4 p-2">
      {fakeList.map((item, index) => {
        return (
          <div className="flex flex-col gap-1">
            <Avatar />
            <p className="text-xs font-light">{item}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FriendList;

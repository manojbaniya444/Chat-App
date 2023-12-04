import axios from "axios";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { getUserByUserId } from "../../utils/getUserByUserId";

const Notification = ({ notification }) => {
  const [user, setUser] = useState(null);
  const { senderId, message, date, isRead } = notification;
  // fetch the sender user
  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUserByUserId(senderId);
      setUser(fetchedUser);
    };
    fetchUser();
  }, [notification]);

  return (
    <div className="text-white p-1 rounded-sm flex items-center gap-2">
      <div>
        <Avatar src={user?.url} />
      </div>
      <div>
        <p className="text-sm md:text-base">
          <span className="font-semibold">{user?.fullName.split(" ")[0]}</span>{" "}
          Sent you a message
        </p>
        <p className="text-sm md:text-base font-light mt-[2px]">
          {message.substring(0, 20)}
          {message.length > 20 && "..."}
        </p>
        <p className="text-xs md:text-sm text-gray-500">1 minute ago</p>
      </div>
    </div>
  );
};

export default Notification;

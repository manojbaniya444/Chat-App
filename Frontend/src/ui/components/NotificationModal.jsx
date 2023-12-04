import React, { useState } from "react";
import { Notification } from "../../ui/index";

const NotificationModal = ({ notifications, setNotifications }) => {
  // clearing the notification
  const clearNotificationHandler = () => {
    setNotifications([]);
  };

  if (notifications.length === 0) {
    return (
      <div className="bg-zinc-800 p-2 absolute right-10 top-11 md:top-16 h-[200px] w-[300px] z-10 flex items-center justify-center rounded-md shadow-xl text-white">
        <p>No Notifications</p>
      </div>
    );
  }
  return (
    <div className="bg-zinc-800 text-black p-2 absolute top-11 right-10 md:top-16 z-10 rounded-sm shadow-lg flex flex-col gap-1 max-h-[400px] overflow-y-auto  scrollbar-style">
      {notifications &&
        notifications.map((notification, index) => {
          return <Notification key={index} notification={notification} />;
        })}
      <button
        onClick={clearNotificationHandler}
        className="bg-gray-100 rounded-md text-zinc-900 cursor-pointer"
      >
        Mark all as read
      </button>
    </div>
  );
};

export default NotificationModal;

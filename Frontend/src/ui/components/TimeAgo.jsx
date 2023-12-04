import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";

const TimeAgo = ({ createdAt }) => {
  const [timeAgo, setTimeAgo] = useState(() => {
    const parsedDate = createdAt ? new Date(createdAt) : null;
    return parsedDate
      ? formatDistanceToNow(parsedDate, { addSuffix: true })
      : "";
  });

  const { messages } = useSelector((state) => state.chat);

  useEffect(() => {
    if (createdAt) {
      const interval = setInterval(() => {
        const parsedDate = new Date(createdAt);
        setTimeAgo(formatDistanceToNow(parsedDate, { addSuffix: true }));
      }, 60000); // Update every minute

      return () => clearInterval(interval);
    }
    console.log("Dependency changes: ", timeAgo);
  }, [createdAt, timeAgo, messages]);

  return <span>{timeAgo}</span>;
};

export default TimeAgo;

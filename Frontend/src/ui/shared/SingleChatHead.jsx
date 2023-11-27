import React, { useEffect, useState } from "react";
import { Avatar } from "../../ui";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const SingleChatHead = ({ data }) => {
  const [user, setUser] = useState();
  const { authData } = useSelector((state) => state.user);

  const friendId = data?.participants.filter((item) => item !== authData._id);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `http://localhost:8080/api/user/single-user/${friendId[0]}`
      );
      setUser(response?.data.user);
    })();
  }, [data]);
  return (
    <section className="bg-gray-600 flex gap-2 items-center p-1 rounded-md">
      <Avatar src={user?.url} />
      <div className="bg-gray-900 text-white rounded-md p-1 flex-1">
        <h3 className="font-medium text-lg">{user?.fullName}</h3>
        <p className="font-thin text-sm">Start chatting</p>
      </div>
    </section>
  );
};

export default SingleChatHead;

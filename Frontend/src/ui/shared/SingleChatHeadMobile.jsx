import React, { useEffect, useState } from "react";
import Avatar from "../components/Avatar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchMessages, currentChatWith } from "../../app/index";

const SingleChatHeadMobile = ({ chatData }) => {
  const [user, setUser] = useState();
  const { authData, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const friendId = chatData?.participants.filter(
    (item) => item !== authData._id
  );

  // fetching the users data for the display in the chat list
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `http://localhost:8080/api/user/single-user/${friendId[0]}`
      );
      setUser(response?.data.user);
    })();
  }, [chatData]);

  // fetching the messages of the selected chat to display in the chat component
  const fetchChatHandler = async (chatData, receiverUserDetails) => {
    const chatId = chatData?._id;
    dispatch(fetchMessages(chatData?._id));
    dispatch(currentChatWith({ receiverUserDetails, chatId }));
  };

  return (
    <section
      className="flex items-center flex-col cursor-pointer transition duration-300 transform hover:scale-105 max-w-[80px] "
      // fetching the chat with chatData id and then setting the current chat receiver id and chat id
      onClick={() => fetchChatHandler(chatData, user)}
    >
      <Avatar size="lg" src={user?.url} />
      <p className="mt-2 font-semibold text-sm">
        {user?.fullName.split(" ")[0]}
      </p>
    </section>
  );
};

export default SingleChatHeadMobile;

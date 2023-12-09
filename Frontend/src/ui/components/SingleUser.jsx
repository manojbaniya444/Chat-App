import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { useSelector, useDispatch } from "react-redux";
import { createChat } from "../../app/index";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const SingleUser = ({ data }) => {
  const [selectedId, setSelectedId] = useState();
  const { authData, token } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectUserChatHandler = async (receiverId) => {
    if (loading) return;
    setSelectedId(receiverId);
    // creating a new chat with participants userid provided
    await dispatch(createChat([receiverId, authData._id], token));
    setSelectedId(null);
    navigate("/", { replace: true });
  };

  return (
    <div
      className="flex gap-2 items-center text-sm md:text-base font-semibold bg-zinc-900 p-2 rounded-md cursor-pointer outline-none"
      onClick={() => selectUserChatHandler(data._id)}
    >
      <Avatar src={data.url} size="lg" />
      <p>{data.fullName}</p>
      {loading && selectedId === data._id && (
        <ClipLoader
          color="blue"
          loading={loading}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </div>
  );
};

export default SingleUser;

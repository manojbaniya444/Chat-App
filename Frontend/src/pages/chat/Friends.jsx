import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Users } from "../../ui";
import { fetchUsers, fetchUsersWithMatchedUsername } from "../../app/index";

const Friends = () => {
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();

  //user data
  const { users, loading, error, token } = useSelector((state) => state.user);

  useEffect(() => {
    let timer;
    if (username) {
      timer = setTimeout(() => {
        dispatch(fetchUsersWithMatchedUsername(username));
      }, 500);
    } else dispatch(fetchUsers());

    return () => clearTimeout(timer);
  }, [username]);

  return (
    <div className="p-5 bg-zinc-950 text-white h-[100vh]">
      <div>
        <input
          type="search"
          placeholder="Search friends here"
          className="bg-gray-200 text-xl text-black"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <Users
        users={users}
        loading={loading}
        username={username === "" ? false : true}
      />
    </div>
  );
};

export default Friends;

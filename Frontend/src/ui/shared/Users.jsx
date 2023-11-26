import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../app/index";
import axios from "axios";
import SingleUser from "../components/SingleUser";

const Users = () => {
  //user data
  const { users, loading, error, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  // user data

  console.log(users);
  return (
    <div className="bg-gray-100 mt-5 p-5 roundd-md flex gap-5 flex-col">
      {users?.map((item) => {
        return <SingleUser key={item._id} data={item} />;
      })}
    </div>
  );
};

export default Users;

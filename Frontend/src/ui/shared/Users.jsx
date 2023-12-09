import React from "react";
import SingleUser from "../components/SingleUser";

const Users = ({ users, loading, username }) => {
  if (loading)
    return (
      <p className="text-center mt-10 text-base md:text-xl">
        Loading fetching users...
      </p>
    );

  if (users.length === 0 && username) {
    return (
      <p className="text-white text-center mt-20 text-base md:text-xl">
        Users with the username not found.
      </p>
    );
  }

  return (
    <div className="">
      <h3 className="mt-5 text-base font-bold">All users on Kurakani</h3>
      <p className="text-sm font-light">
        Add them to your chat list by clicking.
      </p>
      <div className="bg-zinc-800 text-white mt-5 p-5 max-h-[500px] flex gap-5 flex-col rounded-md overflow-y-auto scrollbar-style">
        {users?.map((item) => {
          return <SingleUser key={item._id} data={item} />;
        })}
      </div>
    </div>
  );
};

export default Users;

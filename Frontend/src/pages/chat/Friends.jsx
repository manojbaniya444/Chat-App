import React, { useState } from "react";
import { Users } from "../../ui";

const Friends = () => {
  const [username, setUsername] = useState("");

  return (
    <div className="p-5">
      <div>
        <input
          type="search"
          placeholder="Search friends here"
          className="bg-gray-200 text-xl"
        />
      </div>
      <h3 className="mt-5 text-xl font-bold">All users on Kurakani</h3>
      <Users />
    </div>
  );
};

export default Friends;

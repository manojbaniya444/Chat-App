import React from "react";
import { Avatar, IconButton } from "../../ui";
import { FiSettings } from "react-icons/fi";
import { HiUserGroup } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import { BiSolidMessageRoundedAdd } from "react-icons/bi";
import { Link } from "react-router-dom";

const Menu = () => {
  // Menu action buttons
  const list = [
    {
      type: "Add friend",
      src: <FaUserAlt />,
    },
    {
      type: "Join Group",
      src: <HiUserGroup />,
    },
    {
      type: "Friend List",
      src: <BiSolidMessageRoundedAdd />,
    },
    {
      type: "Setting",
      src: <FiSettings />,
    },
  ];
  return (
    <div className="flex gap-1 justify-between p-2 bg-orange-300">
      {list.map((item, index) => {
        return (
          <div className="flex flex-col gap-1 items-center" key={index}>
            <Link to="/">
              <div key={index}>
                <IconButton>{item.src}</IconButton>
              </div>
              <p className="font-extralight text-xs lg:text-sm">{item.type}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;

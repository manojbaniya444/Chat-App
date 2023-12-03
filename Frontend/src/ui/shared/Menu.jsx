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
      link: "/search-friends",
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
    <div className="flex gap-1 bg-zinc-900 justify-evenly items-center h-[70px]">
      {list.map((item, index) => {
        return (
          <div className="flex flex-col gap-1 items-center" key={index}>
            <Link to={item.link}>
              <div key={index}>
                <IconButton>{item.src}</IconButton>
              </div>
              <p className="font-extralight text-xs lg:text-sm text-white">{item.type}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;

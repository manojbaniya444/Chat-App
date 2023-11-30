import React from "react";
import { IconButton } from "../../ui";
import { FiSettings } from "react-icons/fi";
import { HiUserGroup } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import { BiSolidMessageRoundedAdd } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";

const MobileMenu = ({ setMobileView }) => {
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
    <div className="absolute top-0 left-0 z-20 md:hidden bg-gray-200 p-5 flex flex-col gap-2 h-screen w-1/2 pt-32 shadow-lg">
      <div className="absolute top-5 right-5">
        <IconButton onClick={() => setMobileView(false)}>
          <GrClose />
        </IconButton>
      </div>
      {list.map((item) => {
        return (
          <Link to={item.link}>
            <div
              key={item.type}
              className="flex gap-2 items-center hover:bg-gray-100 p-2 rounded-md select-none"
            >
              <IconButton>{item.src}</IconButton>
              <p>{item.type}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MobileMenu;

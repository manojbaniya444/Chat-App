import { useSelector } from "react-redux";

const { allUsers } = useSelector((state) => state.user);

export const getUserById = (userId) => {
  return allUsers.find((user) => user._id === userId);
};

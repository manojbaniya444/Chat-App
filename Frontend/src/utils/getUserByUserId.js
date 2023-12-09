import axios from "axios";

export const getUserByUserId = async (userId) => {
  const response = await axios.get(
    `/api/user/single-user/${userId}`
  );
  if (response.status === 200) {
    return response.data.user;
  }
  return null
};

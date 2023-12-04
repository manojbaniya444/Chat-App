import axios from "axios";

export const getUserByUserId = async (userId) => {
  const response = await axios.get(
    `http://localhost:8080/api/user/single-user/${userId}`
  );
  if (response.status === 200) {
    return response.data.user;
  }
  return null
};

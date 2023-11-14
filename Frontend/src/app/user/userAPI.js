import axios from "axios";

export const createUserThunk = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/user/create-account",
      userData
    );
    return response;
  } catch (error) {
    return error
  }
};

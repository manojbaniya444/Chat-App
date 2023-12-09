import axios from "axios";

export const createUserThunk = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/user/create-account",
      userData
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const loginUserThunk = async (userData) => {
  try {
    return await axios.post("http://localhost:8080/api/user/login", userData);
  } catch (error) {
    return error;
  }
};

export const fetchUsersThunk = async (token) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/user/all-users",
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUsersWithMatchedUsernameThunk = async (token, username) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/user/search-users`,
      {
        username,
      },
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

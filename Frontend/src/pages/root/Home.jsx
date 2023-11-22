import React from "react";
import HomeLeft from "./HomeLeft";
import HomeRight from "./HomeRight";
// import { useSelector } from "react-redux";

const Home = () => {
  // const { token, authData } = useSelector((state) => state.user);
  // console.log(token, authData);
  return (
    <main className="flex w-screen">
      <HomeLeft />
      <HomeRight />
    </main>
  );
};

export default Home;

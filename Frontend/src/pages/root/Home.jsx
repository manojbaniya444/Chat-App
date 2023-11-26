import React, { useEffect } from "react";
import HomeLeft from "./HomeLeft";
import HomeRight from "./HomeRight";
const Home = () => {
  return (
    <main className="flex w-screen">
      <HomeLeft />
      <HomeRight />
    </main>
  );
};

export default Home;

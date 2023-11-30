import React, { useEffect } from "react";
import HomeLeft from "./HomeLeft";
import HomeRight from "./HomeRight";
const Home = () => {
  return (
    <main className="flex w-screen max-w-[100vw]">
      <HomeLeft />
      <HomeRight />
    </main>
  );
};

export default Home;

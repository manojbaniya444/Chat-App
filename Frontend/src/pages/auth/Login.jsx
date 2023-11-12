import React from "react";
import { Button } from "../../ui";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen flex-col gap-2">
      <h1 className="text-xl md:text-2xl font-bold">Login</h1>
      <form
        className="bg-gray-200 p-5 flex flex-col gap-2 rounded-md"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <label>Username</label>
          <input type="text" placeholder="Enter registered username" required/>
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="password" required/>
        </div>
        <Button type="submit">Login</Button>
        <Link className="underline text-blue-500 text-sm" to="/signup">Don't have an account ? Create One</Link>
      </form>
    </div>
  );
};

export default Login;

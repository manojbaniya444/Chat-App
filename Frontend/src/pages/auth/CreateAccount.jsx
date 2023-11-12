import React from "react";
import { Button } from "../../ui";
import { Link } from "react-router-dom";

const CreateAccount = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen flex-col gap-2">
      <h1 className="text-xl md:text-2xl font-bold">Sign Up</h1>
      <form
        className="bg-gray-200 p-5 flex flex-col gap-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <label>Choose Profile Pic</label>
          <input type="file" required />
        </div>
        <div className="">
          <label>Username</label>
          <input type="text" placeholder="Enter unique username" required/>
        </div>
        <div>
          <label>Email</label>
          <input type="email" placeholder="example@gmail.com" required/>
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="password" required/>
        </div>
        <div>
          <label>Security Question</label>
          <p className="text-xs text-gray-700 p-2">
            What is your childhood name ?
          </p>
          <input type="text" required placeholder="Your answer"/>
        </div>
        <Button type="submit">Create Account</Button>
        <Link to="/login" className="text-blue-500 underline">Already have an account ? Login</Link>
      </form>
    </div>
  );
};

export default CreateAccount;

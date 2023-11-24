import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createUser } from "../../app/index";
import { Button } from "../../ui";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const CreateAccount = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    fullName: "",
  });
  const [file, setFile] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, signupSuccess } = useSelector((state) => state.user);

  // calling the dispatch in this function with user data to create a new account
  const createUserHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("url", file);
    formData.append("username", form.username);
    formData.append("password", form.password);
    formData.append("fullName", form.fullName);
    dispatch(createUser(formData));
  };

  // check the status of success to navigate and perform UI updates
  useEffect(() => {
    if (signupSuccess && !loading) {
      setForm({
        username: "",
        password: "",
        fullName: "",
      });
      navigate("/login");
    }
  }, [signupSuccess]);

  return (
    <div className="flex items-center justify-center w-screen h-screen flex-col gap-2">
      <h1 className="text-xl md:text-2xl font-bold">Sign Up</h1>
      <form
        className="bg-gray-200 p-5 flex flex-col gap-2"
        onSubmit={(e) => createUserHandler(e)}
      >
        {/* error message to show if any */}
        {error && (
          <h3 className="text-base font-medium text-red-700">{error}</h3>
        )}
        {file && (
          <div className="self-center w-[100px] h-[100px]">
            <img
              src={URL.createObjectURL(file)}
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        )}

        <div className="">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter unique username"
            required
            value={form.username}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, username: e.target.value }))
            }
          />
        </div>
        {/* <div>
          <label>Email</label>
          <input type="email" placeholder="example@gmail.com" required/>
        </div> */}
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            required
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            required
            value={form.fullName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, fullName: e.target.value }))
            }
          />
        </div>
        <div className="text-sm">
          <label>Select profile picture</label>
          <input
            name="file"
            type="file"
            accept="image/*"
            required
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        {/* <div>
          <label>Security Question</label>
          <p className="text-xs text-gray-700 p-2">
            What is your childhood name ?
          </p>
          <input type="text" required placeholder="Your answer"/>
        </div> */}
        <Button type="submit">
          {loading ? (
            <ClipLoader
              color="white"
              loading={loading}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : file ? (
            "Create Account"
          ) : (
            "Profile pic required"
          )}
        </Button>
        <Link to="/login" className="text-blue-500 underline">
          Already have an account ? Login
        </Link>
      </form>
    </div>
  );
};

export default CreateAccount;

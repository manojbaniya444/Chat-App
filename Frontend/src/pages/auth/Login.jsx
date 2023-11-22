import React, { useEffect, useState } from "react";
import { Button } from "../../ui";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../app/index";
import ClipLoader from "react-spinners/ClipLoader";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, loginSuccess, authData, token } = useSelector(
    (state) => state.user
  );

  const loginUserHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (loginSuccess && !loading) {
      setFormData({
        username: "",
        password: "",
      });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(authData));
      navigate("/");
    }
  }, [loginSuccess]);

  return (
    <div className="flex items-center justify-center w-screen h-screen flex-col gap-2">
      <h1 className="text-xl md:text-2xl font-bold">Login</h1>
      <form
        className="bg-gray-200 p-5 flex flex-col gap-2 rounded-md"
        onSubmit={loginUserHandler}
      >
        {error && (
          <h3 className="text-base font-medium text-red-700">{error}</h3>
        )}
        <div>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter registered username"
            required
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>
        <Button type="submit">
          {loading ? (
            <ClipLoader
              color="white"
              loading={loading}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Login"
          )}
        </Button>
        <Link className="underline text-blue-500 text-sm" to="/signup">
          Don't have an account ? Create One
        </Link>
      </form>
    </div>
  );
};

export default Login;

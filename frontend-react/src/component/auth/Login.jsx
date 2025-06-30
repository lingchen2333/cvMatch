import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../../store/features/authSlice";
import FormRow from "../common/FormRow";
import Button from "../common/Button";
import toast from "react-hot-toast";
import Logo from "../common/Logo";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "test@gmail.com",
    password: "123456",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
      window.location.reload();
    }
  }, [isAuthenticated, navigate, from]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((previousInput) => ({
      ...previousInput,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      toast.error("Invalid username or password");
      return;
    }
    try {
      console.log("signing in");
      const response = await dispatch(login(credentials)).unwrap();
    } catch (error) {
      toast.error("Username and password do not match");
    }
  };

  return (
    <div className="mx-auto my-10 flex w-full flex-col items-center justify-between space-y-12 md:my-16 md:w-2xl">
      <h4 className="text-4xl font-medium">Hello Again!</h4>

      <form
        className="w-3/4 space-y-6 rounded-2xl bg-white p-4"
        onSubmit={handleLogin}
      >
        <div className="space-y-4">
          <FormRow
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={credentials.email}
            required={true}
            handleChange={handleInputChange}
          />

          <FormRow
            name="password"
            type="password"
            placeholder="Enter your password"
            value={credentials.password}
            required={true}
            handleChange={handleInputChange}
          />
        </div>

        <Button className="flex w-full" type="submit" style="blue">
          Sign in
        </Button>

        <div className="text-center text-sm">
          <p className="text-gray-600">
            Don't have an account yet?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-700 transition-colors duration-200 hover:text-blue-500"
            >
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;

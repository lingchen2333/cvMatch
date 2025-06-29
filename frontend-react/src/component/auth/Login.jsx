import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../../store/features/authSlice";
import { BsPersonFill, BsLockFill } from "react-icons/bs";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

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
      setErrorMessage("Invalid username or password");
      return;
    }
    try {
      const response = await dispatch(login(credentials)).unwrap();
    } catch (error) {
      toast.error("Username and password do not match");
    }
  };

  return (
    <div className="flex h-dvh items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-sm">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <BsPersonFill className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full rounded-md border border-gray-300 py-2 pr-3 pl-10 focus:border-blue-500 focus:outline-none sm:text-sm"
                  placeholder="Enter your email address"
                  value={credentials.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <BsLockFill className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border border-gray-300 py-2 pr-3 pl-10 focus:border-blue-500 focus:outline-none sm:text-sm"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="focus:ring-blue-700focus:ring-offset-2 flex w-full justify-center rounded-full border border-transparent bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-blue-500 focus:ring-2 focus:outline-none"
            >
              Sign in
            </button>
          </div>

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
    </div>
  );
};

export default Login;

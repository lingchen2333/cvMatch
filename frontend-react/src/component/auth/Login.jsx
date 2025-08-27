import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../../store/features/authSlice";
import FormRow from "../common/form/FormRow";
import Button from "../common/Button";
import toast from "react-hot-toast";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "test@gmail.com",
    password: "123456",
  });
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      console.log("signing in");
      const response = await dispatch(login(credentials)).unwrap();
    } catch (error) {
      toast.error("Username and password do not match");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-slate-100">
      <div className="mx-auto flex w-full flex-col items-center justify-center space-y-12 pt-8 md:w-2xl">
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

          <Button
            className="flex w-full"
            type="submit"
            style="blue"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>

          {isLoading && (
            <div className="rounded-lg bg-blue-50 p-3 text-center text-sm text-gray-600">
              <p>
                Please wait while we sign you in. The backend may take a moment
                to spin up.
              </p>
            </div>
          )}

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

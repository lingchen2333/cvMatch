import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FormRow from "../common/form/FormRow";
import Button from "../common/Button";
import toast from "react-hot-toast";
import { registerUser } from "../../store/features/userSlice";
const Register = () => {
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((previousInput) => ({
      ...previousInput,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !credentials.firstName ||
      !credentials.lastName ||
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (credentials.password !== credentials.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (credentials.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      console.log("registering user");
      const response = await dispatch(
        registerUser({
          firstName: credentials.firstName,
          lastName: credentials.lastName,
          email: credentials.email,
          password: credentials.password,
        }),
      ).unwrap();

      // Clear form fields after successful registration
      setCredentials({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      toast.success(
        "Registration successful! Please log in with your new account.",
      );
      // Pass the registered email to the login page
      navigate("/login", { state: { registeredEmail: credentials.email } });
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="h-screen bg-slate-100">
      <div className="mx-auto flex w-full flex-col items-center justify-center space-y-12 pt-8 md:w-2xl">
        <h4 className="text-4xl font-medium">Create Account</h4>

        <form
          className="w-3/4 space-y-6 rounded-2xl bg-white p-4"
          onSubmit={handleRegister}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormRow
                name="firstName"
                labelText="First Name"
                type="text"
                placeholder="Enter your first name"
                value={credentials.firstName}
                required={true}
                handleChange={handleInputChange}
              />

              <FormRow
                name="lastName"
                labelText="Last Name"
                type="text"
                placeholder="Enter your last name"
                value={credentials.lastName}
                required={true}
                handleChange={handleInputChange}
              />
            </div>

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

            <FormRow
              name="confirmPassword"
              labelText="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={credentials.confirmPassword}
              required={true}
              handleChange={handleInputChange}
            />
          </div>

          <Button className="flex w-full" type="submit" style="blue">
            Create Account
          </Button>

          <div className="text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-700 transition-colors duration-200 hover:text-blue-500"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

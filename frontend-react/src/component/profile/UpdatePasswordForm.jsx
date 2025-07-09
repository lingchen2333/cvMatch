import React, { useState } from "react";
import FormRow from "../common/form/FormRow";
import Button from "../common/Button";
import { useDispatch } from "react-redux";
import { updateAuthenticatedUser } from "../../store/features/userSlice";
import toast from "react-hot-toast";

const UpdatePasswordForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    password: "",
    repeatedPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (formData.password !== formData.repeatedPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const promise = dispatch(
      updateAuthenticatedUser({ password: formData.password }),
    );
    toast.promise(promise, {
      loading: "Saving changes...",
      success: "Password updated!",
      error: "Could not update password",
    });
    try {
      await promise;
      setFormData({ password: "", repeatedPassword: "" });
    } catch (error) {
      // Error handled by toast
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      className="space-y-6 rounded-2xl p-4 md:w-3xl"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-y-8 md:col-span-2">
        <FormRow
          name="password"
          labelText="New password (min 6 chars)"
          type="password"
          value={formData.password}
          required={true}
          handleChange={handleInputChange}
        />

        <FormRow
          name="repeatedPassword"
          labelText="Confirm Password"
          type="password"
          value={formData.repeatedPassword}
          required={true}
          handleChange={handleInputChange}
        />
      </div>

      <Button className="ms-auto mt-10 flex w-3xs" type="submit" style="blue">
        Update password
      </Button>
    </form>
  );
};

export default UpdatePasswordForm;

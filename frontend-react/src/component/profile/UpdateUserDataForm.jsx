import React, { useEffect, useState } from "react";
import FormRow from "../common/form/FormRow";
import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthenticatedUser,
  updateAuthenticatedUser,
} from "../../store/features/userSlice";
import toast from "react-hot-toast";

const UpdateUserDataForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    dispatch(getAuthenticatedUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const promise = dispatch(updateAuthenticatedUser(formData));
    toast.promise(promise, {
      loading: "Saving changes...",
      success: "Profile updated!",
      error: "Could not update profile",
    });
    try {
      await promise;
      dispatch(updateAuthenticatedUser(formData));
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
      <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-28">
        <FormRow
          name="firstName"
          labelText="First Name"
          type="text"
          value={formData.firstName}
          required={true}
          handleChange={handleInputChange}
        />

        <FormRow
          name="lastName"
          labelText="Last Name"
          type="text"
          value={formData.lastName}
          required={true}
          handleChange={handleInputChange}
        />
      </div>

      <Button className="ms-auto mt-10 flex w-3xs" type="submit" style="blue">
        Update name
      </Button>
    </form>
  );
};

export default UpdateUserDataForm;

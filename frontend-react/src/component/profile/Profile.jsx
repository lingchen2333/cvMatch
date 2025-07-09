import React, { useEffect } from "react";
import FormRow from "../common/form/FormRow";
import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { getAuthenticatedUser } from "../../store/features/userSlice";
import UpdateUserDataForm from "./UpdateUserDataForm";
import UpdatePasswordForm from "./UpdatePasswordForm";

const Profile = () => {
  return (
    <div className="flex flex-col gap-y-5">
      <h1 className="ms-5 text-xl font-medium">Account Settings</h1>
      <div>
        <h2 className="text-l ms-5 font-medium">Update user Name</h2>
        <UpdateUserDataForm />
      </div>
      <div>
        <h2 className="text-l ms-5 font-medium">Update password</h2>
        <UpdatePasswordForm />
      </div>
    </div>
  );
};

export default Profile;

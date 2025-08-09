import { logout as logoutAction } from "../store/features/authSlice";
import { store } from "../store/store";

export const logout = () => {
  console.log("Before logout - Redux state:", store.getState().auth);
  console.log("Store object:", store);
  console.log("Logout action:", logoutAction);

  localStorage.removeItem("accessToken");
  localStorage.removeItem("userRoles");
  localStorage.removeItem("userId");

  // Dispatch logout action to update Redux state
  const result = store.dispatch(logoutAction());
  console.log("Dispatch result:", result);
  console.log("After logout - Redux state:", store.getState().auth);
};

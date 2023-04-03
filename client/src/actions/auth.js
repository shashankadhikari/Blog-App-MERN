import * as api from "../api";
import toast from "react-hot-toast";
import { AUTH } from "../constants/actionTypes";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    await dispatch({ type: AUTH, data });
    toast.success("Logged in successful");
    navigate("/posts");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    await dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import ButtonLoading from "./ButtonLoading.jsx";
import {
  setForgottenPassword,
  clearSetForgottenPasswordError,
} from "../store/Slice/authSlice.js";

const SetForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm();
  const { loading, setForgottenPasswordError } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    dispatch(clearSetForgottenPasswordError());
  }, []);

  const userId = location.state;

  const onSubmit = async (data) => {
    const response = await dispatch(
      setForgottenPassword({ userId, password: data.password }),
    );

    if (response.type == setForgottenPassword.fulfilled) {
      console.log("aaaaa");

      navigate("/login");
      resetField("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 sm:px-6 py-10">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Set your Password
          </h1>

          <p className="text-slate-400 text-sm mt-2">
            Please enter your new password.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your new password"
              {...register("password", {
                required: "password is required",
              })}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl py-3 mt-5 font-semibold transition duration-300 ${
              loading
                ? "cursor-not-allowed bg-cyan-500/60"
                : "bg-cyan-400 hover:bg-cyan-300 text-slate-900 shadow-lg shadow-cyan-500/20"
            }`}
          >
            {loading ? <ButtonLoading /> : "Change Password"}
          </button>
        </form>
        {setForgottenPasswordError && (
          <p className="mt-2 text-sm text-red-400">
            {setForgottenPasswordError}
          </p>
        )}
      </div>
    </div>
  );
};

export default SetForgetPassword;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  forgottenPassword,
  clearForgottenPasswordError,
} from "../store/Slice/authSlice.js";
import ButtonLoading from "./ButtonLoading.jsx";

const ForgottenPassword = () => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth?.loading);
  const forgottenPasswordError = useSelector(
    (state) => state.auth?.forgottenPasswordError,
  );

  useEffect(() => {
    dispatch(clearForgottenPasswordError());
  }, []);

  const onSubmit = async (data) => {
    const response = await dispatch(forgottenPassword(data));

    if (response.type === "forgottenPassword/fulfilled") {
      navigate("/verifyEmail", {
        state: {
          userId: response.payload._id,
          type: "forgetPassword",
        },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 sm:px-6 py-10">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Forgot your Password
          </h1>

          <p className="text-slate-400 text-sm mt-2">
            Please enter your registered email.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your registered email"
              {...register("email", {
                required: "email is required",
              })}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-400">
                {errors.email.message}
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
        {forgottenPasswordError && (
          <p className="text-red-400 text-sm text-center mt-3 mb-4 bg-red-500/10 border border-red-500/30 p-2 rounded-md">
            {forgottenPasswordError}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgottenPassword;

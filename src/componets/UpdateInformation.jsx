import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Input from "../componets/Inpute.jsx";
import Button from "../componets/Button.jsx";
import { changeCurrentPassword, getCurrentUser } from "../store/Slice/authSlice";
import ButtonLoading from "../componets/ButtonLoading.jsx"
import { useNavigate } from "react-router-dom";

function UpdateInformation() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    resetField,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const updatePasswordError = useSelector(
    (state) => state.auth.changeCurrentPasswordError,
  );
  const loading = useSelector((state) => state.auth.loading);


  const onSubmit = async (data) =>{
    const response = await dispatch(changeCurrentPassword({
      currentPassword : data?.currentPassword,
      newPassword : data.newPassword
    }));
    
    if(response.type === changeCurrentPassword.fulfilled.type){
      resetField("currentPassword");
      resetField("newPassword");
      resetField("confirmNewPassword");
      navigate("/home")
    }
   
    
  }

 

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 sm:px-6 py-10">
    <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6 sm:p-8">

      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Change Password
        </h1>

        <p className="text-slate-400 text-sm mt-2">
          Update your account password to keep your account secure.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >

        {/* Current Password */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Current Password
          </label>

          <input
            type="password"
            placeholder="Enter current password"
            {...register("currentPassword", {
              required: "Current password is required",
            })}
            className="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
          />

          {errors.currentPassword && (
            <p className="mt-2 text-sm text-red-400">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            New Password
          </label>

          <input
            type="password"
            placeholder="Enter new password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
          />

          {errors.newPassword && (
            <p className="mt-2 text-sm text-red-400">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm new password"
            {...register("confirmNewPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === getValues("newPassword") ||
                "Passwords do not match",
            })}
            className="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
          />

          {errors.confirmNewPassword && (
            <p className="mt-2 text-sm text-red-400">
              {errors.confirmNewPassword.message}
            </p>
          )}
        </div>

        {/* API Error */}
        {updatePasswordError && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
            <p className="text-sm text-red-400">
              {updatePasswordError}
            </p>
          </div>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-xl py-3 font-semibold transition duration-300 ${
            loading
              ? "cursor-not-allowed bg-cyan-500/60"
              : "bg-cyan-400 hover:bg-cyan-300 text-slate-900 shadow-lg shadow-cyan-500/20"
          }`}
        >
          {loading ? <ButtonLoading /> : "Change Password"}
        </button>
      </form>
    </div>
  </div>
);
}

export default UpdateInformation;

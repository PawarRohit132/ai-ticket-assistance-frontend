import React from "react";
import Input from "./Inpute.jsx";
import Button from "./Button.jsx";
import Loading from "./Loading.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { userLogin, getCurrentUser } from "../store/Slice/authSlice.js";
import { useForm } from "react-hook-form";
import { clearLoginError } from "../store/Slice/authSlice.js";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const loading = useSelector((state) => state.auth.loading);
  const loginError = useSelector((state)=> state.auth.loginError)

  useEffect(() => {
   dispatch(clearLoginError()) 
  },[])


  const submit = async (data) => {
    const response = await dispatch(userLogin(data));
    if (response.type === "login/fulfilled") {
      await dispatch(getCurrentUser());
      navigate("/home");
    }
    else{
      navigate("/login")
      
    }
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        {/* Logo */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <span className="text-2xl font-bold text-slate-900">AI</span>
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
            Welcome Back
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Login to continue managing your AI powered tickets
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(submit)} className="mt-8 space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-cyan-400 py-3 text-sm font-semibold text-slate-900 hover:bg-cyan-300 transition-all duration-300 shadow-lg shadow-cyan-500/20"
          >
            {loading ? "Loading" : "Login"}
          </button>
          {loginError && (
            <p className="text-red-400 text-sm text-center mb-4 bg-red-500/10 border border-red-500/30 p-2 rounded-md">
              {loginError}
            </p>
          )}
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-400">
          Don’t have an account?{" "}
          <Link
            to="/signin"
            className="font-semibold text-cyan-400 hover:text-cyan-300 transition"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

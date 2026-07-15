import React from "react";
import Input from "../componets/Inpute.jsx";
import Button from "../componets/Button.jsx";
import Loading from "./Loading.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { createAccount, userLogin } from "../store/Slice/authSlice.js";
import ButtonLoading from "../componets/ButtonLoading.jsx"

function SignIn() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);
  const signupError = useSelector((state) => state.auth.signupError);

  const submit = async (data) => {
    const response = await dispatch(createAccount(data));

    if (response.type === "register/fulfilled") {
      const email = data?.email;
      const password = data?.password;

      const loginResult = await dispatch(userLogin({ email, password }));
      if (loginResult?.type === "login/fulfilled") {
        navigate("/home");
      } else {
        navigate("/signin");
      }
    }
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center">
          {/* Logo */}
          <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-400 shadow-lg shadow-cyan-500/30">
            <span className="text-2xl font-extrabold text-slate-900">AI</span>
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
            Create Account
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Join Ticket AI and manage support smarter with AI
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
              <p className="mt-2 text-xs text-red-400">
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
              <p className="mt-2 text-xs text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              role
            </label>

            <select
              {...register("role", {
                required: "role is required",
              })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-black placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300"
            >
              <option value="">Select Your Type</option>
              <option value="user">user</option>
              <option value="moderator">moderator</option>
            </select>

            {errors.role && (
              <p className="mt-2 text-xs text-red-400">{errors.role.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Skills
            </label>

            <div className="flex flex-wrap gap-2">
              {[
                "mongoose",
                "express",
                "react.js",
                "node.js",
                "javascript",
                "mongodb",
                "typescript",
                "next.js",
              ].map((skill) => {
                const selected = watch("skills") || [];
                const isSelected = selected.includes(skill);

                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => {
                      const current = watch("skills") || [];
                      if (current.includes(skill)) {
                        setValue(
                          "skills",
                          current.filter((s) => s !== skill),
                        );
                      } else {
                        setValue("skills", [...current, skill]);
                      }
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 
            ${
              isSelected
                ? "bg-cyan-400 text-black border-cyan-400"
                : "bg-white/5 text-slate-300 border-white/10 hover:border-cyan-400/50"
            }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>

            <input
              type="hidden"
              {...register("skills", {
                required: "Select atleast 1 skills",
              })}
            />

            {errors.skills && (
              <p className="mt-2 text-xs text-red-400">
                {errors.skills.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-cyan-400 py-3 text-sm font-bold text-slate-900 hover:bg-cyan-300 transition-all duration-300 shadow-lg shadow-cyan-500/20"
          >
            {loading ? <ButtonLoading/> : "Sign In"}
          </button>
          {signupError && (
            <p className="text-red-400 text-sm text-center mb-4 bg-red-500/10 border border-red-500/30 p-2 rounded-md">
              {signupError}
            </p>
          )}
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-cyan-400 hover:text-cyan-300 transition-all duration-300"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;

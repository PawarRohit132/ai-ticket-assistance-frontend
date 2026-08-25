import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  verifyEmail,
  clearVerifyEmailError,
  clearVerifyForgottenPasswordError,
  verifyForgottenPassword,
  userLogin,
  getCurrentUser,
  resendOtp,
} from "../store/Slice/authSlice.js";

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const loading = useSelector((state) => state.auth?.loading);
  const { verifyEmailError, verifyForgottenPasswordError } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    dispatch(clearVerifyEmailError());
    dispatch(clearVerifyForgottenPasswordError());
  }, []);

  const { userId, email, password, type } = location.state;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      alert("Please enter 6 digit OTP");
      return;
    }

    if (type === "signin") {
      const result = await dispatch(verifyEmail({ userId, otp }));
      dispatch;

      if (verifyEmail.fulfilled.match(result)) {
        const loginResult = await dispatch(userLogin({ email, password }));
        if (loginResult?.type === "login/fulfilled") {
          await dispatch(getCurrentUser());
          navigate("/home");
        }
      }
    }

    if (type === "forgetPassword") {
      const result = await dispatch(verifyForgottenPassword({ userId, otp }));

      if (verifyForgottenPassword.fulfilled.match(result)) {
        navigate("/setForgetPassword", {
          state: userId,
        });
      }
    }
  };

  const handleResendOtp = async () => {
    const userID = location.state;
    const userId = userID.userId;
    
    
    

    const result = await dispatch(resendOtp(userId));
    
    
    if (resendOtp.fulfilled.match(result)) {
        alert("OTP resend successfully")
        
    } else {
      alert(result.payload || "Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050816] flex items-center justify-center px-4">
      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

      {/* Main Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/[0.06] backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Logo / AI Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white text-2xl font-bold">AI</span>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Verify Your Email</h1>

            <p className="text-sm text-gray-400 mt-2 leading-6">
              Enter the 6-digit verification code sent to your email
            </p>

            {email && (
              <p className="text-blue-400 text-sm mt-1 font-medium">{email}</p>
            )}
          </div>

          {/* OTP Form */}
          <form onSubmit={handleSubmit} className="mt-8">
            <label className="block text-sm text-gray-300 mb-2">
              Verification Code
            </label>

            <input
              type="text"
              value={otp}
              onChange={(e) => {
                const value = e.target.value;

                if (/^\d*$/.test(value) && value.length <= 6) {
                  setOtp(value);
                }
              }}
              placeholder="000000"
              maxLength={6}
              inputMode="numeric"
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-center text-2xl tracking-[10px] text-white placeholder:text-gray-600 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            <button
              className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg shadow-blue-600/20 transition-all duration-200 hover:from-blue-500 hover:to-purple-500 hover:shadow-blue-500/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleResendOtp}
            >
              Resend OTP
            </button>

            {/* Error */}
            {verifyEmailError && (
              <div className="mt-3 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-red-400 text-sm text-center">
                  {verifyEmailError}
                </p>
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg shadow-blue-600/20 transition-all duration-200 hover:from-blue-500 hover:to-purple-500 hover:shadow-blue-500/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying...
                </span>
              ) : (
                "Verify Email"
              )}
            </button>

            {verifyEmailError ||
              (verifyForgottenPasswordError && (
                <p className="text-red-400 text-sm text-center mt-3 mb-4 bg-red-500/10 border border-red-500/30 p-2 rounded-md">
                  {verifyEmailError}, {verifyForgottenPasswordError}
                </p>
              ))}
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 mt-6">
            Your account is protected by secure email verification
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../store/Slice/authSlice.js";
import Button from "../Button.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  const logout = async () => {
    await dispatch(userLogout());
    navigate("/login");
  };

  return (
    <div className="navbar bg-slate-800 text-white px-6 py-4 shadow-lg flex items-center justify-between relative">

      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="text-3xl font-bold tracking-wide">
          Ticket<span className="text-cyan-400">AI</span>
        </Link>
      </div>

      {/* Hamburger — mobile only */}
      {authStatus && (
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      )}

      {/* Desktop — Right Side */}
      <div className="hidden md:flex items-center gap-4">
        {!authStatus ? (
          <>
            <Link
              to="/signin"
              className="px-5 py-2 rounded-xl border border-cyan-400 text-cyan-400 font-medium hover:bg-cyan-400 hover:text-slate-900 transition duration-300"
            >
              Signup
            </Link>
            <Link
              to="/login"
              className="px-5 py-2 rounded-xl bg-cyan-400 text-slate-900 font-semibold hover:bg-cyan-300 transition duration-300"
            >
              Login
            </Link>
          </>
        ) : (
          <>
            {/* User Info */}
            <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-cyan-400 text-slate-900 flex items-center justify-center font-bold uppercase">
                {userData?.email?.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Signed in as</span>
                <span className="text-sm font-medium max-w-[180px] truncate">{userData?.email}</span>
              </div>
              <div className="flex items-center flex-col">
                <span className="text-xs text-gray-400">Role 🤖</span>
                <span className="text-sm font-medium max-w-[180px] truncate">{userData?.role}</span>
              </div>
            </div>

            {userData?.role === "admin" && (
              <Link
                to="/admin"
                className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 transition duration-300"
              >
                Admin Panel
              </Link>
            )}

            <Button
              onClick={logout}
              className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 border-none text-white transition duration-300"
            >
              Logout
            </Button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-800 border-t border-white/10 px-6 py-4 flex flex-col gap-4 z-50 shadow-xl">
          {!authStatus ? (
            <>
              <Link
                to="/signin"
                onClick={() => setMenuOpen(false)}
                className="px-5 py-2 rounded-xl border border-cyan-400 text-cyan-400 font-medium text-center hover:bg-cyan-400 hover:text-slate-900 transition duration-300"
              >
                Signup
              </Link>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="px-5 py-2 rounded-xl bg-cyan-400 text-slate-900 font-semibold text-center hover:bg-cyan-300 transition duration-300"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              {/* User Info */}
              <div className="flex items-center gap-3 bg-slate-700 px-4 py-3 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-cyan-400 text-slate-900 flex items-center justify-center font-bold uppercase">
                  {userData?.email?.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Signed in as</span>
                  <span className="text-sm font-medium truncate">{userData?.email}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Role 🤖</span>
                  <span className="text-sm font-medium">{userData?.role}</span>
                </div>
              </div>

              {userData?.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-center transition duration-300"
                >
                  Admin Panel
                </Link>
              )}

              <Button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 border-none text-white transition duration-300 w-full"
              >
                Logout
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../componets/Button.jsx";
import { userLogout } from "../store/Slice/authSlice";

const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  const logout = async () => {
    await dispatch(userLogout());
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
   <div className="relative inline-block" ref={dropdownRef}>
  {/* Button */}
  <button
    onClick={() => setOpen(!open)}
    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
  >
    Options

    <svg
      className={`h-4 w-4 transition-transform duration-300 ${
        open ? "rotate-180" : ""
      }`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>

  {/* Dropdown */}
  {open && (
    <div className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
      <ul className="py-2">
        {authStatus && (
          <li>
            <Link
              to="/home"
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition"
              onClick={() => setOpen(false)}
            >
              🏠 Home
            </Link>
          </li>
        )}
        {authStatus && (
          <li>
            <Link
              to="/update-information"
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition"
              onClick={() => setOpen(false)}
            >
              ⚙️ Settings
            </Link>
          </li>
        )}
        

        {userData?.role === "admin" && (
          <li>
            <Link
              to="/admin"
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-purple-600 transition"
              onClick={() => setOpen(false)}
            >
              👑 Admin Panel
            </Link>
          </li>
        )}
      </ul>

      <div className="border-t border-gray-200 p-2">
        <Button
          onClick={logout}
          className="w-full rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
        >
          Logout
        </Button>
      </div>
    </div>
  )}
</div>
  );
};

export default Dropdown;

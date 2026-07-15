import React, { useEffect, useState } from "react";
import Button from "../componets/Button.jsx";
import { udateUserDetails, getAllUsers } from "../store/Slice/authSlice.js";
import { useDispatch, useSelector } from "react-redux";

function Admin({ users }) {
  const dispatch = useDispatch();
  const allUserData = useSelector((state) => state.auth.allUserData?.length);

  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ role: "", skills: "" });

  const handleEditClick = (user) => {
    setEditingUser(user.email);
    setFormData({
      role: user.role,
      skills: user.skills?.join(", "),
    });
  };

  const handleUpdate = () => {
    const updatedUser = {
      email: editingUser,
      role: formData.role,
      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    };
    dispatch(udateUserDetails(updatedUser));
    dispatch(getAllUsers());
    setEditingUser(null);
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Admin <span className="text-cyan-400">Panel</span>
          </h1>
          <p className="text-slate-400 mt-2">
            Manage all registered {allUserData} users
          </p>
          <div className="mt-4 h-px bg-gradient-to-r from-cyan-400/50 to-transparent"></div>
        </div>

        {/* Users Grid */}

        {users && users.length > 0 ? (
          <div className="grid gap-4">
            {users.map((user, index) => (
              <div
                key={user._id}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-cyan-400/40 hover:bg-white/8 transition-all duration-300 shadow-xl"
              >
                <div className="flex flex-col items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-white font-semibold text-lg group-hover:text-cyan-400 transition-colors duration-300">
                        Email : {user.email}
                      </p>
                      <p className="text-white font-semibold text-lg group-hover:text-cyan-400 transition-colors duration-300">
                        Current Role : {user.role}
                      </p>
                      <p className="text-white font-semibold text-lg group-hover:text-cyan-400 transition-colors duration-300">
                        <strong>Skills : </strong>{" "}
                        {user.skills && user.skills.length > 0
                          ? user.skills.join(", ")
                          : "N/A"}
                      </p>
                      {editingUser === user.email ? (
                        <div className="mt-4 space-y-2">
                          <select
                            className="select select-bordered w-full bg-white/5"
                            value={formData.role}
                            onChange={(e) =>
                              setFormData({ ...formData, role: e.target.value })
                            }
                          >
                            <option
                              value="user"
                              className="bg-white/5 text-white"
                            >
                              User
                            </option>
                            <option
                              value="moderator"
                              className="bg-white/5 text-white"
                            >
                              Moderator
                            </option>
                            <option
                              value="admin"
                              className="bg-white/5 text-white"
                            >
                              Admin
                            </option>
                          </select>

                          <input
                            type="text"
                            placeholder="Comma-separated skills"
                            className="input input-bordered w-full bg-white/5"
                            value={formData.skills}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                skills: e.target.value,
                              })
                            }
                          />

                          <div className="flex gap-2">
                            <Button
                              className="btn btn-success btn-sm bg-blue-900 px-4 py-2 rounded-md"
                              onClick={() => handleUpdate()}
                            >
                              Save
                            </Button>
                            <Button
                              className="btn btn-success btn-sm px-4 py-2 rounded-md bg-red-500"
                              onClick={() => setEditingUser(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          onClick={() => handleEditClick(user)}
                          className="px-4 py-2 rounded-md bg-green-700 hover:bg-red-600 transition duration-100"
                        >
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white/5 border border-white/10 rounded-2xl p-16 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-3xl">
              👤
            </div>
            <h3 className="text-xl font-semibold text-white">No Users Found</h3>
            <p className="text-slate-500 mt-2 text-sm">
              No registered users yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;

import React from "react";
// import { ImBin } from "./icons.js";

function DeleteConfirmation({ onCancel, onDelete}) {
    return (
        <>
            <div className="fixed inset-0 flex justify-center items-center bg-black/70 backdrop-blur-sm z-50">
                
                <div className="w-[90%] max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl p-5">
                    
                    {/* TOP SECTION */}
                    <div className="flex gap-3 items-start">
                        
                        {/* ICON */}
                        <div className="p-3 rounded-full bg-red-500/20">
                            <span>🗑️</span>
                        </div>

                        {/* TEXT */}
                        <div>
                            <h1 className="font-semibold text-lg text-white mb-1">
                                Confirm Delete 
                            </h1>

                            <p className="text-sm text-zinc-400 leading-relaxed">
                                Are you sure you want to delete this user ?
                                This action cannot be undone.
                            </p>
                        </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="flex justify-end gap-3 mt-6">
                        
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-zinc-800 text-white hover:bg-zinc-700 transition duration-200"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={onDelete}
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition duration-200"
                        >
                            Delete
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default DeleteConfirmation;
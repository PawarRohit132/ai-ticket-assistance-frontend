import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createTicket, getTicketById } from "../store/Slice/ticketSlice.js";
import Input from "./Inpute.jsx";
import Button from "./Button.jsx";

function CreateTicket() {
  const { handleSubmit, register, setValue } = useForm();
  const dispatch = useDispatch();

  const sendContent = async (data) => {
    if (data) {
      await dispatch(createTicket(data));
    }
    setValue("title", "");
    setValue("description", "");
  };

  return (
    <form
      className="w-full max-w-4xl mx-auto    p-6 sm:p-8  space-y-5 "
      onSubmit={handleSubmit(sendContent)}
    >
      {/* Heading */}
      <div>
        <h2 className="text-3xl font-bold text-white">Create New Ticket</h2>

        <p className="text-slate-400 mt-2 text-sm">
          Describe your issue and let AI prioritize it instantly.
        </p>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">
          Ticket Title
        </label>

        <textarea
          placeholder="Enter ticket title..."
          rows={1}
          {...register("title", { required: true })}
          className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none resize-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">
          Ticket Description
        </label>

        <textarea
          placeholder="Describe your issue in detail..."
          rows={8}
          {...register("description", { required: true })}
          className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none resize-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
        />
      </div>

      {/* Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          className="px-6 py-3 rounded-2xl bg-cyan-400 text-slate-900 font-semibold hover:bg-cyan-300 transition-all duration-300 shadow-lg shadow-cyan-500/20 border-none"
        >
          Send Ticket
        </Button>
      </div>
    </form>
  );
}

export default CreateTicket;

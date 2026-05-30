import React from "react";
import ReactMarkdown from "react-markdown";
import Button from "./Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { ticketSolved } from "../store/Slice/ticketSlice.js";
import { useNavigate } from "react-router-dom";
function SelectedTicket({
  id,
  title,
  description,
  status,
  priority,
  relatedSkills,
  helpfulNotes,
  assignedTo,
  createdAt,
  createdBy,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.userData?.role);

  const handleTicketSolved = async () => {
    await dispatch(ticketSolved(id));
    navigate(`/tickets/ticketSolved/${id}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold">Ticket Details</h2>

          <p className="text-slate-400 mt-2">
            Detailed overview of the selected AI support ticket.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
          {/* Title */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-3xl font-bold text-cyan-400">{title}</h3>

              <p className="mt-4 text-slate-300 leading-relaxed text-base">
                {description}
              </p>
            </div>

            {/* Status */}
            {status && (
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 whitespace-nowrap">
                {status}
              </span>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-8"></div>

          {/* Metadata */}
          <div className="grid sm:grid-cols-2 gap-6">
            {priority && (
              <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5">
                <p className="text-sm text-white">Priority</p>

                <h4 className="mt-2 text-lg font-semibold text-white">
                  {priority}
                </h4>
              </div>
            )}

            {assignedTo && (
              <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5">
                <p className="text-sm text-slate-400">Assigned To</p>

                <h4 className="mt-2 text-lg font-semibold text-white">
                  {assignedTo?.email}
                </h4>
              </div>
            )}
          </div>

          {/* Skills */}
          {relatedSkills?.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Related Skills</h3>

              <div className="flex flex-wrap gap-3">
                {relatedSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Helpful Notes */}
          {helpfulNotes && (
            <div className="mt-10">
              <h3 className="text-2xl font-semibold mb-4">Helpful Notes</h3>

              <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 prose prose-invert max-w-none">
                <ReactMarkdown>{helpfulNotes}</ReactMarkdown>
              </div>
            </div>
          )}

          {/* Footer */}
          {createdBy && (
            <div className="mt-8 border-t border-white/10 pt-5">
              <p className="text-sm text-slate-500">
                createdBy : {createdBy.email}
              </p>
            </div>
          )}
          {createdAt && (
            <div className="mt-8 border-t border-white/10 pt-5">
              <p className="text-sm text-slate-500">
                Created At: {new Date(createdAt).toLocaleString()}
              </p>
            </div>
          )}

          {role !== "user" && (
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 mt-6 flex justify-around">
              <p className="text-sm text-orange-300">
                When you resolve the user's ticket, click the Solved button. The
                ticket status will change to Solved in a few seconds.
              </p>

              <Button
                onClick={handleTicketSolved}
                className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 transition duration-300"
              >
                Solved Ticket
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SelectedTicket;

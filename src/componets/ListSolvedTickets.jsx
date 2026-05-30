import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getTickets } from "../store/Slice/ticketSlice.js";

function ListSolvedTickets() {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.ticket?.tickets);
  const solvedTickets =
    tickets?.filter((ticket) => ticket.status === "SOLVED") || [];

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-8 bg-green-400 rounded-full"></div>
            <h1 className="text-4xl font-bold">
              Solved <span className="text-green-400">Tickets</span>
            </h1>
          </div>
          <p className="text-slate-400 mt-1 ml-5">
            {solvedTickets.length} ticket{solvedTickets.length !== 1 ? "s" : ""}{" "}
            resolved
          </p>
          <div className="mt-4 h-px bg-gradient-to-r from-green-400/50 to-transparent"></div>
        </div>

        {/* Tickets List */}
        {solvedTickets.length > 0 ? (
          <div className="flex flex-col gap-4">
            {solvedTickets.map((ticket) => (
              <div
                key={ticket._id}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-green-400/40 hover:bg-white/8 transition-all duration-300 shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left */}
                  <div className="flex-1">
                    {/* Title + Badge */}
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-xl font-semibold text-white group-hover:text-green-400 transition-colors duration-300">
                        {ticket.title}
                      </h3>
                      <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-green-400/10 border border-green-400/20 text-green-400">
                        ✓ SOLVED
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                      {ticket.description}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-4">
                    {ticket.createdBy && (
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        👤 {ticket.createdBy?.email || ticket.createdBy}
                      </p>
                    )}
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      🕒{" "}
                      {ticket.createdAt
                        ? new Date(ticket.createdAt).toLocaleString()
                        : "No date"}
                    </p>
                  </div>

                  <Link
                    to={`/tickets/${ticket?._id}`}
                    className="flex items-center gap-1 text-sm text-green-400 font-medium hover:gap-2 transition-all duration-300"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white/5 border border-white/10 rounded-2xl p-16 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-xl font-semibold text-white">
              No Solved Tickets
            </h3>
            <p className="text-slate-500 mt-2 text-sm">
              No tickets have been resolved yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListSolvedTickets;

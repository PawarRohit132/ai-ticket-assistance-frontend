import React from "react";
import { Link } from "react-router-dom";

function TicketList({ tickets }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white">All Tickets</h2>

        <p className="text-slate-400 mt-2">
          Track and manage all your AI generated support tickets.
          <Link
          to={'/tickets/listSolvedTickets'}
          className="text-green-400 underline">
            Your Solved Tickets Are Here....
          </Link>
        </p>
      </div>

      {/* Tickets */}
      <div className="grid gap-5">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <Link
              key={ticket._id}
              className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-cyan-400/40 hover:bg-white/10 transition-all duration-300 shadow-xl"
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-white group-hover:text-cyan-400 transition-all duration-300">
                    {ticket.title}
                  </h3>

                  <p className="mt-3 text-slate-400 leading-relaxed line-clamp-2">
                    {ticket.description}
                  </p>
                </div>

                {/* Status */}
              </div>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                {ticket.createdBy && (
                  <p className="text-sm text-slate-500">
                    Created By 👤: {ticket.createdBy?.email || ticket.createdBy}
                  </p>
                )}
                <p className="text-sm text-slate-500">
                  Created At 🕒 :{" "}
                  {ticket.createdAt
                    ? new Date(ticket.createdAt).toLocaleString()
                    : "No date"}
                </p>

                <Link
                  to={`/tickets/${ticket?._id}`}
                  className="text-sm text-cyan-400 group-hover:translate-x-1 transition-all duration-300"
                >
                  View Details →
                </Link>
              </div>
            </Link>
          ))
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center">
            <h3 className="text-2xl font-semibold text-white">
              No Tickets Found
            </h3>

            <p className="text-slate-400 mt-2">
              Create your first AI support ticket to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketList;

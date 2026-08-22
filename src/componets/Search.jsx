import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchTicket } from "../store/Slice/ticketSlice.js";
import { Link } from "react-router-dom";
import { FiSearch, FiX, FiClock } from "react-icons/fi";

function Search() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const dispatch = useDispatch();
  const searchRef = useRef(null);

  const { searchTickets = [], loading } = useSelector(
    (state) => state.ticket
  );

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Search API
  useEffect(() => {
    if (debouncedSearch.trim()) {
      dispatch(searchTicket(debouncedSearch));
    }
  }, [debouncedSearch, dispatch]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const clearSearch = () => {
    setSearch("");
    setDebouncedSearch("");
  };

  return (
    <div className="relative p-2">

      {/* Background Blur Overlay */}
      {isFocused && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md transition-all duration-300" />
      )}

      {/* Search Area */}
      <div
        ref={searchRef}
        className={`relative z-50 mx-auto transition-all duration-300 ${
          isFocused
            ? "max-w-3xl pt-8"
            : "max-w-2xl"
        }`}
      >

        {/* Search Input */}
        <div
          className={`relative flex items-center rounded-2xl border transition-all duration-300 ${
            isFocused
              ? "border-cyan-400/60 bg-slate-900 shadow-[0_0_40px_rgba(34,211,238,0.15)]"
              : "border-white/10 bg-white/5"
          }`}
        >
          <FiSearch
            className={`ml-5 text-xl transition-colors ${
              isFocused
                ? "text-cyan-400"
                : "text-slate-400"
            }`}
          />

          <input
            type="text"
            placeholder="Search your tickets..."
            value={search}
            onFocus={() => setIsFocused(true)}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent px-4 py-4 text-white outline-none placeholder:text-slate-500"
          />

          {search && (
            <button
              onClick={clearSearch}
              className="mr-4 rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <FiX />
            </button>
          )}

          {loading && (
            <div className="mr-5 h-5 w-5 animate-spin rounded-full border-2 border-slate-600 border-t-cyan-400" />
          )}
        </div>

        {/* Search Results */}
        {isFocused && search.trim() && (
          <div className="mt-3 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/95 shadow-2xl backdrop-blur-xl">

            {/* Result Header */}
            <div className="border-b border-white/10 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">
                    Search results for
                  </p>

                  <p className="mt-1 font-medium text-white">
                    "{debouncedSearch}"
                  </p>
                </div>

                {!loading && searchTickets.length > 0 && (
                  <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-400">
                    {searchTickets.length} results
                  </span>
                )}
              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex flex-col items-center justify-center px-6 py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-600 border-t-cyan-400" />

                <p className="mt-4 text-sm text-slate-400">
                  Searching tickets...
                </p>
              </div>
            )}

            {/* Results */}
            {!loading && searchTickets.length > 0 && (
              <div className="max-h-[65vh] overflow-y-auto p-3">

                {searchTickets.map((ticket) => (
                  <Link
                    key={ticket._id}
                    to={`/tickets/${ticket._id}`}
                    onClick={() => setIsFocused(false)}
                    className="group mb-2 block rounded-2xl border border-transparent p-4 transition-all duration-200 hover:border-cyan-400/20 hover:bg-white/5"
                  >
                    <div className="flex items-start justify-between gap-4">

                      <div className="min-w-0">
                        {/* Title */}
                        <h3 className="truncate text-base font-semibold text-white transition-colors group-hover:text-cyan-400">
                          {ticket.title}
                        </h3>

                        {/* Description */}
                        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-400">
                          {ticket.description}
                        </p>

                        {/* Meta */}
                        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">

                          {ticket.createdBy && (
                            <span>
                              👤{" "}
                              {ticket.createdBy?.email ||
                                ticket.createdBy}
                            </span>
                          )}

                          <span className="flex items-center gap-1">
                            <FiClock />
                            {ticket.createdAt
                              ? new Date(
                                  ticket.createdAt
                                ).toLocaleString()
                              : "No date"}
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <span className="shrink-0 text-slate-600 transition-all duration-200 group-hover:translate-x-1 group-hover:text-cyan-400">
                        →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading &&
              debouncedSearch &&
              searchTickets.length === 0 && (
                <div className="flex flex-col items-center justify-center px-6 py-14 text-center">

                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
                    <FiSearch className="text-2xl text-slate-500" />
                  </div>

                  <h3 className="text-base font-medium text-white">
                    No tickets found
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Try searching with another keyword
                  </p>

                </div>
              )}

          </div>
        )}

      </div>
    </div>
  );
}

export default Search;
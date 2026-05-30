import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-cyan-400 flex items-center justify-center text-black font-black text-sm">
                T
              </div>
              <span className="text-xl font-bold">
                Ticket<span className="text-cyan-400">AI</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              Next-generation AI-powered ticket management platform built to
              streamline support operations and deliver faster issue resolution.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Home", to: "/" },
                { label: "Login", to: "/login" },
                { label: "Sign Up", to: "/signin" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-slate-500 text-sm hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide">
              Features
            </h4>
            <ul className="space-y-2">
              {[
                "AI Ticket Analysis",
                "Smart Assignment",
                "Priority Detection",
                "Real-time Updates",
                "Role Management",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span className="text-slate-500 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-cyan-400/30 via-white/10 to-transparent mb-6"></div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} TicketAI. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-slate-500 text-sm">
              AI Systems Operational
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
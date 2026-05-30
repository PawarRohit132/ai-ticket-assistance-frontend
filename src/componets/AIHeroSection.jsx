import React from "react";
import { Link } from "react-router-dom";

function AIHeroSection() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Badge */}
      <div className="mb-6 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 text-sm font-medium tracking-widest uppercase">
        AI Powered Support
      </div>

      {/* Heading */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-center leading-tight mb-6">
        Smarter Tickets,{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Faster Support
        </span>
      </h1>

      {/* Description */}
      <p className="text-slate-400 text-lg md:text-xl text-center max-w-2xl leading-relaxed mb-10">
        <span className="text-cyan-400 font-semibold">Ticket AI</span> is a
        next-generation platform that automates ticket management, intelligently
        prioritizes issues, and empowers your team to deliver exceptional
        support with maximum efficiency.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-16">
        <Link
          to="/signin"
          className="px-8 py-3 rounded-xl bg-cyan-400 text-black font-bold hover:bg-cyan-300 shadow-lg shadow-cyan-400/25 transition-all duration-300"
        >
          Get Started Free
        </Link>
        <Link
          to="/login"
          className="px-8 py-3 rounded-xl border border-white/20 text-white font-medium hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
        >
          Login
        </Link>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl w-full">
        {[
          {
            icon: "🤖",
            title: "AI Processing",
            desc: "Tickets auto-analyzed and prioritized by AI instantly",
          },
          {
            icon: "⚡",
            title: "Fast Resolution",
            desc: "Smart assignment to the right moderator every time",
          },
          {
            icon: "📊",
            title: "Real-time Updates",
            desc: "Track ticket status and progress in real time",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-400/40 hover:bg-white/8 transition-all duration-300"
          >
            <div className="text-3xl mb-3">{feature.icon}</div>
            <h3 className="text-white font-semibold text-lg mb-1">
              {feature.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom Stats */}
      <div className="flex flex-wrap gap-8 justify-center mt-16 border-t border-white/10 pt-10 w-full max-w-4xl">
        {[
          { value: "10x", label: "Faster Resolution" },
          { value: "99%", label: "Accuracy Rate" },
          { value: "24/7", label: "AI Availability" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-4xl font-black text-cyan-400">{stat.value}</p>
            <p className="text-slate-500 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default AIHeroSection;
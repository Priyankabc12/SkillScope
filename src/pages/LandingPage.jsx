import React from "react";
import {
  BarChart3,
  Briefcase,
  Globe2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function SkillJobAnalyzerLanding() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden font-sans relative">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, #00D9FF 1px, transparent 1px), linear-gradient(to bottom, #00D9FF 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Glow Effects */}
      <div className="absolute top-[-200px] left-[-120px] w-[500px] h-[500px] bg-cyan-500/10 blur-[180px] rounded-full" />
      <div className="absolute bottom-[-200px] right-[-120px] w-[500px] h-[500px] bg-cyan-400/10 blur-[180px] rounded-full" />

      {/* Navbar */}
      {/* Navbar */}
<header className="relative z-20 border-b border-cyan-500/10">
  <nav className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex items-center justify-between">

    <Link
      to="/"
      className="text-xl tracking-[0.25em] font-semibold text-white"
    >
      SKILL<span className="text-[#00D9FF]">SCOPE</span>
    </Link>

    {localStorage.getItem("isLoggedIn") === "true" ? (

      <div className="hidden md:flex items-center gap-10 text-sm text-gray-300">

        <Link
          to="/"
          className="relative group transition"
        >
          Home
          <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#00D9FF] transition-all duration-300 group-hover:w-full" />
        </Link>

        <Link
          to="/analyzer"
          className="relative group transition"
        >
          Analyzer
          <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#00D9FF] transition-all duration-300 group-hover:w-full" />
        </Link>

        <Link
          to="/profile"
          className="relative group transition"
        >
          Profile
          <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#00D9FF] transition-all duration-300 group-hover:w-full" />
        </Link>

        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("user");
            window.location.href = "/";
          }}
          className="relative group transition"
        >
          Logout
          <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-red-400 transition-all duration-300 group-hover:w-full" />
        </button>

      </div>

    ) : (

      <div className="hidden md:flex items-center gap-5">

        <Link
          to="/signin"
          className="px-5 py-2 rounded-full border border-white/10 text-sm text-gray-300 hover:border-[#00D9FF]/40 hover:text-white transition"
        >
          Sign In
        </Link>

        <Link
          to="/signup"
          className="px-5 py-2 rounded-full bg-[#00D9FF] text-black text-sm font-medium hover:bg-cyan-300 transition"
        >
          Sign Up
        </Link>

      </div>

    )}

  </nav>
</header>
      {/* Hero */}
      <section className="relative z-10 min-h-[92vh] flex items-center justify-center px-6">
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight">
              ANALYZE SKILLS.
              <br />
              EXPLORE
              <span className="text-[#00D9FF]"> OPPORTUNITIES.</span>
            </h1>

            <p className="mt-8 text-gray-400 text-lg leading-relaxed max-w-xl">
              Discover real-time job demand, salary insights, and required skills across countries using live market data from global job listings.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <button className="px-7 py-3 border border-white/10 rounded-full text-sm text-gray-300 hover:border-[#00D9FF]/40 hover:text-white transition flex items-center gap-2">
                Explore Jobs
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="flex items-center justify-center relative">
            <div className="relative w-[340px] h-[340px]">
              {/* Outer Glow */}
              <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-3xl" />

              {/* Hexagon */}
              <div
                className="absolute inset-0 border border-[#00D9FF]/40"
                style={{
                  clipPath:
                    "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0 50%)",
                  boxShadow: "0 0 50px rgba(0,217,255,0.15)",
                }}
              />

              {/* Inner Hexagon */}
              <div
                className="absolute inset-[60px] border border-[#00D9FF]/20"
                style={{
                  clipPath:
                    "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0 50%)",
                }}
              />

              {/* Center Dot */}
              <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-[#00D9FF] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_#00D9FF]" />

              {/* Orbit Lines */}
              <div className="absolute inset-8 border border-dashed border-[#00D9FF]/10 rounded-full animate-spin [animation-duration:20s]" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 md:px-10 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-[#00D9FF] uppercase tracking-[0.25em] text-xs mb-4">
              Features
            </p>

            <h2 className="text-4xl md:text-5xl font-semibold max-w-2xl leading-tight">
              Minimal Intelligence.
              <br />
              Powerful Insights.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <BarChart3 size={22} />,
                title: "Skill Demand Analysis",
                desc: "Analyze live job listings to discover the most in-demand skills across countries and industries",
              },
              {
                icon: <Globe2 size={22} />,
                title: "Salary Insights",
                desc: "Explore real-time salary ranges and hiring trends from global job market data.",
              },
              {
                icon: <Sparkles size={22} />,
                title: "Job & Skill Matching",
                desc: "Discover relevant job opportunities and additional skills employers are actively looking for.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group border border-white/5 hover:border-[#00D9FF]/20 bg-white/[0.02] rounded-3xl p-8 transition duration-300"
              >
                <div className="w-12 h-12 rounded-2xl border border-[#00D9FF]/20 flex items-center justify-center text-[#00D9FF] mb-6 group-hover:shadow-[0_0_25px_rgba(0,217,255,0.15)] transition">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-medium mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
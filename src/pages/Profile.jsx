import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const [visitedLinks, setVisitedLinks] = useState([]);

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
 
  const userId = localStorage.getItem("UserId");
  useEffect(() => {
    if (!userId) {
      window.location.href = "/";
      return;
    }
  }, [localStorage.getItem("UserId")]);

   
  useEffect(()=>{

    const fetchUserData = async () => {
      try{
       
        setLoading(true)
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/profile?userId=${userId}`);
        setUser(res.data);

   


      }catch(err){
        console.error("Failed to fetch user data:", err);
      }finally{
        setLoading(false)
      }
    }

    const fetchUserJobs = async()=>{
      try{
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/jobs?userId=${userId}`);
        const jobs = res.data;
        const links = jobs.map(job => job.apply_url);
        setVisitedLinks(links);
      }catch(err){
        console.error("Failed to fetch user jobs:", err);
      }
    }
    fetchUserData();
    fetchUserJobs();
  },[localStorage.getItem("UserId")])
 
  if(loading){
    return (
    
      <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden relative font-sans">
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

        {/* Glow */}
        <div className="absolute top-[-200px] left-[-120px] w-[500px] h-[500px] bg-cyan-500/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-[-200px] right-[-120px] w-[500px] h-[500px] bg-cyan-400/10 blur-[180px] rounded-full" />

        {/* Navbar */}
        <header className="relative z-20 border-b border-cyan-500/10">
          <nav className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex items-center justify-between">

            <Link
              to="/"
              className="text-xl tracking-[0.25em] font-semibold text-white"
            >
              SKILL<span className="text-[#00D9FF]">SCOPE</span>
            </Link>

            <div className="hidden md:flex items-center gap-10 text-sm text-gray-300">

              <Link
                to="/analyzer"
                className="relative group transition"
              >
                Analyzer

                <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#00D9FF] transition-all duration-300 group-hover:w-full" />
              </Link>

              <Link
                to="/profile"
                className="relative group text-[#00D9FF]"
              >
                Profile
              </Link>

            </div>
          </nav>
        </header>
        
        <div className="min-h-screen flex items-center justify-center">
          <Loader className="animate-spin" size={48} color="#00D9FF" />
        </div>
        
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden relative font-sans">

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

      {/* Glow */}
      <div className="absolute top-[-200px] left-[-120px] w-[500px] h-[500px] bg-cyan-500/10 blur-[180px] rounded-full" />
      <div className="absolute bottom-[-200px] right-[-120px] w-[500px] h-[500px] bg-cyan-400/10 blur-[180px] rounded-full" />

      {/* Navbar */}
      <header className="relative z-20 border-b border-cyan-500/10">
        <nav className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex items-center justify-between">

          <Link
            to="/"
            className="text-xl tracking-[0.25em] font-semibold text-white"
          >
            SKILL<span className="text-[#00D9FF]">SCOPE</span>
          </Link>

          <div className="hidden md:flex items-center gap-10 text-sm text-gray-300">

            <Link
              to="/analyzer"
              className="relative group transition"
            >
              Analyzer

              <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#00D9FF] transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              to="/profile"
              className="relative group text-[#00D9FF]"
            >
              Profile
            </Link>

          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="relative z-10 px-6 py-16">

        <div className="max-w-5xl mx-auto">

          {/* Profile Card */}
          <div className="border border-white/5 bg-white/[0.02] rounded-[32px] p-8 md:p-10 mb-10 backdrop-blur-sm">

            <div className="flex flex-col md:flex-row md:items-center gap-6">

              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-4xl font-semibold text-[#00D9FF] shadow-[0_0_30px_rgba(0,217,255,0.15)]">
                {user.name?.charAt(0) || "U"}
              </div>

              {/* User Info */}
              <div>

                <p className="uppercase tracking-[0.25em] text-[#00D9FF] text-xs mb-3">
                  User Profile
                </p>

                <h1 className="text-4xl font-semibold tracking-tight">
                  {user.name || "Guest User"}
                </h1>

                <p className="text-zinc-400 mt-2 text-lg">
                  {user.email || "No email found"}
                </p>

              </div>

            </div>

          </div>

          {/* Visited Pages */}
          <div className="border border-white/5 bg-white/[0.02] rounded-[32px] p-8 md:p-10 backdrop-blur-sm">

            <div className="mb-8">

              <p className="uppercase tracking-[0.25em] text-[#00D9FF] text-xs mb-3">
                Activity
              </p>

              <h2 className="text-4xl font-semibold tracking-tight">
                Visited Pages
              </h2>

            </div>

            {visitedLinks.length ? (

              <div className="grid md:grid-cols-2 gap-5">

                {visitedLinks.map((link, index) => (

                  <div
                    key={index}
                    className="group border border-white/5 hover:border-cyan-400/20 bg-black/30 rounded-2xl p-5 transition duration-300"
                  >

                    <p className="text-zinc-300 mb-3">
                      {link}
                    </p>

                    <Link
                      to={link}
                      className="inline-flex items-center gap-2 text-sm text-[#00D9FF] hover:text-white transition"
                    >
                      Visit Page →
                    </Link>

                  </div>

                ))}

              </div>

            ) : (

              <p className="text-zinc-500">
                No visited pages yet.
              </p>

            )}

          </div>

        </div>

      </div>
    </div>
  );
}
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const userId = localStorage.getItem("UserId");
    useEffect(()=>{
      if(userId){
        window.location.href = "/profile";
      }
    },[localStorage.getItem("UserId")])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      if (!formData.email || !formData.password) {

        setError("Please fill in all fields.");
        return;
      }
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/login`,{
        password: formData.password,
        email: formData.email
      })
      localStorage.setItem("UserId", res.data[0].id);
      window.location.href = "/profile";
    }catch(err)
    {
      setError(err.response?.data?.message || err.message || "Sign in failed");
    }finally{
      setLoading(false)
    }
  

    // TODO: plug in your auth logic here (Firebase, Supabase, JWT, etc.)

  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-zinc-400">Sign in to your account</p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-zinc-400" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 outline-none focus:border-zinc-500 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm text-zinc-400" htmlFor="password">Password</label>
                <a href="#" className="text-xs text-zinc-400 hover:text-white transition-colors">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 outline-none focus:border-zinc-500 transition-colors"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  Signing in…
                </span>
              ) : (
                "Sign in"
              )}
            </button>

          </form>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-white hover:underline">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    // TODO: Add authentication logic here

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-4">
      
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-white">
            Create account
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Start your job search today
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm text-zinc-400"
                htmlFor="name"
              >
                Full name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 outline-none focus:border-zinc-500 transition-colors"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm text-zinc-400"
                htmlFor="email"
              >
                Email
              </label>

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

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm text-zinc-400"
                htmlFor="password"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 6 characters"
                className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 outline-none focus:border-zinc-500 transition-colors"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm text-zinc-400"
                htmlFor="confirmPassword"
              >
                Confirm password
              </label>

              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 outline-none focus:border-zinc-500 transition-colors"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-400 text-center">
                {error}
              </p>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-1 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  Creating account…
                </span>
              ) : (
                "Create account"
              )}
            </button>

          </form>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{" "}

          <Link
            to="/signin"
            className="text-white hover:underline"
          >
            Sign in
          </Link>

        </p>

      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import { fetchJobs } from "../utils/fetchJobs";
import { cleanJobs } from "../utils/processJobs";

import {
  getDemand,
  getAverageSalary,
  getRoleDistribution,
} from "../utils/analytics";

import {
  extractSkills,
  SKILLS,
} from "../utils/extractSkills";

import Cards from "../components/cards";

const COUNTRY_DETAILS = {
  gb: { label: "United Kingdom", currency: "GBP", locale: "en-GB" },
  us: { label: "United States", currency: "USD", locale: "en-US" },
  at: { label: "Austria", currency: "EUR", locale: "de-AT" },
  au: { label: "Australia", currency: "AUD", locale: "en-AU" },
  be: { label: "Belgium", currency: "EUR", locale: "nl-BE" },
  br: { label: "Brazil", currency: "BRL", locale: "pt-BR" },
  ca: { label: "Canada", currency: "CAD", locale: "en-CA" },
  ch: { label: "Switzerland", currency: "CHF", locale: "de-CH" },
  de: { label: "Germany", currency: "EUR", locale: "de-DE" },
  es: { label: "Spain", currency: "EUR", locale: "es-ES" },
  fr: { label: "France", currency: "EUR", locale: "fr-FR" },
  in: { label: "India", currency: "INR", locale: "en-IN" },
  it: { label: "Italy", currency: "EUR", locale: "it-IT" },
  mx: { label: "Mexico", currency: "MXN", locale: "es-MX" },
  nl: { label: "Netherlands", currency: "EUR", locale: "nl-NL" },
  nz: { label: "New Zealand", currency: "NZD", locale: "en-NZ" },
  pl: { label: "Poland", currency: "PLN", locale: "pl-PL" },
  sg: { label: "Singapore", currency: "SGD", locale: "en-SG" },
  za: { label: "South Africa", currency: "ZAR", locale: "en-ZA" },
};

export default function Analyzer() {

  useEffect(()=>{
    if(!localStorage.getItem("UserId")){
      window.location.href = "/";
    }

  },[localStorage.getItem("UserId")])


  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);



  const [formData, setFormData] = useState({
    skill: "",
    city: "",
    country: "gb",
  });


  useEffect(() => {
    const savedLinks =
      JSON.parse(localStorage.getItem("visitedLinks")) || [];

    if (!savedLinks.includes(location.pathname)) {
      const updatedLinks = [...savedLinks, location.pathname];

      localStorage.setItem(
        "visitedLinks",
        JSON.stringify(updatedLinks)
      );
    }
  }, [location]);


  const getJobSkills = (description = "") => {
    const text = description.toLowerCase();

    return SKILLS.filter((skill) =>
      text.includes(skill)
    );
  };


  const formatSalaryRange = (
    salaryMin,
    salaryMax,
    locale,
    currency
  ) => {
    if (!salaryMin && !salaryMax)
      return "Salary not disclosed";

    const format = (value) =>
      Number(value).toLocaleString(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      });

    if (salaryMin && salaryMax)
      return `${format(salaryMin)} - ${format(salaryMax)}`;

    if (salaryMin)
      return `From ${format(salaryMin)}`;

    return `Up to ${format(salaryMax)}`;
  };


  const loadData = async () => {
    try {
      setLoading(true);

      const res = await fetchJobs(
        formData.skill,
        formData.city,
        formData.country
      );

      const jobs = cleanJobs(res.results);

      const demand = getDemand(res);

      const avgSalary = getAverageSalary(jobs);

      const skills = extractSkills(jobs);

      const roles = getRoleDistribution(jobs);

      setData({
        demand,
        avgSalary,
        skills,
        roles,
        jobs,
      });
    } catch (error) {
      console.error("Error loading data:", error);

      setData({
        demand: 0,
        avgSalary: 0,
        skills: {},
        roles: {},
        jobs: [],
      });
    } finally {
      setLoading(false);
    }
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const updateJobs = async(jobs)=>{
    try{
      const userId = localStorage.getItem("UserId");
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/jobs`,{ userId:userId, job:jobs });

    }catch(err){
      console.error("Failed to update user jobs:", err);
    }
  }
  
  useEffect(() => {
    let id = setTimeout(() => {
      loadData();
    }, 500);

    return () => clearTimeout(id);
  }, [formData]);

  const hasJobs = Boolean(data?.jobs?.length);

  const selectedCountryDetails =
    COUNTRY_DETAILS[formData.country] ||
    COUNTRY_DETAILS.gb;

  const selectedCountryLabel =
    selectedCountryDetails.label;

  const selectedCurrency =
    selectedCountryDetails.currency;

  const selectedLocale =
    selectedCountryDetails.locale;

  const selectedSkill =
    formData.skill || "selected skill";

  const skillEntries = data
    ? Object.entries(data.skills).sort(
        (a, b) => b[1] - a[1]
      )
    : [];

  const recommendedSkills = skillEntries
    .filter(([skill]) => skill !== selectedSkill)
    .slice(0, 5)
    .map(([skill]) => skill);

  const topCompanyJobs =
    data?.jobs?.slice(0, 10) || [];




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
            SKILL
            <span className="text-[#00D9FF]">
              SCOPE
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10 text-sm text-gray-300">

            <Link
              to="/analyzer"
              className="relative group text-[#00D9FF]"
            >
              Analyzer
            </Link>

            <Link
              to="/profile"
              className="relative group transition"
            >
              Profile

              <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#00D9FF] transition-all duration-300 group-hover:w-full" />
            </Link>

            <button
              className="relative group transition hover:text-cyan-400 cursor-pointer"
              onClick={()=>{
                localStorage.removeItem("UserId")
                window.location.href = "/";
              }}

            >
              Sign Out

              <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#00D9FF] transition-all duration-300 group-hover:w-full" />
            </button>

          </div>

        </nav>
      </header>

    
      <section className="relative z-10 px-6 pb-14">

        <div className="max-w-5xl mx-auto border border-white/5 bg-white/[0.02] rounded-[32px] p-6 md:p-8 backdrop-blur-sm">

          <h2 className="text-2xl font-semibold mb-6">
            Search Jobs
          </h2>

          <form className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-400 outline-none focus:border-cyan-400"
              placeholder="Enter a skill"
              name="skill"
              onChange={handleChange}
            />

            <input
              type="text"
              name="city"
              className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-400 outline-none focus:border-cyan-400"
              placeholder="Enter a city"
              onChange={handleChange}
            />

            <select
              className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              {Object.entries(COUNTRY_DETAILS).map(
                ([code, country]) => (
                  <option
                    key={code}
                    value={code}
                  >
                    {country.label}
                  </option>
                )
              )}
            </select>

          </form>

        </div>

      </section>

      {/* Results */}
      <div className="relative z-10">

        {hasJobs ? (
          <>
            <Cards
              totalJobs={data.demand}
              averageSalary={data.avgSalary}
              recommendedSkills={recommendedSkills}
              country={selectedCountryLabel}
              skill={selectedSkill}
              currency={selectedCurrency}
              locale={selectedLocale}
            />

            {/* Companies */}
            <section className="w-full max-w-6xl mx-auto px-4 pb-16">

              <div className="mb-10">

                <p className="uppercase tracking-[0.25em] text-[#00D9FF] text-xs mb-4">
                  Opportunities
                </p>

                <h2 className="text-4xl font-semibold">
                  Top Companies Hiring
                </h2>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {topCompanyJobs.map((job, index) => {
                  const jobSkills =
                    getJobSkills(job.description);

                  return (
                    <article
                      key={`${job.company}-${job.title}-${index}`}
                      className="group border border-white/5 hover:border-cyan-400/20 bg-white/[0.02] rounded-3xl p-7 transition duration-300"
                    >
                      <h3 className="text-2xl font-semibold">
                        {job.company}
                      </h3>

                      <p className="mt-2 text-zinc-300">
                        {job.title}
                      </p>

                      <p className="mt-5 text-sm text-zinc-400 leading-relaxed line-clamp-4">
                        {job.description ||
                          "No description available."}
                      </p>

                      <p className="mt-5 text-sm text-zinc-200">
                        <span className="text-zinc-500">
                          Salary:
                        </span>{" "}
                        {formatSalaryRange(
                          job.salary_min,
                          job.salary_max,
                          selectedLocale,
                          selectedCurrency
                        )}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">

                        {jobSkills.length ? (
                          jobSkills.map((skill) => (
                            <span
                              key={`${job.company}-${skill}`}
                              className="rounded-full border border-cyan-400/10 bg-cyan-400/5 px-3 py-1 text-xs text-cyan-300"
                            >
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-zinc-500">
                            No matched skills found
                          </span>
                        )}

                      </div>

                      {job.apply_url ? (
                        <button
                          type="button"
                          onClick={() => {
                            console.log("Job Applied:", job);
                            updateJobs(job);
                            window.open(job.apply_url, "_blank");
                          }}
                          className="mt-6 inline-flex rounded-full border border-white/10 px-5 py-2 text-sm text-white hover:border-cyan-400/30 hover:text-cyan-300 transition"
                        >
                          Apply Now
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="mt-6 inline-flex rounded-full bg-zinc-800 px-5 py-2 text-sm text-zinc-400 cursor-not-allowed"
                        >
                          Apply unavailable
                        </button>
                      )}
                    </article>
                  );
                })}

              </div>

            </section>
          </>
        ) : (
          <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-24 text-center text-zinc-300">

            {loading ? (
              <div className="flex items-center justify-center">

                <div className="w-12 h-12 rounded-full border-4 border-white border-t-transparent animate-spin"></div>

              </div>
            ) : (
              <p className="text-zinc-500 text-lg">
                Search for skills and jobs to see insights.
              </p>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
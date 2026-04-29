import { useEffect, useState } from "react";
import { fetchJobs } from "./utils/fetchJobs";
import { cleanJobs } from "./utils/processJobs";
import { getDemand, getAverageSalary, getRoleDistribution } from "./utils/analytics";
import { extractSkills, SKILLS } from "./utils/extractSkills";

import Cards from "./components/cards";

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



export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
  skill: "",
  city: "",
  country: "gb",
});



const getJobSkills = (description = "") => {
  const text = description.toLowerCase();
  return  SKILLS.filter((skill) => text.includes(skill));
};

const formatSalaryRange = (salaryMin, salaryMax, locale, currency) => {
  if (!salaryMin && !salaryMax) return "Salary not disclosed";

  const format = (value) =>
    Number(value).toLocaleString(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    });

  if (salaryMin && salaryMax) return `${format(salaryMin)} - ${format(salaryMax)}`;
  if (salaryMin) return `From ${format(salaryMin)}`;
  return `Up to ${format(salaryMax)}`;
};


const loadData = async () => {
  try {
    setLoading(true);
    const res = await fetchJobs(formData.skill, formData.city, formData.country);
    console.log(res);

    const jobs = cleanJobs(res.results);
    const demand = getDemand(res);
    const avgSalary = getAverageSalary(jobs);
    const skills = extractSkills(jobs);
    const roles = getRoleDistribution(jobs);

    setData({ demand, avgSalary, skills, roles, jobs });
  } catch (error) {
    console.error("Error loading data:", error);
    setData({ demand: 0, avgSalary: 0, skills: {}, roles: {}, jobs: [] });
  } finally {
    setLoading(false);
  }
};



const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

//debouncing
useEffect(()=>{
  let id = setTimeout(()=>{loadData()},500)
  return ()=>clearTimeout(id);
},[formData])

  const hasJobs = Boolean(data?.jobs?.length);
  const selectedCountryDetails =  COUNTRY_DETAILS[formData.country] || COUNTRY_DETAILS.gb;
  const selectedCountryLabel = selectedCountryDetails.label;
  const selectedCurrency = selectedCountryDetails.currency;
  const selectedLocale = selectedCountryDetails.locale;
  const selectedSkill = formData.skill || "selected skill";
  
  const skillEntries = data
    ? Object.entries(data.skills).sort((a, b) => b[1] - a[1])
    : [];

  const recommendedSkills = skillEntries
    .filter(([skill]) => skill !== selectedSkill)
    .slice(0, 5)
    .map(([skill]) => skill);
    
  const topCompanyJobs = data?.jobs?.slice(0, 10) || [];

  return (


    <div className="bg-black w-screen min-h-screen">

      {/* Search Bar */}

      <div className="flex flex-col items-center justify-center gap-4 py-8 px-4 text-white">
            <h1 className="text-3xl font-semibold">Search for a job</h1>


                <form action="" className="flex flex-col md:flex-row gap-3 w-full max-w-3xl"> 
                    <input
                        type="text"
                        className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-400 outline-none focus:border-zinc-500"
                        placeholder="Enter a skill"
                        name="skill"
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="city"
                        className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-400 outline-none focus:border-zinc-500"
                        placeholder="Enter a city"
                        onChange={handleChange}
                    />

                    <select className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-zinc-500" name="country" value={formData.country} onChange={handleChange}>
                        <option value="gb">United Kingdom</option>
                        <option value="us">United States</option>
                        <option value="at">Austria</option>
                        <option value="au">Australia</option>
                        <option value="be">Belgium</option>
                        <option value="br">Brazil</option>
                        <option value="ca">Canada</option>
                        <option value="ch">Switzerland</option>
                        <option value="de">Germany</option>
                        <option value="es">Spain</option>
                        <option value="fr">France</option>
                        <option value="in">India</option>
                        <option value="it">Italy</option>
                        <option value="mx">Mexico</option>
                        <option value="nl">Netherlands</option>
                        <option value="nz">New Zealand</option>
                        <option value="pl">Poland</option>
                        <option value="sg">Singapore</option>
                        <option value="za">South Africa</option>
                    </select>

                    
                </form>

      </div>

      {hasJobs ? (
        <>
          {/* Cards */}
          <Cards
            totalJobs={data.demand}
            averageSalary={data.avgSalary}
            recommendedSkills={recommendedSkills}
            country={selectedCountryLabel}
            skill={selectedSkill}
            currency={selectedCurrency}
            locale={selectedLocale}
          />

          {/* Top Companies */}
          <section className="w-full max-w-6xl mx-auto px-4 pb-10">
            <h2 className="text-white text-2xl font-semibold mb-4">Top 10 Companies Hiring</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topCompanyJobs.map((job, index) => {
                const jobSkills = getJobSkills(job.description);
                return (
                  <article
                    key={`${job.company}-${job.title}-${index}`}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-white"
                  >
                    <h3 className="text-lg font-semibold">{job.company}</h3>
                    <p className="mt-1 text-sm text-zinc-300">{job.title}</p>
                    <p className="mt-3 text-sm text-zinc-300 line-clamp-4">
                      {job.description || "No description available."}
                    </p>
                    <p className="mt-3 text-sm text-zinc-200">
                      <span className="text-zinc-400">Pay:</span>{" "}
                      {formatSalaryRange(
                        job.salary_min,
                        job.salary_max,
                        selectedLocale,
                        selectedCurrency
                      )}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {jobSkills.length ? (
                        jobSkills.map((skill) => (
                          <span
                            key={`${job.company}-${skill}`}
                            className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-100"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-zinc-400">No matched skills found</span>
                      )}
                    </div>

                    {job.apply_url ? (
                      <a
                        href={job.apply_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200 transition-colors"
                      >
                        Apply
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="mt-4 inline-flex rounded-lg bg-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 cursor-not-allowed"
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
        <div className="w-full max-w-6xl mx-auto px-4 py-16 text-center text-zinc-300">
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
            </div>
          ) : (
            "No data yet"
          )}
        </div>
      )}
    </div>
  );
}
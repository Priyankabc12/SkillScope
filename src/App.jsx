import { useEffect, useState } from "react";
import { fetchJobs } from "./utils/fetchJobs";
import { cleanJobs } from "./utils/processJobs";
import { getDemand, getAverageSalary, getRoleDistribution } from "./utils/analytics";
import { extractSkills, SKILLS } from "./utils/extractSkills";
import SearchBar from "./components/searchBar";
import Loader from "./components/loader";
import Cards from "./components/cards";

const getJobSkills = (description = "") => {
  const text = description.toLowerCase();
  return SKILLS.filter((skill) => text.includes(skill));
};

const formatSalaryRange = (salaryMin, salaryMax) => {
  if (!salaryMin && !salaryMax) return "Salary not disclosed";

  const format = (value) =>
    Number(value).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  if (salaryMin && salaryMax) return `${format(salaryMin)} - ${format(salaryMax)}`;
  if (salaryMin) return `From ${format(salaryMin)}`;
  return `Up to ${format(salaryMax)}`;
};

export default function App() {
  const selectedSkill = "react";
  const selectedCountryCode = "us";
  const selectedCountryLabel = "United States";
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetchJobs(selectedSkill, "", selectedCountryCode);
      console.log(res);

      const jobs = cleanJobs(res.results);

      const demand = getDemand(res);
      const avgSalary = getAverageSalary(jobs);
      const skills = extractSkills(jobs);
      const roles = getRoleDistribution(jobs);

      setData({ demand, avgSalary, skills, roles, jobs });
    };

    loadData();
  }, []);

  if (!data) return <div
  className="bg-black w-screen h-screen flex items-center justify-center">
     <Loader />

  </div>;

  const skillEntries = Object.entries(data.skills).sort((a, b) => b[1] - a[1]);
  const recommendedSkills = skillEntries
    .filter(([skill]) => skill !== selectedSkill)
    .slice(0, 5)
    .map(([skill]) => skill);
  const topCompanyJobs = data.jobs.slice(0, 10);

  return (
    <div className="bg-black w-screen min-h-screen">
      <SearchBar />
      <Cards
        totalJobs={data.demand}
        averageSalary={data.avgSalary}
        recommendedSkills={recommendedSkills}
        country={selectedCountryLabel}
        skill={selectedSkill}
      />

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
                  {formatSalaryRange(job.salary_min, job.salary_max)}
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
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
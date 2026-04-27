import { useEffect, useState } from "react";
import { fetchJobs } from "./utils/fetchJobs";
import { cleanJobs } from "./utils/processJobs";
import { getDemand, getAverageSalary, getRoleDistribution } from "./utils/analytics";
import { extractSkills } from "./utils/extractSkills";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetchJobs("react", "","us");
      console.log(res);

      const jobs = cleanJobs(res.results);

      const demand = getDemand(res);
      const avgSalary = getAverageSalary(jobs);
      const skills = extractSkills(jobs);
      const roles = getRoleDistribution(jobs);

      setData({ demand, avgSalary, skills, roles });
    };

    loadData();
  }, []);

  if (!data) return <div>Loading...</div>;

  const skillEntries = Object.entries(data.skills).sort((a, b) => b[1] - a[1]);
  const roleEntries = Object.entries(data.roles).sort((a, b) => b[1] - a[1]);

  return (
    <div>
      <h1>Total Jobs: {data.demand}</h1>
      <h2>Average Salary: {Math.round(data.avgSalary).toLocaleString()}</h2>

      <h3>Role Distribution</h3>
      {roleEntries.length === 0 ? (
        <p>No role data found.</p>
      ) : (
        <ul>
          {roleEntries.map(([role, count]) => (
            <li key={role}>
              out of 10 jobs {role}: {count}
            </li>
          ))}
        </ul>
      )}

      <h3>Skill Demand</h3>
      {skillEntries.length === 0 ? (
        <p>No skills extracted.</p>
      ) : (
        <ul>
          {skillEntries.map(([skill, count]) => (
            <li key={skill}>
              out of 10 jobs {skill}: {count}
            </li>
          ))}
        </ul>
      )}


    </div>
  );
}
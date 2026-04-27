
import { classifyJobRole } from "./classifyJobs";
export const getDemand = (data) => {
    return data.count || 0;
};

export const getAverageSalary = (jobs) => {
    const salaries = jobs
      .filter(job => job.salary_min && job.salary_max)
      .map(job => (job.salary_min + job.salary_max) / 2);
  
    if (salaries.length === 0) return 0;
  
    return salaries.reduce((a, b) => a + b, 0) / salaries.length;
};

export const getRoleDistribution = (jobs) => {
    const counts = {};
  
    jobs.forEach(job => {
      const role = classifyJobRole(job);
      counts[role] = (counts[role] || 0) + 1;
    });
  
    return counts;
};

export const getMatchScore = (job, userSkills) => {
    const text = job.description.toLowerCase();
  
    let score = 0;
  
    userSkills.forEach(skill => {
      if (text.includes(skill.toLowerCase())) {
        score++;
      }
    });
  
    return Math.round((score / userSkills.length) * 100);
};



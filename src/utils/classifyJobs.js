export const classifyJobRole = (job) => {
    const text = (job.title + " " + job.description).toLowerCase();
  
    if (text.includes("frontend") || text.includes("react"))
      return "Frontend";
  
    if (text.includes("backend") || text.includes("node") || text.includes("java"))
      return "Backend";
  
    if (text.includes("full stack"))
      return "Full Stack";
  
    return "Other";
  };
  
  export const classifySeniority = (job) => {
    const text = job.title.toLowerCase();
  
    if (text.includes("senior")) return "Senior";
    if (text.includes("junior")) return "Junior";
    if (text.includes("lead")) return "Lead";
  
    return "Mid";
  };
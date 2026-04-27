const SKILLS = [
    "react", "node", "mongodb", "aws", "docker",
    "python", "java", "sql", "typescript", "next.js"
  ];
  
  export const extractSkills = (jobs) => {
    const skillCount = {};
  
    jobs.forEach(job => {
      const text = job.description.toLowerCase();
  
      SKILLS.forEach(skill => {
        if (text.includes(skill)) {
          skillCount[skill] = (skillCount[skill] || 0) + 1;
        }
      });
    });
  
    return skillCount;
  };
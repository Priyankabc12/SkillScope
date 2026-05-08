export const SKILLS = [
    "react", "node", "mongodb", "aws", "docker",
    "python", "java", "sql", "typescript", "next.js",
    "javascript", "html", "css", "react native", "flutter",
    "kotlin", "swift", "ruby", "php", "laravel", "express",
    "django", "flask", "spring", "hibernate", "maven", "gradle",
    "docker", "kubernetes", "terraform", "ansible", "chef",
    "puppet", "salt", "chef", "puppet", "salt", "ansible",
    "chef", "puppet", "salt", "ansible", "chef", "puppet",
    "salt", "ansible", "chef", "puppet", "salt", "ansible",
    "chef", "puppet", "salt", "ansible", "chef", "puppet",
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
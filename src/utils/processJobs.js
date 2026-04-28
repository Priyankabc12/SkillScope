export const cleanJobs = (jobs) => {
    return jobs.map(job => ({
      title: job.title || "",
      description: job.description || "",
      company: job.company?.display_name || "Unknown",
      location: job.location?.display_name || "",
      salary_min: job.salary_min || null,
      salary_max: job.salary_max || null,
      apply_url: job.redirect_url || job.url || "",
    }));
  };
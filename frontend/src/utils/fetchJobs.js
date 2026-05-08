import axios from 'axios'
export const fetchJobs = async (skill, location = "india",country) => {
    const appId = import.meta.env.VITE_ADZUNA_APP_ID;
    const appKey = import.meta.env.VITE_ADZUNA_APP_KEY;
    const apiBaseUrl = import.meta.env.VITE_ADZUNA_API_BASE_URL || "https://api.adzuna.com/v1/api/jobs";
    const defaultCountry = import.meta.env.VITE_ADZUNA_DEFAULT_COUNTRY || "in";
    const page = import.meta.env.VITE_ADZUNA_PAGE || "1";

    if (!appId || !appKey) {
      throw new Error("Missing Adzuna credentials. Set VITE_ADZUNA_APP_ID and VITE_ADZUNA_APP_KEY in .env");
    }

    const selectedCountry = country || defaultCountry;
    const url = `${apiBaseUrl}/${selectedCountry}/search/${page}?what=${encodeURIComponent(skill)}&where=${encodeURIComponent(location)}&app_id=${appId}&app_key=${appKey}`;
  
    const res = await axios.get(url);
  
    return res.data;
  };
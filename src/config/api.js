const API = import.meta.env.VITE_API_URL;

if (!API) {
  console.error("❌ VITE_API_URL is not defined");
}

export default API;
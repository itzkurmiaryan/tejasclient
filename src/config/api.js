const API = import.meta.env.VITE_API_URL || "https://tejasserver.onrender.com/api";

if (!API) {
  console.error("❌ VITE_API_URL is not defined");
}

export default API;
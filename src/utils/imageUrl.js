export const getImageUrl = (path) => {
  if (!path) return "";
  
  // If it's already an absolute HTTP/HTTPS URL (e.g. YouTube thumbnail or external link)
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Get base API URL from env or fallback to local backend port 8000
  const envBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const baseUrl = envBaseUrl ? envBaseUrl.replace(/\/$/, "").replace(/\/api$/, "") : "http://localhost:8000";
  
  const cleanPath = path.replace(/\\/g, "/");
  const formattedPath = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;

  return `${baseUrl}${formattedPath}`;
};

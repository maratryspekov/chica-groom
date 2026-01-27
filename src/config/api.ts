// API configuration using environment variables
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const API_ENDPOINTS = {
  BOOKING: `${API_URL}/api/booking`,
  COURSES: `${API_URL}/api/courses`,
  FRANCHISE: `${API_URL}/api/franchise`,
  PRACTICE: `${API_URL}/api/practice`,
  WORKPLACE: `${API_URL}/api/workplace`,
  JOBS: `${API_URL}/api/jobs`,
} as const;

import axios from "axios";

const LANGCHAIN_API_URL = import.meta.env.VITE_LANGCHAIN_API_URL;

export async function analyzeCVWithJob({ cvFile, jobDescription }) {
  const formData = new FormData();
  formData.append("cv", cvFile);
  formData.append("job_description", jobDescription);

  const response = await axios.post(`${LANGCHAIN_API_URL}/analyze`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

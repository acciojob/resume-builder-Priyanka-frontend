import "regenerator-runtime/runtime";

const API_URL = "http://localhost:5001/api/resume";

export const saveResume = async (resume) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resume),
  });

  if (!response.ok) {
    throw new Error("Failed to save resume");
  }

  return response.json();
};

export const loadResume = async () => {
  const response = await fetch(API_URL);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to load resume");
  }

  return response.json();
};


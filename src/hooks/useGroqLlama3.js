import { useState } from 'react';

export const useGroqLlama3 = () => {
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    setLoading(true);
    // Simulate API call
    const response = await new Promise((resolve) => setTimeout(() => resolve(`Echo: ${message}`), 1000));
    setLoading(false);
    return response;
  };

  return { sendMessage, loading };
};
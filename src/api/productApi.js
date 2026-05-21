import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);

    console.log("API URL:", `${API_URL}/products`);
    console.log("PRODUCT API RESPONSE:", response.data);

    return Array.isArray(response.data)
      ? response.data
      : response.data.products || [];

  } catch (error) {
    console.log("GET PRODUCTS ERROR:", error);
    return [];
  }
};
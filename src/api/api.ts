const apiUrl = "https://api.escuelajs.co/api/v1";

const fetchProducts = async () => {
  try {
    const response = await fetch(`${apiUrl}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export { apiUrl, fetchProducts };
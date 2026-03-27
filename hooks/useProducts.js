import { useEffect, useState } from "react";
import { extraProducts } from "../data/moreproducts";

export default function useProducts() { // ✅ DEFAULT EXPORT
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categorize = (items) => {
    return items.map((item) => {
      let customCategory = "All";

      if (item.category?.includes("electronics")) {
        customCategory = "Electronics";
      }

      if (
        item.category?.includes("men") ||
        item.category?.includes("women")
      ) {
        customCategory = "Fashion";
      }

      if (item.title?.toLowerCase().includes("phone")) {
        customCategory = "Phones";
      }

      if (
        item.title?.toLowerCase().includes("gaming") ||
        item.title?.toLowerCase().includes("console")
      ) {
        customCategory = "Gaming";
      }

      return { ...item, customCategory };
    });
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const categorized = categorize(data);

        const apiProducts = categorized.map((item) => ({
          ...item,
          id: `api-${item.id}`, // ✅ stable ID
        }));

        const localProducts = extraProducts.map((item) => ({
          ...item,
          id: `extra-${item.id}`,
        }));

        setProducts([...apiProducts, ...localProducts]);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
}
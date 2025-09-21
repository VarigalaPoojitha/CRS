import React, { useEffect, useState } from "react";
import CostumeCard from "./CostumeCard";
import api from "./api";

function Shop({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/products")
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="product-list">
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map(product => (
          <CostumeCard
            key={product.id}
            costume={product}
            addToCart={addToCart || (() => {})} // prevent crash if addToCart not passed
          />
        ))
      )}
    </div>
  );
}

export default Shop;

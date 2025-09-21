import React, { useEffect, useState } from "react";
import CostumeCard from "./CostumeCard";
import api from "./api";

function Shop({ addToCart }) {
  const [costumes, setCostumes] = useState([]);

  useEffect(() => {
    api.get("/costumes")
      .then(res => setCostumes(res.data))
      .catch(err => console.error("Error fetching costumes:", err));
  }, []);

  return (
    <div className="costume-list">
      {costumes.map(c => (
        <CostumeCard key={c.id} costume={c} addToCart={addToCart} />
      ))}
    </div>
  );
}

export default Shop;
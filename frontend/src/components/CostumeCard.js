import React from "react";

function CostumeCard({ costume, addToCart }) {
  return (
    <div className="costume-card">
      <img src={costume.image} alt={costume.name} />
      <h3>{costume.name}</h3>
      <p>{costume.type} | Size: {costume.size}</p>
      <button onClick={() => addToCart(costume)}>Add to Cart</button>
    </div>
  );
}

export default CostumeCard;
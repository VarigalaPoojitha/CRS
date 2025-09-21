import React from "react";

function CostumeCard({ costume, addToCart }) {
  return (
    <div className="costume-card">
      {costume.image && (
        <img
          src={`http://localhost:5000/uploads/${costume.image}`} 
          alt={costume.title}
          width="150"
        />
      )}
      <h3>{costume.title}</h3>
      <p>{costume.description}</p>
      <p>₹{costume.price}</p>
      <button onClick={() => addToCart(costume)}>Add to Cart</button>
    </div>
  );
}

export default CostumeCard;

// frontend/src/components/SellerDashboard.js
import React, { useState, useEffect, useContext } from "react";
import api from "./api";
import { AuthContext } from "../context/AuthContext";

function SellerDashboard() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    category: "",
    age_group: "",
    gender: "",
    type: "",
    size: "",
    price: "",
    image: null,
  });

  useEffect(() => {
    if (!user || user.role !== "seller") return;

    // Fetch seller’s products
    api
      .get("/products/my-products", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching seller products:", err));
  }, [user]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!user || user.role !== "seller") {
      alert("Please log in as seller.");
      return;
    }

    const formData = new FormData();
    Object.keys(newProduct).forEach((key) => {
      formData.append(key, newProduct[key]);
    });

    api
      .post("/products", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setProducts([...products, res.data]);
        setNewProduct({
          title: "",
          description: "",
          category: "",
          age_group: "",
          gender: "",
          type: "",
          size: "",
          price: "",
          image: null,
        });
      })
      .catch((err) => console.error("Error adding product:", err));
  };

  const handleDelete = (id) => {
    api
      .delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(() => {
        setProducts(products.filter((p) => p.id !== id));
      })
      .catch((err) => console.error("Error deleting product:", err));
  };

  if (!user || user.role !== "seller") {
    return <p>Only sellers can access this page.</p>;
  }

  return (
    <div className="seller-dashboard">
      <h2>Seller Dashboard</h2>

      <h3>My Products</h3>
      {products.length === 0 ? (
        <p>You haven’t listed any products yet.</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              {p.title} — ₹{p.price} ({p.size}, {p.type})
              <button onClick={() => handleDelete(p.id)} style={{ marginLeft: "10px" }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3>Add New Product</h3>
      <form onSubmit={handleAddProduct} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        />
        <input
          type="text"
          placeholder="Age Group"
          value={newProduct.age_group}
          onChange={(e) => setNewProduct({ ...newProduct, age_group: e.target.value })}
        />
        <input
          type="text"
          placeholder="Gender"
          value={newProduct.gender}
          onChange={(e) => setNewProduct({ ...newProduct, gender: e.target.value })}
        />
        <input
          type="text"
          placeholder="Type"
          value={newProduct.type}
          onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
        />
        <input
          type="text"
          placeholder="Size"
          value={newProduct.size}
          onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          required
        />
        <input
          type="file"
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default SellerDashboard;

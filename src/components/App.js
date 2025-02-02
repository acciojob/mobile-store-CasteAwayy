import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

const productsData = [
  { id: 1, name: "Product 1", description: "Mobile 1 Description" },
  { id: 2, name: "Product 2", description: "Mobile 2 Description" },
  { id: 3, name: "Product 3", description: "Mobile 3 Description" },
];

function ProductList() {
  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {productsData.map((product) => (
          <li key={product.id}>
            {product.name}
            <Link to={`/products/${product.id}`}>
              <button className="btn">Buy</button>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/admin">Go to Admin</Link>
    </div>
  );
}

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productsData.find((prod) => prod.id === parseInt(id));

  if (!product) return <h2>Product not found</h2>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <button
        onClick={() => {
          alert(`Product ${product.name} deleted.`);
          navigate("/admin");
        }}
      >
        Delete Product
      </button>
      <br />
      <Link to="/admin">Go to Admin</Link>
    </div>
  );
}

function Admin() {
  const [products, setProducts] = useState(productsData);

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEdit = (id) => {
    const newName = prompt("Enter new product name:");
    const newDescription = prompt("Enter new product description:");
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, name: newName, description: newDescription }
          : product
      )
    );
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.description}
            <button onClick={() => handleEdit(product.id)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Link to="/">Back to Products</Link>
    </div>
  );
}

function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  </div>
  );
}

export default App;

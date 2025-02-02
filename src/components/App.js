import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

const initialProducts = [
  { id: 1, name: "Product 1", description: "Mobile 1 Description" },
  { id: 2, name: "Product 2", description: "Mobile 2 Description" },
  { id: 3, name: "Product 3", description: "Mobile 3 Description" },
];

function ProductList({ products }) {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="btn">
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/admin">Go to Admin</Link>
    </div>
  );
}

function ProductDetail({ products }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((prod) => prod.id === parseInt(id));

  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{product.name}</h1>
      <p>{product.description}</p>
      <Link to="/admin" className="text-blue-600">
        Go to Admin
      </Link>
    </div>
  );
}

function Admin({ products, setProducts }) {
  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEdit = (id) => {
    const newName = prompt("Enter new product name:");
    const newDescription = prompt("Enter new product description:");
    if (newName && newDescription) {
      setProducts(
        products.map((product) =>
          product.id === id
            ? { ...product, name: newName, description: newDescription }
            : product
        )
      );
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Admin Panel</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="mt-2">
            {product.name} - {product.description}
            <button
              onClick={() => handleEdit(product.id)}
              className="ml-2 p-1 bg-yellow-400 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className="ml-2 p-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <Link to="/" className="block mt-4 text-blue-600">
        Back to Products
      </Link>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState(initialProducts);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ProductList products={products} />} />
          <Route
            path="/products/:id"
            element={<ProductDetail products={products} />}
          />
          <Route
            path="/admin"
            element={<Admin products={products} setProducts={setProducts} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

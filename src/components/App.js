import React from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
  useParams,
  Link,
  NavLink,
} from "react-router-dom";

import styles from "./App.module.css";

const products = [
  { id: 1, name: "Mobile 1", description: "Description 1", price: "$200" },
  { id: 2, name: "Mobile 2", description: "Description 2", price: "$300" },
  { id: 3, name: "Mobile 3", description: "Description 3", price: "$400" },
  { id: 4, name: "Mobile 4", description: "Description 4", price: "$400" },
  { id: 5, name: "Mobile 5", description: "Description 5", price: "$400" },
  { id: 6, name: "Mobile 6", description: "Description 6", price: "$400" },
];

function AdminProdcut() {
  const { id } = useParams();

  return (
    <div>
      <p>Product {id}</p>
      <input name="title" id="title" />

      <button>Delete</button>
      <button>Save</button>
    </div>
  );
}

function Home() {
  return (
    <div className='col-12'>
      {products.map((item) => (
        <div>
          <Link key={item.id} to={`/products/${item.id}`}>
            {item.name} <button>Buy</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
function Product() {
  const { id } = useParams();

  return (
    <div>
      <h1>Product {id} </h1>
      <Link to="/">
        <button className="btn">Other Products</button>
      </Link>
    </div>
  );
}

function Admin() {
  return (
    <>
      <h1>Admin Panel</h1>
      <div className="col-12">
        {products.map((item) => (
          <div>
            <NavLink key={item.id} to={`products/${item.id}`}>
              {item.name}
            </NavLink>
          </div>
        ))}
      </div>
    </>
  );
}

function PageNav() {
  return (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="admin">Admin</NavLink>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <PageNav />
      <Routes>
        <Route index element={<Home />} />
        <Route path="admin" element={<Admin />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/admin/products/:id" element={<AdminProdcut />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

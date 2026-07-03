import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminCategories from "./pages/AdminCategories";

function App() {

    return (

        <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/products" element={<Products />} />

            <Route path="/products/:id" element={<ProductDetails />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="/orders" element={<MyOrders />} />

            <Route path="/admin" element={<AdminDashboard />} />

            <Route path="/admin/products" element={<AdminProducts />} />

            <Route path="/admin/categories" element={<AdminCategories />} />

        </Routes>

    );

}

export default App;
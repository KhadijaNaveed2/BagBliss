import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import About from "./pages/About.js";
import Contact from "./pages/Contact.js";
import Policy from "./pages/Policy.js";
import PageNotFound from "./pages/PageNotFound.js";
 import "./index.css";
import Register from "./pages/Auth/Register.js";
import Login from "./pages/Auth/Login.js";
import DashBoard from "./pages/User/DashBoard.js";
import ForgotPassword from "./pages/Auth/ForgotPassword.js";
import AdminRoute from "./components/Routes/AdminRoute.js";
import AdminDashBoard from "./pages/Admin/AdminDashBoard.js";
import PrivateRoute from "./components/Routes/Private.js";
import CreateCategory from "./pages/Admin/CreateCategory.js";
import CreateProduct from "./pages/Admin/CreateProduct.js";
import Users from "./pages/Admin/Users.js";
import Orders from "./pages/User/Orders.js";
import Profile from "./pages/User/Profile.js";
import Products from "./pages/Admin/Products.js";
import UpdateProduct from "./pages/Admin/UpdateProduct.js";
import Search from "./pages/Search.js";
import ProductDetails from "./pages/ProductDetails.js";
import Categories from "./pages/Categories.js";
import CategoryProduct from "./pages/CategoryProduct.js";
import CartPage from "./pages/CartPage.js";
import AdminOrder from "./pages/Admin/AdminOrder.js";

function App() {
    return (
        <>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/product/:slug" element={<ProductDetails/>} />
            <Route path="/categories" element={<Categories/>} />
            <Route path="/cart" element={<CartPage/>} />
            <Route path="/category/:slug" element={<CategoryProduct/>} />
            <Route path="/search" element={<Search/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/dashboard" element={< PrivateRoute/>} >
            <Route path="user" element={<DashBoard />} /> 
            <Route path="user/orders" element={<Orders />} />
            <Route path="user/profile" element={<Profile />} />
            </Route>
            <Route path="/dashboard" element={<AdminRoute />} >
            <Route path="admin" element={<AdminDashBoard />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/create-product" element={<CreateProduct />} />
            <Route path="admin/product/:slug" element={<UpdateProduct />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/users" element={<Users />} />
            <Route path="admin/orders" element={<AdminOrder />} />
            </Route>
            <Route path="/about" element={<About/>} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/policy" element={<Policy/>} />
            <Route path="*" element={<PageNotFound/>} />
        </Routes>
        </>
    );
}

export default App;

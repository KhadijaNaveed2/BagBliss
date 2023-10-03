import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
    return (
        <>
  <div className="text-center">
    <div className="list-group">
      <h3>Admin Panel</h3>

      <div className="mb-3">
        <label htmlFor="createCategory" className="form-label"></label>
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action"
        >
        Create Category
        </NavLink>
      </div> 

      <div className="mb-2">
        <label htmlFor="createProduct" className="form-label"></label>
        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-action"
        >
          Create Product
        </NavLink>
        </div>
        <div className="mb-2">
        <label htmlFor="products" className="form-label"></label>
        <NavLink
          to="/dashboard/admin/products"
          className="list-group-item list-group-item-action"
        >
         Products
        </NavLink>
        </div>
        <div className="mb-2">
        <label htmlFor="orders" className="form-label"></label>
        <NavLink
          to="/dashboard/admin/orders"
          className="list-group-item list-group-item-action"
        >
         Orders
        </NavLink>
      </div>

      <div className="mb-2">
        <label htmlFor="users" className="form-label"></label>
        <NavLink
          to="/dashboard/admin/users"
          className="list-group-item list-group-item-action"
        >
          Users
        </NavLink>
      </div>
    </div>
  </div>
</>

    );
};

export default AdminMenu;

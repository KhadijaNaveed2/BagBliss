import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
    <div className="text-center">
      <div className="list-group">
        <h3>DashBoard</h3>
        <div className="mb-3">
          <label htmlFor="MakeProfile" className="form-label"></label>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
          Profile
          </NavLink>
        </div>
  
        <div className="mb-3">
          <label htmlFor="MakeOrders" className="form-label"></label>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </div>
  </>
  );
};

export default UserMenu;
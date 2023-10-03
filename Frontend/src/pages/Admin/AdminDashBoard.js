import React from "react";
import Layout from "./../../components/Layout/Layout.js";
import AdminMenu from "../../components/Layout/AdminMenu.js";
import { useAuth } from "../../Context/auth.js";

const AdminDashBoard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Admin DashBoard - BagBliss"}>
        <div className="admin-dashboard m-3 p-3 ">
    <div className="row">
    <div className="col-md-3">
     <AdminMenu/>
         </div>
         <div className="col-md-9">
          <div className="card w-70 p-3">
            <h3> Admin Name : {auth?.user?.name}</h3>
            <h3> Admin Email : {auth?.user?.email}</h3>
            <h3> Admin PhoneNo : {auth?.user?.phoneno}</h3>
          </div>
         </div>
         </div>
        </div>
    </Layout>
  );
};

export default AdminDashBoard;
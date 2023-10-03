import React from "react";
import Layout from "../../components/Layout/Layout.js";
import { useAuth } from "../../Context/auth.js";
import UserMenu from "../../components/Layout/UserMenu.js";

const DashBoard = () => {
  const [auth] = useAuth();
  return (
   <Layout title ={"DashBoard - BagBliss"}>
        <div className="admin-dashboard m-3 p-3 ">
    <div className="row">
    <div className="col-md-3">
     <UserMenu/>
         </div>
         <div className="col-md-9">
         
          <div className="card w-70 p-3">
            <h3> {auth?.user?.name}</h3>
            <h3> {auth?.user?.email}</h3>
            <h3> {auth?.user?.address}</h3>
          </div>
         </div>
         </div>
        </div>
    </Layout>
  );
};

export default DashBoard;
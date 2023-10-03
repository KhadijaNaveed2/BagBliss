import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout.js";
import useCategory from "../Hooks/useCategory.js";
import { Link } from "react-router-dom";

const Categories = () => {
  const Categories = useCategory();

  return (
   <Layout title={"All Categories - BagBliss"}>
   <div className="container" style={{ marginTop: "50px" }}>
        <div className="row container">
        {Categories.map((c) => (
          <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
          <Link to ={`/category/${c.slug}`} className="btn btn-primary">
          {c.name}</Link>
          
        </div>
        ))}
          </div>
        </div>
   </Layout>
  );
};

export default Categories;
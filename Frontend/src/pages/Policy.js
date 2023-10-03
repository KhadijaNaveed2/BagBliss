import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy - BagBliss"}>
    <div className="row privacypolicy">
      <div className="col-md-6">
        <img
        src="/images/aboutus.jpg"
        alt="privacypolicy"
        style={{ width: "100%" }}
        />
      </div>
      <div className="col-md-4">
      <h1 className="bg-dark p-2 text-white text-center">PRIVACY POLICY</h1>
      <p>Add Privacy Policy</p>
      <p>Payment Method</p>
      <p>Security Concern</p>
      <p>Shipping info</p>
      </div>
      </div>
    </Layout>
  );
};

export default Policy;
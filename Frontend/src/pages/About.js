import React from "react";
import Layout from "../components/Layout/Layout.js";

const About = () => {
  return (
    <Layout title={"About us - BagBliss"}>
    <div className="row about-us">
      <div className="col-md-6">
        <img
        src="/images/aboutus.jpg"
        alt="aboutus"
        style={{ width: "100%" }}
        />
      </div>
      <div className="col-md-4">
      <h1 className="bg-dark p-2 text-white text-center">ABOUT US</h1>
      <p className="text-justify text-center mt-2">
      Bag Bliss is a fashion website dedicated to providing readers with the latest news, trends, and reviews in the world of designer bags. The site features expert analysis and opinion pieces on topics ranging from new product releases to celebrity fashion choices. With a focus on luxury brands and high-end fashion, Bag Bliss offers readers an exclusive look into the world of designer handbags
      </p>
      </div>
      </div>
        </Layout>
  );
};

export default About;
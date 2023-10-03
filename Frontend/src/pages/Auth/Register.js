import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout.js";
import toast from "react-hot-toast";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phoneno, setphoneno] = useState("");
  const [address, setaddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/v1/auth/register",
         { name, email, password, phoneno, address, answer,}
         );
         if (res.data && res.data.success) {
          toast.success(res.data.message);
          navigate("/login");
         } else {
          toast.error(res.data.message);
         };
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    };
  };

  return (
    <Layout title={"Register - BagBliss"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h3 className="title"> REGISTER FORM</h3>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="form-control"
              id="exampleInputName"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phoneno}
              onChange={(e) => setphoneno(e.target.value)}
              className="form-control"
              id="exampleInputPhone-No1"
              placeholder="Enter Your Phone-No"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              className="form-control"
              id="exampleInpuAddress1"
              placeholder="Enter Your Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInpuAddress1"
              placeholder="What is your Favourite Hobby?"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">REGISTER</button>
        </form>
      </div>
    </Layout>
  );
};


export default Register;
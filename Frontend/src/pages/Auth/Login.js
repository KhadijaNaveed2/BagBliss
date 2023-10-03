import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout.js";
import toast from "react-hot-toast";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../../Context/auth.js";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/v1/auth/login",
         {  email, password,}
         );
         if (res.data && res.data.success) {
          toast.success(res.data.message);
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token
          });
          localStorage.setItem("auth", JSON.stringify(res.data));
          navigate("/");
         } else {
          toast.error(res.data.message);
         };
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    };
  }; 
  return (
    <Layout title={"Login - BagBliss"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h3 className="title"> LOGIN FORM</h3>
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
          <button
  type="submit"
  className="btn btn-primary"
>
  LOGIN
</button>

<div className="mb-3">
  <button
    type="button"
    className="btn btn-primary"
    onClick={() => {
      navigate("/forgot-password");
    }}
    style={{ marginTop: '10px' }}
  >
    Forgot Password
        </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
  


export default Login;
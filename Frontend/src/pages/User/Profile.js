import React, {useState, useEffect} from "react";
import Layout from "../../components/Layout/Layout.js";
import UserMenu from "../../components/Layout/UserMenu.js";
import { useAuth } from "../../Context/auth.js";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  //Context
  const [auth, setAuth] = useAuth();
  //State
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phoneno, setphoneno] = useState("");
  const [address, setaddress] = useState("");

  //get User Data
useEffect(() => {
   const {email, name, phoneno, address} = auth?.user;
    setname(name);
    setemail(email);
    setphoneno(phoneno);
    setaddress(address);
}, [auth?.user]);
   
  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(
        "/api/v1/auth/profile",
         { name, email, password, phoneno, address,});
         if (data?.error) {
         toast.error(data?.error)
    } else {
      setAuth({...auth, user: data?.updatedUser});
      let ls = localStorage.getItem("auth");
      ls = JSON.parse(ls);
      ls.user = data.updatedUser;
      localStorage.setItem("auth", JSON.stringify(ls));
      toast.success("Profile Updated Successfully");
    }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    };
  };

  return (
    <Layout title ={"Your Profile - BagBliss"}>
<div className="admin-dashboard m-3 p-3 ">
    <div className="row">
    <div className="col-md-3">
        <UserMenu/>
    </div> 
    <div className="col-md-9" >
    <div>
    <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h3 className="title">USER PROFILE </h3>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="form-control"
              id="exampleInputName"
              placeholder="Enter Your Name"
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
              disabled
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
            />
          </div>
          <button type="submit" className="btn btn-primary">UPDATE</button>
        </form>
      </div>
    </div>
    </div>
        </div>
        </div>
    </Layout>
  );
};

export default Profile;


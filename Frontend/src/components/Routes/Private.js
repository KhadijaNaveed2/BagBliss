import { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth.js";
import { Outlet } from "react-router-dom";
import axios  from "axios";
import Spinner from "./Spinner.js";

export default function PrivateRoute() {
    const [ok, setOk] = useState(false)
    const [auth, setAuth] = useAuth();


    useEffect(() => {
        const authCheck = async () => {
          console.log("Auth token:", auth?.token);
          
          const res = await axios.get("/api/v1/auth/user-auth");
          if (res.data.ok) {
            setOk(true);
          } else {
            setOk(false);
          }
        };
        if (auth?.token) authCheck();
      }, [auth?.token]);
      console.log("ok state has changed:", ok);
     return ok ? <Outlet /> : <Spinner/>; 
    }
/*<Navigate to ="/dashboard/user/profile" */
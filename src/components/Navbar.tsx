import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { User } from "../types/User.type";
import '../css/Profile.css'



export default function Navbar() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    function logout(){
        window.sessionStorage.removeItem("username");
        navigate("/login");
        window.location.reload();
    }

    function login(){
      navigate("/login");
      window.location.reload();
    }

    function profile(){
      /*
      var teee = window.sessionStorage.getItem("username");
      window.sessionStorage.setItem("profileUser",teee);
      */
        navigate("/profile");
        window.location.reload();

    }

    return (
        <>
            <body>
            <div className="topnav">
            {window.sessionStorage.getItem("username") ? <a className="cta" onClick={logout}>Sign Out</a>
  : <a className="cta" onClick={login}>Sign In</a>}

{window.sessionStorage.getItem("username") ? <a className="cta" onClick={profile}>Profile</a>
  : <></>}


 
</div>

            </body>
        </>
    );
}
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Opponent } from "../types/Opponent.type";
import '../css/Profile.css'
import { User } from "../types/User.type";
//import '../css/Profile.css';
import '../css/Navbar.css'



export default function Navbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  function logout() {
    window.sessionStorage.removeItem("username");
    navigate("/login");
    window.location.reload();
  }

  function login() {
    navigate("/login");
    window.location.reload();
  }

  function lobby() {
    navigate("/lobby");
    window.location.reload();
  }

  function rules() {
    navigate("/rules");
    window.location.reload();
  }

  function notifications() {  //needs to be implemented
    //navigate("/lobby");
    window.location.reload();
  }

  function profile() {
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
          <ul>
            <li>
              {window.sessionStorage.getItem("username") ? <a className="cta" onClick={logout}>Sign Out</a>
                : <a className="cta" onClick={login}>Sign In</a>}
            </li>
            <li>
              {window.sessionStorage.getItem("username") ? <a className="cta" onClick={notifications}>Notifications</a>
                : <></>}
            </li>
            <li>
              {window.sessionStorage.getItem("username") ? <a className="cta" onClick={profile}>Profile</a>
                : <></>}
            </li>
            <li>
              {window.sessionStorage.getItem("username") ? <a className="cta" onClick={rules}>Rules</a>
                : <></>}
            </li>
          </ul>

          {window.sessionStorage.getItem("username") ? <a className="navtitle" onClick={lobby}>Words Away</a>
            : <></>}

        </div>


      </body>
    </>
  );
}
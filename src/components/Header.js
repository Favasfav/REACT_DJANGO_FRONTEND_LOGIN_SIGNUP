import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../Header.css";

function Header() {
  let { user,is_superuser, logoutUser } = useContext(AuthContext);
  // console.log("is_superuser",is_superuser)

  return (
    <div className="abc">
      <ul class="nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>{user && <p>Hello {user.username}</p>}</li>
        <li>
          {user ? (
            <>
              
              <button className="btnclick" onClick={logoutUser}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
          
        </li>
       
        <li>{is_superuser && <Link to="admin-userlist/">ADMIN PANEL</Link>  }</li>
      </ul>
    </div>
  );
}

export default Header;

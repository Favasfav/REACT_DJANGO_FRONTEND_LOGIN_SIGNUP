import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    let [authToken, setAuthToken] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    let [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwt_decode(localStorage.getItem("authTokens"))
            : null
    );

    let [is_superuser, setIsSuperuser] = useState(false);

    let navigate = useNavigate();
    let [loading, setLoading] = useState(false);

    let loginUser = async (e) => {
        e.preventDefault();
        const username1 = e.target.username.value;
        const password1 = e.target.password.value;
        // console.log("cbvnvbnbf ");

        let response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username1, password: password1 }),
        });

        let data = await response.json();
        
        
        if (response.status === 200) {
            const decodedToken = jwt_decode(data.access);
            setIsSuperuser(decodedToken.is_superuser);
           if (decodedToken.is_superuser) {
             // The user is a superuser
               console.log("User is a superuser");
           } else {
  // The user is not a superuser
             console.log("User is not a superuser");
             }
            setAuthToken(data);
            setUser(jwt_decode(data.access));
            // console.log("data:......issupruser........", jwt_decode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
            navigate("/");
        } else {
            alert("Something went wrong");
        }
    };

    let logoutUser = () => {
        setAuthToken(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate("/login");
    };

    let updateToken = async () => {
        console.log("update token called");
        let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: authToken.refresh }),
        });

        let data = await response.json();

        if (response.status === 200) {
            setAuthToken(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
        } else {
            loginUser();
        }
    };

    useEffect(() => {
        let intervalId;

        if (authToken) {
            intervalId = setInterval(() => {
                updateToken();
            }, 2000);
        }

        return () => clearInterval(intervalId);
    }, [authToken]);

    let contextData = {
        user: user,
        is_superuser:is_superuser,
        loginUser: loginUser,
        logoutUser: logoutUser,
    };

    return (
        <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
    );
};

import AuthContext from "../context/AuthContext"
import React,{useContext} from 'react'

import '../login.css';

import {Link} from 'react-router-dom'
import { Router } from "react-router-dom";
function LoginPage() {
    let {loginUser}=useContext(AuthContext)
 
  return (
    <div>
       
      {/* <form onSubmit={loginUser}>
        <input type='text' name='username' placeholder='username'/>
        <input type='password' name='password' placeholder='password'/>
        <input type='submit'/> */}
    <div class="container">
	<div class="screen">
		<div class="screen__content">
			<form class="login" onSubmit={loginUser}>
				<div class="login__field">
					<i class="login__icon fas fa-user"></i>
					<input type='text' name='username' class="login__input" placeholder="User name "/>
				</div>
				<div class="login__field">
					<i class="login__icon fas fa-lock"></i>
					<input type='password' name='password' class="login__input" placeholder="Password"/>
				</div>
				<button class="button login__submit">
					<span   type='submit' class="button__text">Log In Now</span>
					<i class="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
			<div class="social-login">
				
				<Link to ="/Signup">SignUp </Link>
				<div class="social-icons">
					<a href="#" class="social-login__icon fab fa-instagram"></a>
					<a href="#" class="social-login__icon fab fa-facebook"></a>
					<a href="#" class="social-login__icon fab fa-twitter"></a>
				</div>
			</div>
		</div>
		<div class="screen__background">
			<span class="screen__background__shape screen__background__shape4"></span>
			<span class="screen__background__shape screen__background__shape3"></span>		
			<span class="screen__background__shape screen__background__shape2"></span>
			<span class="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
        
      {/* </form> */}
    </div>
  )
}

export default LoginPage

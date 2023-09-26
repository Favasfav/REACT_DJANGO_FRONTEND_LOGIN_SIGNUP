import React, { useEffect,useState }from 'react'
import '../login.css'
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2';
const Signup = () => {
   
	const navigate = useNavigate()
    const [formname, setFormname] = useState('')
    const [formpassword1, setFormpassword1] = useState('')
    const [formpassword2, setFormpassword2] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Update the state based on the input field name
        if (name === 'username') {
          setFormname(value);
        } else if (name === 'password1') {
          setFormpassword1(value);
        } else if (name === 'password2') {
          setFormpassword2(value);
        }
        console.log(name,'oooooooooooooooooooooooooo')
      };
     
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(formname.trim()===''){
          return Swal.fire({
              title: 'Error',
              text: "Enter username !", 
              icon: 'error',
              confirmButtonText: 'OK',
          });
      }
        
      if(formpassword1.trim()==='' || formpassword2.trim()===""){
        return Swal.fire({
            title: 'Error',
            text: "Enter a strong password !", 
            icon: 'error',
            confirmButtonText: 'OK',
        });
    }



        if(formpassword1!==formpassword2){
            return Swal.fire({
                title: 'Error',
                text: "Passwords not matching", 
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }



        let formData = {
            username:formname,
            password:formpassword1
        }
        console.log(formData)
        
        let response = await fetch('http://127.0.0.1:8000/api/signup/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
        })
        let data = await response.json()
        console.log(data)
        if (response.status === 201){
            // Registration was successful
                Swal.fire({
                    title: 'Success',
                    text: 'Account created successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    // Redirect to the login page after the user clicks 'OK'
                    navigate('/login');
                });
        }else if(data.username){
                    // Display an alert with the username error message
            Swal.fire({
                title: 'Error',
                text: data.username, // Display the username error message
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }else{
            alert('somethingwrong')
        }


      };


  return (
    <div>
       <div class="container">
	<div class="screen">
		<div class="screen__content">
            
			<form onSubmit={handleSubmit} class="login">
            <div class="login__field">
            <h1 className='center'>Welcome</h1>
					<i class="login__icon fas fa-user"></i>
					<input type='text'  onChange ={handleChange} name='username' class="login__input" placeholder="User name "/>
				</div>
				{/* <div class="login__field">
					<i class="login__icon fas fa-user"></i>
					<input type='text' onChange ={handleChange} name='username' class="login__input" placeholder=" Email"/>
				</div> */}
				<div class="login__field">
					<i class="login__icon fas fa-lock"></i>
					<input type='password' onChange ={handleChange} name='password1' class="login__input" placeholder="Password"/>
				</div>
                <div class="login__field">
					<i class="login__icon fas fa-lock"></i>
					<input type='password' name='password2' onChange ={handleChange} class="login__input" placeholder="confirm Password"/>
				</div>
				<button class="button login__submit">
					<span   type='submit' class="button__text">Signup</span>
					<i class="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
			
		</div>
		<div class="screen__background">
			<span class="screen__background__shape screen__background__shape4"></span>
			<span class="screen__background__shape screen__background__shape3"></span>		
			<span class="screen__background__shape screen__background__shape2"></span>
			<span class="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
    </div>
  )
}

export default Signup

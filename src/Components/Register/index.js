
/*
import { Component } from "react" 

import './index.css'

class Register extends Component{
    state={
        username:'',
        email:'',
        password:'', 
        confirmPassword:'',
        status:{}, 
        res:false,
    }

    changeConPassword=e=>{
        this.setState({confirmPassword:e.target.value})
    }

    changeEmail=e=>{
        this.setState({email:e.target.value})
    }

    changePassword=e=>{
        this.setState({password:e.target.value})
    }

    changeUsername=e=>{
        this.setState({username:e.target.value})
    }

    signUp=async(e)=>{
        e.preventDefault() 

        const {username,email,password,confirmPassword}=this.state  

       
        const newUser={username,email,password,confirmPassword} 
 const url='https://backendd-az41.onrender.com/register' 

        const options={
            method:'POST',
            headers: {
                'Content-Type': 'application/json', 
              },
              body: JSON.stringify(newUser)
        } 

      

       const response=await fetch(url,options) 
       const data=await response.json() 
       const statusm=data.message
       const statuse=data.error
       console.log(data)

       if (response.ok){
        this.setState({status:statusm,username:'',email:'',password:'',confirmPassword:'',res:true})
       }else{
        
        this.setState({status:statuse,username:'',email:'',password:'',confirmPassword:'',res:true})
       }

    


    } 

    loginButton=()=>{
        const {history}=this.props 
    history.push("/login")
    }
       
    


    render(){
        const {username,email,password,confirmPassword,res,status}=this.state 

        return(
            <div>
                <form onSubmit={this.signUp} className="form-container"> 
                <h1>Register</h1>
                <label className="username-label">User Name</label>

                    <input type="text" className="username" value={username} onChange={this.changeUsername} /> 
                    <label className="username-label">Email</label>

                    <input type="email" className="password" value={email} onChange={this.changeEmail} /> 
                     <label className="username-label">Password</label>
                    <input type="text" className="cpassword" value={password} onChange={this.changePassword} /> 
                   
 <label className="username-label">Confirm Password</label> 
                    <input type="password" className="username" value={confirmPassword} onChange={this.changeConPassword} /> 
                   

                    <button type="submit" className="submit-button">Register</button>
                    {res&&<p>{status}</p>} 
                    <button type="button" onClick={this.loginButton}>Login</button>
                </form>
            </div>
        )
    }
}

export default Register 


*/

import './index.css'

import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';


const Register = () => {
    const initialFormData = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      };
      const [error, setError] = useState('');
      const [formData, setFormData] = useState(initialFormData);
    

  const navigate=useNavigate()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp =async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
        setError('Password and Confirm Password do not match');
        return;
      }

      if (formData.username===""){
        setError('Please Enter Username')
      }

      if (formData.email===""){
        setError('Please Enter Email')
      }

      if (formData.password===""){
        setError("Please Enter Password")
      }

      if (formData.confirmPassword===""){
        setError("Please Enter confirmPassword")
      }

      const url='https://backendd-az41.onrender.com/register'
    const options= {
           method: 'POST',
           headers: {
            'Content-Type': 'application/json',
           },
              body: JSON.stringify(formData),
  }

     if (formData.username !=="" && formData.email!=="" && formData.password!=="" && formData.confirmPassword!==""){
        try{
            const response=await fetch(url,options) 
            const data=await response.json() 
            console.log(data)
            if (response.ok){
                setError(data)
                setFormData(initialFormData);
               
            }
             
    
          }catch(data){
            setError(data)
          }
    
     }

  
     
     

    
  
    
  };

  const handleLogin = (e) => {
    e.preventDefault();

navigate("/login")

   

    console.log('Log In form submitted:', formData);
    
  };

  return (
    <div className='form-container'>
      <h2>Sign Up</h2>
      <form className='form-container' onSubmit={handleSignUp}> 
        <label>
          Username
          
        </label><input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        <br />

        <label>
          Email
          
        </label><input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        <br />

        <label>
          Password
        
        </label>  <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        <br />

        <label>
          Confirm Password
         
        </label> <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        <br />

        <button type="submit" onClick={handleSignUp}>
          Sign Up
        </button>

        <button type="submit" onClick={handleLogin}>
          Log In
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Register

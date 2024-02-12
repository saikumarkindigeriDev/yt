/* import {Component} from 'react'
import Cookies from 'js-cookie'
import { withRouter } from 'react-router-dom';
import { createHashHistory } from 'history'
import './index.css'

class LoginForm extends Component { 


    state={
        username:'',
        password:'', 
        isError:false, 
        errorMsg:{},
    }

    history = createHashHistory()

    changeName=e=>{
        this.setState({username:e.target.value})
    }

    changePassword=e=>{
        this.setState({password:e.target.value})
    }

    onSubmitSuccess = jwtToken => {
        const {history} = this.props
    
        Cookies.set('jwt_token', jwtToken, {
          expires: 30,
          path: '/',
        })
        history.push('/')
      }


    logIn=async(e)=>{
        const {username,password,isError,errorMsg}=this.state 
        e.preventDefault() 

        

        const loginDetails={username,password} 

        const url="https://backendd-az41.onrender.com/login" 
        const options={
            method:'POST',
            headers: {
                'Content-Type': 'application/json', 
              },
            body:JSON.stringify(loginDetails)
        }

        const response=await fetch(url,options) 
        const data=await response.json() 
        

        
        
      if (response.ok){
            this.onSubmitSuccess(data.token) 
            console.log(data.token)
            
        }else{
            this.setState({errorMsg:data.error,isError:true})
        }  
    }




    render(){  

        const {username,password,isError,errorMsg}=this.state


        return (
            <form className='form-con' onSubmit={this.logIn}>
                <h1>Login </h1>
                <label className='username-label'>Username</label>
                <input type='text' onChange={this.changeName} value={username} className='username' /> 
                <label className='password-label'>Password</label> 
                <input type="password" onChange={this.changePassword} value={password} className='password' /> 
        <button type="submit" className='button' >Login</button>  


        {isError&&<h1>{errorMsg}</h1>}
            </form>
          )

    }






}

export default withRouter(LoginForm) */ 


import React, { useState } from 'react';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

  const initialFormData={
    username:"",
    password:""
  }
 
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(""); 
  const [showPassword,noShowPassword]=useState(false)

 
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const toggleCheck=()=>{
  noShowPassword(!showPassword)
}
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation (you may add more validation logic here)

    // Use fetch to send a POST request to the authentication endpoint
    const options= {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }

      const url='https://backendd-az41.onrender.com/login'

      if (formData.username===""){
        setError("Please Enter Username")
      }
    
      if (formData.password===""){
        setError("Please Enter Password")
      }


      if (formData.username!=="" && formData.password!==""){
        try{
          const response = await fetch(url,options);
          const data=await response.json()
          console.log(response)
        
          if (response.ok){
            if (data.Status==="Success") {
        
            
              // Successful login
              console.log(data);
              const jwtToken=data.token 
              Cookies.set('jwt_token', jwtToken, {
                expires: 30,
                path: '/',
              })
              
              // Assuming you have a home route, you can navigate to it
              navigate('/');
            }else{
              
             setError(data)
        
            }
        
          }
           else {
            // Handle authentication failure 
        
            setError(data)
            console.log(data)
          
          }
        }catch(data){
          console.log(data)
        }

      }





  
  };
  const inputType = showPassword ? 'text' : 'password'

  return (
    <div className='form-container' >
      <h2>Login </h2>
      <form className='form-container' onSubmit={handleSubmit}>
        <label>
          Username
          
        </label><input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        <br />
        <label >
          Password
          
        </label>
        <input 
            type={inputType}
            name="password"
            value={formData.password}
            onChange={handleInputChange} 

          />
        <br /> 
        <label htmlFor='checkbox' >Show password</label>
        <input type="checkbox" id="checkbox" onChange={toggleCheck}/> 
        
        <button type="submit">Submit</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;

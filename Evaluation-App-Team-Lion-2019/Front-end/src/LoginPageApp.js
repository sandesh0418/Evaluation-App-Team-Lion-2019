import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
//import view from './components/rubric-list/rubric-list.component';
//import { Link } from 'react-router-dom';
//import Register from './Register';

import Nav from "./components/nav-bar/loginNav";


class LoginPageApp extends Component 
{

    constructor(props){
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
            email: '',
            password: ''
        }
    }


    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
        
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
       
    }

    handleClick(e){
        e.preventDefault();
        window.location.assign('/register');
    }

   

    onSubmit(e){
        e.preventDefault();
        
        const obj ={
            email: this.state.email,
            password: this.state.password
        }
        
        axios.post('http://localhost:8000/', obj)
             .then(res =>{
                 console.log(res.data);
                 if(res.data === "Administrator"){
                        console.log("Logged in as Administrator")
                        window.location.assign('/view-summary');
                        sessionStorage.setItem('userType', 'Administrator');
                 }
                 else if (res.data === "Evaluator"){
                    console.log("Logged in as Evaluator")
                    window.location.assign('/gradeRubric');
                    sessionStorage.setItem('userType', 'Evaluator');
                 }
                 else{
                     alert("Please enter valid password")
                     window.location.assign('/');
                 }
             })
           
        
        
            this.setState({
                email: "",
                password: ""
            })
            
    }


    
    render() 
    {
        return (
            <form onSubmit= {this.onSubmit}>
            
                    <Nav />
                
                    <div className="from-group" style={{marginTop:100}}>
                        <label>Email:</label>
                        <input 
                        className="form-control" 
                        type="text" 
                        name="email" 
                        placeholder="Please enter your email"
                       value = {this.state.value}
                        onChange={this.onChangeEmail}
                        required
                        />
                        
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input className="form-control" 
                                type="password" 
                                name="password" 
                                placeholder="Please enter your password"
                                value={this.state.value}
                                onChange={this.onChangePassword}
                                required
                                />
                    </div>

                    <div className="form-group">
                        <input className="btn btn-primary" 
                                type="submit" 
                                value="Sign In" 
                                />  
                    </div>
                    <div className="form-group">
                       <input className="btn btn-primary" 
                                id = "register" 
                                type="button" 
                                value="Register"
                                onClick={this.handleClick}/> 
                   </div>
                
                
           
            </form>
        );
    }
}

export default LoginPageApp;
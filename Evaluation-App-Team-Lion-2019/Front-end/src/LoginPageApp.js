import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';


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

   
    setSession(resData)
    {
        sessionStorage.setItem('userRole', resData.role);
        sessionStorage.setItem('userCWID', resData.CWID);
    }

    onSubmit(e){
        e.preventDefault();
        
        const obj ={
            email: this.state.email,
            password: this.state.password
        }
        
        axios.post('http://localhost:8000/', obj)
             .then(res =>{
                 if(res.data.role === "Administrator"){
                        console.log("Logged in as Administrator")
                        this.setSession(res.data);
                        window.location.assign('/viewSummary');
                 }
                 else if (res.data.role === "Evaluator"){
                    console.log("Logged in as Evaluator")
                    this.setSession(res.data);
                    window.location.assign('/gradeRubric');
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
            <div>
                <h1>Sign In</h1>
                <form onSubmit= {this.onSubmit}>
                    
                        <div className="from-group">
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
            </div>
        );
    }
}

export default LoginPageApp;
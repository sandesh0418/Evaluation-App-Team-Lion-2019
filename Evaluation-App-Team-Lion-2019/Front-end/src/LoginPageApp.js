import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { login } from './actions/AuthAction';
import  {connect} from 'react-redux';



class LoginPageApp extends Component 
{

    constructor(props){
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
            email: '',
            password: '',
            errors:{}
            
        }
    }


    onChange(e){
        this.setState({ [e.target.name]: e.target.value});
    }

    handleClick(e){
        e.preventDefault();
        window.location.assign('/register');
    }

   
    

    onSubmit(e){
        e.preventDefault();
        
       
        
                
        this.props.login(this.state);
                
           
           
        
        
            this.setState({
                email: "",
                password: ""
            })
            
    }


    
    render() 
    {
        const {errors, email, password} = this.state;
        return (
         
                
                <form onSubmit= {this.onSubmit}>
                <h1>Sign In</h1>
                { errors.form && <div className ="alert alert-danger">{errors.div}</div>}
                       
                      
                        <div className="from-group">
                            <label>Email:</label>
                            <input 
                            className="form-control" 
                            type="text" 
                            name="email" 
                            placeholder="Please enter your email"
                            value = {this.state.value}
                            onChange={this.onChange}
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
                                    
                                    onChange={this.onChange}
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

LoginPageApp.propTypes = {
login: React.PropTypes.func.isRequired
}

LoginPageApp.contextTypes = {
    router: React.PropTypes.object.isRequired
}
export default connect(null, { login }) (LoginPageApp);
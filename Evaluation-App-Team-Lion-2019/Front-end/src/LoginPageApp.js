import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
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
        
       
        
<<<<<<< HEAD
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
=======
                
        this.props.login(this.state);
                
           
>>>>>>> master
           
        
        
            this.setState({
                email: "",
                password: ""
            })
            
    }


    
    render() 
    {
        const {errors} = this.state;
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
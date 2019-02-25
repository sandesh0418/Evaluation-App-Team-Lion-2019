import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import Nav from "./components/nav-bar/loginNav";


import { Link } from 'react-router-dom';
class Register extends Component{


    constructor(props){
        super(props);
        this.onChangeCwid=this.onChangeCwid.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
            cwid: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: 'Administrator'
        }
    }

onChangeCwid(e){
    this.setState({
        cwid: e.target.value
    })
}

onChangeFirstName(e){
    this.setState({
        firstName: e.target.value
    })

}


onChangeLastName(e){
    this.setState({
        lastName: e.target.value
    })
}

onChangeEmail(e){
    this.setState({
        email: e.target.value
    })
}

onChangePassword(e){
    this.setState({
        password: e.target.value
    })
}

onChangeRole(e){
    this.setState({
        role: e.target.value
    })
}

onSubmit(e){
    e.preventDefault();

    const obj={
        cwid: this.state.cwid,
        firstName: this.state.firstName,
        lastName:this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role
    }

    axios.post('http://localhost:8000/register',obj)
         .then(res =>{
             if(res.data.status === true){
                    console.log("Submitted");
                    
             }
             else{
                    console.log("something went wrong")
                    console.log(res.data.message);
             }
         })

         this.setState({
            cwid: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: ''
         })

         this.props.history.push('/');

}

render(){

    return(
        <form onSubmit = {this.onSubmit}>
    
    <Nav />

    <div className="form-group" style={{marginTop:50}}>
      <label>CWID</label>
      <input type="number" 
            className="form-control" 
            id="cwid" 
            value={this.state.cwid}
            onChange ={this.onChangeCwid}
            placeholder="Campus Wide ID"
            required/>
    </div>
  
    <div className="form-group">
      <label>First Name</label>
      <input type="text" 
            className="form-control" 
            id="firstName" 
            value={this.state.firstName}
            onChange={this.onChangeFirstName}
            placeholder="First Name"
            required/>
    </div>
    <div className="form-group">
      <label>Last Name</label>
      <input type="text" 
            className="form-control" 
            id="lastName" 
            value={this.state.lastName}
            onChange={this.onChangeLastName}
            placeholder="Last Name"
            required/>
    </div>

    <div className ="form-group">
      <label>Email</label>
      <input type="email" 
            className="form-control" 
            id="email" 
            value={this.state.email}
            onChange={this.onChangeEmail}
            placeholder="Email"
            required/>
    </div>
    <div className="form-group">
      <label>Password</label>
      <input type="password" 
            className="form-control" 
            id="password" 
            value={this.state.password}
            onChange={this.onChangePassword}
            placeholder="Password"
            required/>
    </div>

    <div className ="form-group">
      <label>Role</label>
      <select type ="text"
              className="form-control" 
              value={this.state.role}
              onChange={this.onChangeRole}>
            <option id="role" 
                    value="Administrator"
                    >Administrator</option>     
              
              <option id="role" 
                    value="Evaluator"
                    >Evaluator</option>   
              
              
              
              </select>
      
    </div>
 
 
  
  <div className ="form-group">
  <input type="submit" 
        className="btn btn-primary"
        value ="Submit"
        />
        </div>
</form> 

    
    );
}



}

export default Register;
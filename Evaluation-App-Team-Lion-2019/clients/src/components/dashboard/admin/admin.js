import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCoordinator, viewCoordinator } from '../../../actions/addCoordinator';


class Admin extends Component {

  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state ={
      email: '',
      department: '',
      cwid: '',
      errors: {}

    }
  }

  onChange(e){
    this.setState({[e.target.id]: [e.target.value]})
  }
  onSubmit(e){
    e.preventDefault();

    const obj = {
      email: this.state.email,
      department: this.state.department,
      cwid: this.state.cwid
    }

    this.props.addCoordinator(obj);
    
  }
    render(){

        return (
            <div>
                <span><h2>Add Coordinator</h2></span>
                <Form style={{border: "1px solid grey"}} onSubmit={this.onSubmit}>
                    <div style={{padding: "20px"}}>
                    <div className="input-field col s12">
                  <input
                      onChange={this.onChange}
                      value={this.state.email}
                      
                      id="email"
                      type="email"
                      
                 required/>


                
                <label htmlFor="email">Coordinator's Email</label>
                
              </div>
              <div className="input-field col s12">
                  <input
                      onChange={this.onChange}
                      value={this.state.department}
                      id="department"
                      type="text"
                      required/>
                <label htmlFor="department">Coordinator's Department</label>
                
              </div>
              <div className="input-field col s12">
                  <input
                      onChange={this.onChange}
                      value={this.state.cwid}
                      id="cwid"
                      type="number"
                      required/>
                <label htmlFor="cwid">Coordinator's CWID</label>
                
              </div>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Add Coordinator
                </button>
                </div>
                </div>
                </Form>
               
            </div>
        )
    }

}

Admin.propTypes = {
  addCoordinator: PropTypes.func.isRequired,
  viewCoordinator: PropTypes.func.isRequired,
  coordinator: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  coordinator: state.coordinator
})
export default connect (mapStateToProps, {addCoordinator, viewCoordinator})(Admin);
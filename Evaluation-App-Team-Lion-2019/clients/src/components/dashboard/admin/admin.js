import React, {Component} from 'react';
import { Form } from 'react-bootstrap';

class Admin extends Component {
    render(){

        return (
            <div>
                <span><h2>Add Coordinator</h2></span>
                <Form style={{border: "1px solid grey"}}>
                    <div style={{padding: "20px"}}>
                    <label>Coordinator's Email</label>
                    <input type= "text" />
                    <label>Coordinator's Department</label>
                    <input type= "text" />
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

export default Admin;
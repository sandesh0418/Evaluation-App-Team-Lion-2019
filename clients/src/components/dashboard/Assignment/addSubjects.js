import React, {Component} from 'react';
import axios from "axios";

/**
 * props:
 *      assignmentId: the assignment to add the subjects to.
 */


function ManualStudentEntry(props)
{
    return props.formData.map((d, index) => {
        return (
            <div key={index} className="row">
                <div className="col-5">
                    <span>Full Name:</span>
                    <input 
                        className="form-control" 
                        id={index}
                        name="subjectName" 
                        value={props.formData[index].subjectName}
                        onChange={props.onChange} 
                        type="text" 
                        required
                    />
                </div>
                <div className="col-5">
                    <span>Unique Identifier:</span>
                    <input 
                        className="form-control" 
                        id={index}
                        name="subjectId" 
                        value={props.formData[index].subjectId}
                        onChange={props.onChange} 
                        type="text" 
                        required
                    />
                </div>
            </div>
        )
    })
}

function manualStudentEntryToString(list)
{
    let studentList = "";

    for(let i = 0; i < list.length; i++)
    {
        if (i === list.length - 1)
        {
            studentList += list[i].subjectName + "," + list[i].subjectId;
        }
        else
        {
            studentList += list[i].subjectName + "," + list[i].subjectId + "\n";
        }
    }

    return studentList;
}

export default class CreateAssignment extends Component
{
    constructor(props)
    {
        super(props);
        this.updateManualStudentEntry = this.updateManualStudentEntry.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.changeFile = this.changeFile.bind(this);
        this.fileInput = React.createRef();
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            assignmentId: props.assignmentId,
            showFileAlert: false,
            showAddButton: false,
            manualStudentEntry: []
        }
    }

    changeFile(e)
    {
        if (!(this.fileInput.current.files[0].type === "text/csv"))
        {
            this.setState({
                showFileAlert: true
            })
        }
        else
        {
            this.setState({
                showFileAlert: false,
                showAddButton: true
            })
        }
    }

    updateManualStudentEntry(e)
    {
        let index = e.target.id;
        let tempManualEntry = this.state.manualStudentEntry;

        if(e.target.name === "subjectName")
        {
            tempManualEntry[index].subjectName = e.target.value
        }
        else if (e.target.name === "subjectId")
        {
            tempManualEntry[index].subjectId = e.target.value
        }

        this.setState({
            manualStudentEntry: tempManualEntry
        })
    }

    addStudent(e)
    {
        let tempManualEntry = this.state.manualStudentEntry;
        tempManualEntry.push({
            subjectName: '',
            subjectId: ''
        })

        this.setState({
            manualStudentEntry: tempManualEntry,
            showAddButton: true
        })
    }

    onSubmit(e)
    {
        e.preventDefault();

        if (this.fileInput.current.files[0])
        {
            let fileReader = new FileReader();
            fileReader.onloadend = e => {

                let subjectList = {
                    assignmentId: this.state.assignmentId,
                    subjectList: fileReader.result
                }
                
                axios.post('/api/assignments/addSubjects', subjectList)
                    .then(res =>  {
                        if (res.data.status)
                        {
                            alert(res.data.message);
                            window.location.reload();
                        }
                    });
            }
            fileReader.readAsText(this.fileInput.current.files[0]);
        }
        else
        {
            let subjectList = {
                assignmentId: this.state.assignmentId,
                subjectList: "Name,ID\n" + manualStudentEntryToString(this.state.manualStudentEntry)
            }

            axios.post('/api/assignments/addSubjects', subjectList)
                .then(res =>  {
                    if (res.data.status)
                    {
                        alert(res.data.message);
                        window.location.reload();
                    }
                });
        }
    }

    render()
    {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Add additional subjects from .csv file: </label>
                  <input type="file" className="form-control-file" style={{marginLeft: "20%"}}ref={this.fileInput} onChange={this.changeFile}/>
                </div>
                <div className="form-group">
                    <ManualStudentEntry formData={this.state.manualStudentEntry} onChange={this.updateManualStudentEntry} />
                </div>
                <div>
                    <button className="btn btn-secondary mb-4" type="button" 
                    onClick={this.addStudent}>Add Subject Manually</button>
                </div>
                {this.state.showAddButton ? 
                    <input 
                        className="btn btn-sm btn-success" 
                        type="submit" 
                        value="Save New Subjects"
                    /> 
                    : null}
            </form>
        )
    }
}
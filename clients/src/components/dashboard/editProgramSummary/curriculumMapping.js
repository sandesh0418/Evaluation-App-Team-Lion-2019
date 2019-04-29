import React, {Component} from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';


function SelectCourse(props)
{
    let allIds = props.curriculumList.map(c => {
        return c.courseId;
    })

    let usedIds = props.courses.map(c => {
        return c.courseId;
    })

    let selectableIds = allIds.filter(c => {
        return !usedIds.includes(c);
    })

    let selectableCourses = props.curriculumList.filter(c => {
        return selectableIds.includes(c.courseId);
    })
    
    return selectableCourses.map(c => {
        return <option value={c.courseId}>{c.departmentCode + " " + c.courseCode + " " + c.name}</option>
    })
}

export default class OutcomeCurriculum extends Component
{
    constructor(props)
    {
        super(props);
        this.handleRelevantHoursChange = this.handleRelevantHoursChange.bind(this);
        this.deleteCourseMapping = this.deleteCourseMapping.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addCourse = this.addCourse.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            courses: this.props.courses,
            outcomeId: this.props.outcomeId,
            curriculumList: this.props.curriculumList,
            usableList: this.props.curriculumList,
            deletedCourseIds: [],
            chosenCourseId: "placeholder"
        }
    }

    handleRelevantHoursChange(e)
    {
        let tempCourses = this.state.courses;
        let courseIndex = tempCourses.findIndex(c => c.courseId === e.target.id);
        tempCourses[courseIndex].relevantHours = e.target.value;

        this.setState({
            courses: tempCourses
        })
    }

    deleteCourseMapping(e)
    {
        let tempCourses = this.state.courses;
        let courseIndex = tempCourses.findIndex(c => c.courseId === e.target.id);
        tempCourses.splice(courseIndex, 1);

        let tempDeletedCourseIds = this.state.deletedCourseIds;
        tempDeletedCourseIds.push(e.target.id);

        this.setState({
            courses: tempCourses,
            deletedCourseIds: tempDeletedCourseIds
        })
    }

    handleInputChange(e)
    {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addCourse(e)
    {
        if (this.state.chosenCourseId !== "placeholder")
        {
            let tempCourses = this.state.courses;
            let course = this.state.curriculumList.find(c => c.courseId === this.state.chosenCourseId)
           
            tempCourses.push({
                departmentCode: course.departmentCode,
                courseCode: course.courseCode,
                name: course.name,
                relevantHours: 0,
                courseId: course.courseId
            })

            this.setState({
                courses: tempCourses,
                chosenCourseId: "placeholder"
            })
        }
    }

    onSubmit(e)
    {
        e.preventDefault();

        this.props.changeCurriculum(this.state.courses, this.state.deletedCourseIds, this.state.outcomeId);
    }

    render()
    {
        let outcomeCourses;
        
        if (this.state.courses && this.state.courses.length > 0)
        {
            outcomeCourses = this.state.courses.map((c, i) => {
                return (
                    <div key={i} className="row">
                        <div className="col-3">
                            {c.departmentCode + " " + c.courseCode + " " + c.name}
                        </div>
                        <div className="col-2">
                            <input type="number" min="0" max="99" value={c.relevantHours}
                                id={c.courseId} onChange={this.handleRelevantHoursChange}
                                title="Enter the number of hours in this course relevant to this outcome." />
                        </div>
                        <div className="col">
                            <button type="button" className="btn btn-danger" onClick={this.deleteCourseMapping}
                                id={c.courseId}>
                                Delete Element
                            </button>
                        </div>
                    </div>
                )
            })
        }
    
        return (
            <div className="mt-3">
                <form onSubmit={this.onSubmit}>
                    {outcomeCourses}
                    <label>Add Another Course</label>
                    <select className="form-control mb-2" name="chosenCourseId" onClick={this.handleInputChange} 
                        onChange={this.handleInputChange} value={this.state.chosenCourseId}>
                        <option value="placeholder">Select a course</option>
                        <SelectCourse 
                            curriculumList={this.state.curriculumList}
                            courses={this.state.courses} />
                    </select>
                    <button type="button" className="btn btn-primary mr-3" onClick={this.addCourse}>Add Course</button>
                    <input className="btn btn-success" type="submit" value="Save" />
                </form>
            </div>
        )
    }
}
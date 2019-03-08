import axios from "axios";
import { GET_ERRORS } from "./types";


export const RegisterAction = obj => dispatch =>{
    axios.post('http://localhost:8000/api/register', obj)
        .then(res=>
            window.location.assign('/')
        )
        .catch(err=>{
            dispatch({
                type:GET_ERRORS,
                payload: err.res.data
            })
        })
} 
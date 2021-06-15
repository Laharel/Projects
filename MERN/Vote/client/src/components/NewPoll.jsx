import React,{useState} from 'react';
import {Link, navigate} from '@reach/router'
import axios from 'axios'
import Form from './Form';

const NewPoll=()=>{
    const[errors,SetErrors] = useState([]);
    const submit = (e,data) => {
        
        e.preventDefault();
        axios.post(`http://localhost:8000/api/polls`,data)
        .then(res => {
            navigate(`/`)
        })
        .catch(err=>{
            console.log(err);
            const eres=err.response.data.errors;
            const earr=[];
            for (const key of Object.keys(eres)) {
                earr.push(eres[key].message);
            }
            SetErrors(earr);
        })
    };
    return(
        <div>
            <Link to="/" >Back to Home</Link>
            {errors.map((error,idx)=>{
                return(
                    <p key={idx}>{error}</p>
                )
            })}
            < Form submit={submit}/>
        </div>
    )
}
export default NewPoll;
import React,{useState} from 'react';
import PetsForm from './PetsForm';
import {Link,navigate} from '@reach/router'
import axios from 'axios'

const NewPet =()=>{
    const[errors,SetErrors] = useState([]);
    const submit=(e,data)=>{
        e.preventDefault();
        axios.post(`http://localhost:8000/api/pets`,data)
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
    }
    return(
        <div>
            <h1>This is for adding a New one</h1>
            <Link to="/" ><h3>Back to home</h3></Link>
            {errors.map((error,idx)=>{
                return(
                    <p key={idx}>{error}</p>
                )
            })}
            <PetsForm 
            submit={submit} route="new"
            iname=""
            itype=""
            idesc=""
            is1=""
            is2="" 
            is3="" />
        </div>
    )
}
export default NewPet;
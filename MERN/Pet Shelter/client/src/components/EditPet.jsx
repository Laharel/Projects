import React,{useState,useEffect} from 'react';
import PetsForm from './PetsForm';
import {navigate,Link} from '@reach/router'
import axios from 'axios'

const EditPet =({id,})=>{
    const [pet, setPet] = useState([]);
    const [load,setLoad] = useState(false);
    const[errors,SetErrors] = useState([]);
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/pets/${id}`)
            .then(res => {
                setPet(res.data)
                setLoad(true)
            })
            .catch(err => console.log(err))
    }, [id,setPet])
    const submit=(e,data)=>{
        e.preventDefault()
        axios.put(`http://localhost:8000/api/pets/${id}/edit`,data)
        .then(res => {
            navigate(`/`);
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
            <h1>Editing here {pet.name} </h1>
            <Link to="/" ><h3>Back to home</h3></Link>
            {errors.map((error,idx)=>{
                return(
                    <p key={idx}>{error}</p>
                )
            })}
            {load && <PetsForm 
            submit={submit} route="update"
            iname={pet.name}
            itype={pet.type}
            idesc={pet.description}
            is1={pet.skill1} 
            is2={pet.skill2} 
            is3={pet.skill3} />}
        </div>
    )
}
export default EditPet;
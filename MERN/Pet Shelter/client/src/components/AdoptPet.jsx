import React from 'react';
import axios from 'axios'
import {navigate} from '@reach/router'

const AdoptPet =({id})=>{
    const click=(e)=>{
        e.preventDefault()
        axios.delete(`http://localhost:8000/api/pets/${id}`)
        .then(res => {
            console.log(res);
            navigate(`/`);
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return(
        <button onClick={click}>Adopt </button>
    )
}
export default AdoptPet;
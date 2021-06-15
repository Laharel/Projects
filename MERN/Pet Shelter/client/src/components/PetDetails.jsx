import React,{useState, useEffect} from 'react';
import {Link} from '@reach/router'
import axios from 'axios'
import AdoptPet from './AdoptPet';
import PetLikes from './PetLikes';

const PetDetails =({id})=>{
    
    const [pet, setPet] = useState([]);
    const [hide,setHide] = useState(true);
    const click =(e)=>{
        axios.put(`http://localhost:8000/api/pets/${id}/edit`,{likes:pet.likes+1})
        .then(res => {
            setHide(false);
            setPet({...pet, likes:pet.likes+1});
        })
    }
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/pets/${id}`)
            .then(res => setPet(res.data))
            .catch(err => console.log(err))
    }, [id])
    return(
        <div>
            <Link to="/" ><h3>Back to home</h3></Link>
            <h1>Details about {pet.name}</h1>
            <AdoptPet id={id} />
            <h3>Type: {pet.type}</h3>
            <h3>Description: {pet.description}</h3>
            <h3><ul>Skills:
                <li>{pet.skill1}</li>
                <li>{pet.skill2}</li>
                <li>{pet.skill3}</li>
                </ul></h3>
                <h3><PetLikes pet={pet} hide={hide} click={click} />{pet.likes} like(s)</h3>
        </div>
    )
}
export default PetDetails;
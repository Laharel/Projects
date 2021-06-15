import React,{useState} from 'react';
import EditPet from './EditPet';
import PetsList from './PetsList';
import NewPet from './NewPet';
import PetDetails from './PetDetails';
import {Router} from '@reach/router'

const Main =()=>{
    const [pets, setPets] = useState([{
        name: "",
        type: "",
        description: "",
        skill1:"",
        skill2:"",
        skill3:"",
        likes:0
    }])
    return(
        <div>
            <h1>Pet Shelter</h1>
            < Router >
            <PetsList path="/" pets={pets} setPets={setPets} />
            <PetDetails path="/pets/:id" />
            <NewPet path="/pets/new" />
            <EditPet path="/pets/:id/edit" pets={pets} setPets={setPets} />
            </Router>
        </div>
    )
}
export default Main;
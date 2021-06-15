import React,{useEffect} from 'react';
import {Link} from '@reach/router'
import axios from 'axios'

const PetsList =({pets, setPets})=>{

    useEffect(()=>{
        axios.get("http://localhost:8000/api/pets")
            .then(res => setPets(res.data))
            .catch(err => console.log(err))
    }, [setPets])
    return(
        <div>
            <Link to="/pets/new" ><h3>Add a new pet</h3></Link>
            <table>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>Type</td>
                        <td>Actions</td>
                    </tr>
                {
                    pets.map((pet, idx)=>{
                        return(
                            <tr key={idx}>
                                <td>
                                    {pet.name}
                                </td>
                                <td>
                                    {pet.type}
                                </td>
                                <td><Link to={'/pets/'+pet._id}>Details</Link>|<Link to={'/pets/'+pet._id+'/edit'} >Edit</Link></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}
export default PetsList;
import React from 'react';

const PetLikes=({pet,hide,click})=>{

    return(
    <div>
        {hide && <button  onClick={click}>Like {pet.name}</button>}
    </div>
        
    )
}
export default PetLikes;
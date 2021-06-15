import React,{useState} from 'react';

const PetsForm =({submit, route,iname,itype,idesc,is1,is2,is3})=>{
    const [name, setName]=useState(iname);
    const [type, setType]=useState(itype);
    const [description, setDescription]=useState(idesc);
    const [skill1, setSkill1]=useState(is1);
    const [skill2, setSkill2]=useState(is2);
    const [skill3, setSkill3]=useState(is3);
    let atext ="";
    if (route === "update") {
        atext ="Edit Pet";
    }else{
        atext ="Add Pet";
    }
    return(
        <div>
            <form onSubmit={e=> {submit(e,{name,type,description,skill1,skill2,skill3})}}>
            <div>
                    <label htmlFor="">Name:</label>
                    <input type="text" value={name} onChange={e =>{setName(e.target.value)}} /><br />
                    <label htmlFor="">Type:</label>
                    <input type="text" value={type} onChange={e =>{setType(e.target.value)}} /><br />
                    <label htmlFor="">Description:</label>
                    <input type="text" value={description} onChange={e =>{setDescription(e.target.value)}} /><br />
                </div>                
                <div>
                    <label htmlFor="">Skill 1:</label>
                    <input type="text" value={skill1} onChange={e =>{setSkill1(e.target.value)}} /><br />
                    <label htmlFor="">Skill 2:</label>
                    <input type="text" value={skill2} onChange={e =>{setSkill2(e.target.value)}} /><br />
                    <label htmlFor="">Skill 3:</label>
                    <input type="text" value={skill3} onChange={e =>{setSkill3(e.target.value)}} /><br />
                </div>
                <button type="submit">{atext}</button>
            </form>
        </div>
    )
}
export default PetsForm;
import React,{useState} from 'react';

const Form=({submit})=>{
    const [question,setQuestion] = useState("");
    const [option1,setOption1] = useState("");
    const [option2,setOption2] = useState("");
    const [option3,setOption3] = useState("");
    const [option4,setOption4] = useState("");
    return(
        <div>
            <form onSubmit={ e=> {submit(e,{question,option1,option2,option3,option4})} }>
            <div>
                <label>Your question: </label>
                <input type="text" name="question" onChange={ (e) => setQuestion(e.target.value) } />
            </div>
            <div>
                <label>Option 1: </label>
                <input type="text" name="option1" onChange={ (e) => setOption1(e.target.value) } />
            </div>
            <div>
                <label>Option 2: </label> 
                <input type="text"  name="option2" onChange={ (e) => setOption2(e.target.value) } />
            </div>
            <div>
                <label>Option 3: </label>
                <input type="text" onChange={ (e) => setOption3(e.target.value) } />
            </div>
            <div>
                <label>Option 4: </label>
                <input type="text" onChange={ (e) => setOption4(e.target.value) } />
            </div>
            <input type="submit" value="Submit Poll" /> 
            </form>
        </div>
    )
}
export default Form;
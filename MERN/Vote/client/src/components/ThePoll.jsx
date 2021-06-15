import React from 'react';
import axios from 'axios'

const ThePoll=({id,poll,setHide,setPoll})=>{
    const click1 =(e)=>{
        setHide(true);
            axios.put(`http://localhost:8000/api/polls/${id}`,{option1n:poll.option1n+1,sum:poll.sum+1})
                .then(res => {
                setPoll({...poll, option1n:poll.option1n+1});
        })
    }
    const click2 =(e)=>{
        setHide(true);
            axios.put(`http://localhost:8000/api/polls/${id}`,{option2n:poll.option2n+1,sum:poll.sum+1})
                .then(res => {
                setPoll({...poll, option2n:poll.option2n+1});
        })
    }
    const click3 =(e)=>{
        setHide(true);
            axios.put(`http://localhost:8000/api/polls/${id}`,{option3n:poll.option3n+1,sum:poll.sum+1})
                .then(res => {
                setPoll({...poll, option3n:poll.option3n+1});
        })
    }
    const click4 =(e)=>{
        setHide(true);
            axios.put(`http://localhost:8000/api/polls/${id}`,{option4n:poll.option4n+1,sum:poll.sum+1})
                .then(res => {
                setPoll({...poll, option4n:poll.option4n+1});
        })
    }

    return(
        <div>
            <h1>{poll.question}</h1>
            <h3> {poll.option1} 
                <div>
                    <button onClick={click1}>{poll.option1}</button>
                </div>
            </h3>
            <h3>{poll.option2} 
                <div>
                    <button onClick={click2}>{poll.option2}</button>
                </div>
            </h3>
            {poll.option3?<h3>{poll.option3} 
                <div>
                    <button onClick={click3}>{poll.option3}</button>
                </div>
            </h3>:<p></p>}
            {poll.option4?<h3>{poll.option4} 
                <div>
                    <button onClick={click4}>{poll.option4}</button>
                </div>
            </h3>: <p></p> }
        </div>
    )
}
export default ThePoll;
import React,{useState,useEffect} from 'react';
import axios from 'axios'
import AfterPoll from './AfterPoll'
import ThePoll from './ThePoll'

const Poll=({id})=>{
    const [poll, setPoll] = useState([]);
    const[hide,setHide] = useState (false)
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/polls/${id}`)
            .then(res => setPoll(res.data))
            .catch(err => console.log(err))
    }, [id])

    return(
        <div>
            {hide && <AfterPoll poll={poll} /> } 
            {!hide && <ThePoll setHide={setHide} poll={poll} id={id} setPoll={setPoll} />}
        </div>
    )
}
export default Poll;
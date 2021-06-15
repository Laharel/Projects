import React,{useEffect} from 'react';
import axios from 'axios'
import { navigate } from '@reach/router';
import Moment from 'react-moment';

const PollList=({polls,setPolls})=>{
    useEffect(()=>{
        axios.get("http://localhost:8000/api/polls")
            .then(res => setPolls(res.data))
            .catch(err => console.log(err))
    }, [setPolls])
    return(
        <div> 
            <h1>Recent Polls</h1>            
                {polls.map((poll, idx)=>{
                    return(
                        <div key={idx}>
                            <button onClick={e=> navigate(`/polls/${poll._id}`)}>
                                    <h2>{poll.question} </h2>
                                    {poll.option4 && poll.option3 ?<p>{poll.option1}:{poll.option1n} {poll.option2}:{poll.option2n} {poll.option3}:{poll.option3n} {poll.option4}:{poll.option4n}</p>:poll.option3 ?<p>{poll.option1}:{poll.option1n} {poll.option2}:{poll.option2n} {poll.option3}:{poll.option3n}</p>:poll.option4 ?<p>{poll.option1}:{poll.option1n} {poll.option2}:{poll.option2n} {poll.option4}:{poll.option4n}</p>: <p>{poll.option1}:{poll.option1n} {poll.option2}:{poll.option2n}</p>}
                                    <Moment fromNow>{poll.createdAt}</Moment>
                            </button>
                        </div>
                    )})}      
        </div>
    )
}
export default PollList;
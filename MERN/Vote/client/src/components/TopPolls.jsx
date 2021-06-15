import React,{useState,useEffect} from 'react';
import {Link,navigate} from '@reach/router'
import axios from 'axios';
import Moment from 'react-moment';
import PollList from './PollList'

const TopPoll=()=>{
    const [polls, setPolls] = useState([{
        question:"",
        option1:"",
        option2:"",
        option3:"",
        option4:"",
        option1n:0,
        option2n:0,
        option3n:0,
        option4n:0,
    }]);
    const [tpolls,setTpolls] = useState(polls);
    useEffect(()=>{
        axios.get("http://localhost:8000/api/votes")
            .then(res => setTpolls(res.data))
            .catch(err => console.log(err))
    }, [])
    // poll.createdAt
    const style={
        display:'flex',
        justifyContent:'space-between',
    }
    return(
        <div>
            <Link to="/polls/new" ><button>Create your own Poll</button></Link>
            <div style={style}>
                <div >
                    <h1>Top 3 Polls</h1>
                    {tpolls.map((poll, idx)=>{
                    return(
                        <div key={idx}>
                            <button onClick={e=> navigate(`/polls/${poll._id}`)}>
                                    <h2>{poll.question} </h2>
                                    {poll.option4 && poll.option3 ?<p>{poll.option1}:{poll.option1n} {poll.option2}:{poll.option2n} {poll.option3}:{poll.option3n} {poll.option4}:{poll.option4n} </p>:poll.option3 ?<p>{poll.option1}:{poll.option1n} {poll.option2}:{poll.option2n} {poll.option3}:{poll.option3n} </p>:poll.option4  ?<p>{poll.option1}:{poll.option1n} {poll.option2}:{poll.option2n} {poll.option4}:{poll.option4n} </p>:<p>{poll.option1}:{poll.option1n} {poll.option2}:{poll.option2n} </p>}
                                    <Moment fromNow>{poll.createdAt}</Moment>
                            </button>
                        </div>
                    )})}    
                </div>
                <div >
                    <PollList polls={polls} setPolls={setPolls} />
                </div>
            </div>

        </div>
    )
}
export default TopPoll;
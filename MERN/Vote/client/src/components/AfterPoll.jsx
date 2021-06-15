import React from 'react';
import {Link} from '@reach/router'

const AfterPoll=({poll})=>{
    return(
        <div>
            <Link to="/" >Back to Home</Link>
            <p>Thanks for voting here are the results</p>
            <h1>{poll.question}</h1>
            <h3>{poll.option1}       {poll.option1n} votes</h3>
            <h3>{poll.option2}      {poll.option2n} votes</h3>
            {poll.option3?<h3>{poll.option3}      {poll.option3n} votes</h3>:<p></p>}
            {poll.option4?<h3>{poll.option4}      {poll.option4n} votes</h3>:<p></p>}
        </div>
    )
}
export default AfterPoll;
import React from 'react';
import {Router} from '@reach/router';
import NewPoll from './NewPoll'
import Poll from './Poll'
import TopPolls from './TopPolls'

const Main=()=>{
    const style={
        margin:'20px'
    }
    return(
        <div style={style} >
            <h1>Voting Dojo</h1>
            <Router>
                < TopPolls path="/" />
                < NewPoll path="/polls/new" />
                < Poll path="/polls/:id" />
            </Router>
        </div>
    )
}
export default Main;
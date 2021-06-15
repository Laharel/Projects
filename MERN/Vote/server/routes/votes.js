const VoteController = require("../controllers/vote")
module.exports = (app) => {
    app.get('/api/polls', VoteController.allVotes);
    app.post('/api/polls', VoteController.newVote);
    app.get('/api/polls/:id', VoteController.oneVote);
    app.put('/api/polls/:id', VoteController.editVote);
    app.get('/api/votes', VoteController.topVotes);
}

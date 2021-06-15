const {Vote} = require('../models/Vote');

module.exports = {
    oneVote: (req, res) => {
        Vote.findById({_id: req.params.id})
        .then( vote => res.json(vote))
        .catch( err => res.status(400).json(err))
    },
    allVotes: (req, res) => {
        Vote.find({}).sort({createdAt: -1})
            .then( Votes => res.json(Votes))
            .catch( err => res.status(400).json(err))
            
    },
    topVotes: (req, res) => {
        Vote.find().sort({sum:-1}).limit(3)
            .then( Votes => res.json(Votes))
            .catch( err => res.status(400).json(err))
    },
    newVote: (req, res) => {
        Vote.create(req.body)
        .then( Vote => res.json(Vote))
        .catch( err => res.status(400).json(err))
    },
    editVote: (req, res) => {
        Vote.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true, context: 'query'})
            .then( editedVote => res.json(editedVote))
            .catch( err => res.status(400).json(err))
    },
}
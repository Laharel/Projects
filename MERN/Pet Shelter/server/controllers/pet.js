const {Pet} = require('../models/Pet');

module.exports = {
    onePet: (req, res) => {
        Pet.findById({_id: req.params.id})
        .then( Pet => res.json(Pet))
        .catch( err => res.status(400).json(err))
    },
    allPets: (req, res) => {
        Pet.find({}).sort('type')
            .then( Pets => res.json(Pets))
            .catch( err => res.status(400).json(err))
            
    },
    newPet: (req, res) => {
        Pet.create(req.body)
        .then( pet => res.json(pet))
        .catch( err => res.status(400).json(err))
    },
    editPet: (req, res) => {
        Pet.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true, context: 'query'})
            .then( editedPet => res.json(editedPet))
            .catch( err => res.status(400).json(err))
    },
    deletePet: (req, res) => {
        Pet.findByIdAndRemove({ _id: req.params.id})
            .then(delConfirm => res.json(delConfirm))
            .catch( err => res.status(400).json(err))
    },
}
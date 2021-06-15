const PetController = require("../controllers/pet")
module.exports = (app) => {
    app.get('/api/pets', PetController.allPets);
    app.post('/api/pets', PetController.newPet);
    app.get('/api/pets/:id', PetController.onePet);
    app.put('/api/pets/:id/edit', PetController.editPet);
    app.delete('/api/pets/:id', PetController.deletePet);
}

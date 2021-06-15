const express = require("express")
const app = express()
const port = 8000;
require("./config/config")
const cors = require("cors")
app.use(cors())
app.use(express.json(), express.urlencoded({extended: true}) )
require("./routes/pets")(app);
app.listen(port, () => console.log("Server is connected on port " + port) )

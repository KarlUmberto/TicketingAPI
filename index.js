const express = require("express")
const app = express()
const port = 8080
const swaggerUi = require("swagger-ui-express")
const venues = require("./venues/data")
const yamljs = require("yamljs")
const swaggerDocument = yamljs.load("./docs/swagger.yaml");

app.use(express.json())

app.get("/venues", (req, res) => {
    res.send(venues.getAll())
})

app.get("/venues/:id", (req, res) => {
    res.send(venues.getById(req.params.id))
})

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);
})

app.post("/venues", (req, res) => {
    if (!req.body.name || !req.body.location || !req.body.capacity) {
        return res.status(400).send({ error: "One or all required parameters are missing." })
    }
    const createdVenue = venues.create({
        name: req.body.name,
        location: req.body.location,
        capacity: req.body.capacity
    })
    res.status(201)
        .location(`${getBaseurl(req)}/venues/${createdVenue.id}`)
        .send(createdVenue)
})
function getBaseurl (request){
    return (request.connection && request.connection.encrypted ? "https" : "http") 
            + "://" + request.headers.host
}
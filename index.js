const app = require("express")()
const port = 8080
const swaggerUi = require("swagger-ui-express")
const venues = require("./venues/data")
const yamljs = require("yamljs")
const swaggerDocument = yamljs.load("./docs/swagger.yaml");

app.get("/venues", (req, res) => {
    res.send(venues.getAll())
})

app.get("/venues/:id" , (req, res) => {
    res.send(venues.getById(req.params.id))
})

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);
})
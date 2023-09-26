const app = require("express")()
const port = 8080
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./docs/swagger.json");
const venues = require("./venues/data")

app.get("/venues", (req, res) => {
    res.send(venues.getAll())
})



app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);
})
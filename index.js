const app = require("express")()
const port = 8080
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./docs/swagger.json");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get("/events", (req, res) => {
    res.send([
        {id: 1, name: "VOLT presents: BOU"},
        {id: 1, name: "Alchemist"}
    ])
})

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);
})
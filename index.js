const app = require("express")()
const port = 8080
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./docs/swagger.json");
const games = require(".events/data")

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))



app.get("/events", (req, res) => {
    res.send(events.getAll())
})

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);
})
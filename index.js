const app = require("express")()
const port = 8080
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./docs/swagger.json");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const events = [
    {id: 1, name: "VOLT presents: BOU",},
        {id: 1, name: "Alchemist"},
    "Project X",
    "event4",
    "event5",
    "event6",
    "event7",
    "event8"
]



app.get("/events", (req, res) => {
    res.send([
        
    ])
})

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);
})
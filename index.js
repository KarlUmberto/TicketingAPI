const app = require("express")()
const port = 8080
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./docs/swagger.json");

app.get("/venues", (req, res) => {
    res.send ([
        {id:1,name:"D3"},
        {id:2,name:"Lauluväljak"}])
})

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);
})
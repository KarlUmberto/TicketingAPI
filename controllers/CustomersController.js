const { db } = require("../db");
const customers = db.customers;
const { getBaseurl } = require("./helpers");

// CREATE
exports.createNew = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.TicketId ) {
        return res.status(400).send({ error: "One or all required parameters are missing" });
    }

    const createdCustomer = await customers.create(req.body, {
        fields: ["name", "email", "TicketId"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/customers/${createdCustomer.id}`)
        .json(createdCustomer)
}

// READ
exports.getAll = async (req, res) => {
    const result = await customers.findAll({ 
        include: [db.tickets]
    })
    res.json(result)
}

exports.getById = async (req, res) => {
    const foundCustomer = await customers.findByPk(req.params.id,{
        include: [db.tickets]
    })
    if (foundCustomer === null) {
        return res.status(404).send({ error: 'Customer not found`'})
    }
    res.send(foundCustomer)
}
// UPDATE
exports.editById = async (req, res) => {
    console.log("Update: ", req.params, req.body)
    const updateResult = await customers.update({ ...req.body}, {
        where: {id:req.body.id},
        fields: ["price", "purchaseDate", "TicketId"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ error: "Customer not found" })
    }

    res.status(200)
        .location(`${getBaseurl(req)}/customers/${req.params.id}`)
        .send()
}

// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await customers.destroy({
        where: {id: req.params.id } 
    })

    if (deletedAmount === 0) {
        return res.status(404).send({ error: "Customer not found"})
    }

    res.status(204).send()
}

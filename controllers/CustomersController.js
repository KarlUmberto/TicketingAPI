const { db } = require("../db")
const customers = db.customers
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = async (req, res) => {
    if (!req.body.name || !req.body.email) {
        return res.status(400).send({ error: "One or all required parameters are missing" })
    }
    const createdCustomer = await customers.create(req.body, {
        fields: ["name", "email"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/customers/${createdCustomer.id}`)
        .json(createdCustomer)
}

// READ
exports.getAll = async (req, res) => {
    const result = await customers.findAll({ attributes: ["id", "name", "email"] })
    res.json(result)
}
exports.getById = async (req, res) => {
    const foundCustomer = await customers.findByPk(req.params.id)
    if (foundCustomer === null) {
        return res.status(404).send({ error: `Customer not found` })
    }
    res.json(foundCustomer)
}
// UPDATE
exports.editById = async (req, res) => {
    const updateResult = await customers.update({ ...req.body }, {
        where: { id: req.params.id },
        fields: ["name", "email"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ error: "Customer not found" })
    }
    res.status(204)
        .location(`${getBaseurl(req)}/customers/${req.params.id}`)
        .send()
}
// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await customers.destroy({
        where: { id: req.params.id }
    })
    if (deletedAmount === 0) {
        return res.status(404).send({ error: "Customer not found" })
    }
    res.status(204).send()
}
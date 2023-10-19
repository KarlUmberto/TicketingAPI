const { db } = require("../db")
const tickets = db.tickets
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = async (req, res) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ error: "One or all required parameters are missing" })
    }
    const createdTicket = await tickets.create(req.body, {
        fields: ["price", "purchaseDate"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/tickets/${createdTicket.id}`)
        .json(createdGame)
}
// READ
exports.getAll = async (req, res) => {
    const result = await tickets.findAll({
        include: [db.events, db.customers]
    })
    res.json(result)
}
exports.getById = async (req, res) => {
    const foundTicket = await tickets.findByPk(req.params.id)
    if (foundTicket === null) {
        return res.status(404).send({ error: `Ticket not found` })
    }
    res.json(foundTicket)
}
// UPDATE
exports.editById = async (req, res) => {
    const updateResult = await tickets.update({ ...req.body }, {
        where: { id: req.params.id },
        fields: ["price", "purchaseDate"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ error: "Tickets not found" })
    }
    res.status(204)
        .location(`${getBaseurl(req)}/tickets/${req.params.id}`)
        .send()
}
// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await tickets.destroy({
        where: { id: req.params.id }
    })
    if (deletedAmount === 0) {
        return res.status(404).send({ error: "Ticket not found" })
    }
    res.status(204).send()
}
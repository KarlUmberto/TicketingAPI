const { db } = require("../db")
const events = db.events
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = async (req, res) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ error: "One or all required parameters are missing" })
    }
    const createdEvent = await events.create(req.body, {
        fields: ["name", "description", "startDate", "endDate"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/games/${createdEvent.id}`)
        .json(createdEvent)
}

// READ
exports.getAll = async (req, res) => {
    const result = await events.findAll({ attributes: ["id", "name"] })
    res.json(result)
}
exports.getById = async (req, res) => {
    const foundEvent = await events.findByPk(req.params.id)
    if (foundEvent === null) {
        return res.status(404).send({ error: `Event not found` })
    }
    res.json(foundEvent)
}
// UPDATE
exports.editById = async (req, res) => {
    const updateResult = await events.update({ ...req.body }, {
        where: { id: req.params.id },
        fields: ["name", "description", "startDate", "endDate"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ error: "Event not found" })
    }
    res.status(204)
        .location(`${getBaseurl(req)}/events/${req.params.id}`)
        .send()
}
// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await events.destroy({
        where: { id: req.params.id }
    })
    if (deletedAmount === 0) {
        return res.status(404).send({ error: "Event not found" })
    }
    res.status(204).send()
}
const { db } = require("../db")
const players = db.players
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ error: "Required parameters are missing" })
    }
    const createdVenue = await venues.create({ ...req.body }, {
        fields: ["name", "loaction", "capacity"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/venues/${createdVenue.id}`)
        .send(createdVenue)
}
// READ
exports.getAll = async (req, res) => {
    const result = await venues.findAll({ attributes: ["id", "name"] })
    res.json(result)
}
exports.getById = async (req, res) => {
    const foundVenue = await venues.findByPk(req.params.id)
    if (foundVenue === null) {
        return res.status(404).send({ error: `Venue not found` })
    }
    res.json(foundVenue)
}
// UPDATE
exports.editById = async (req, res) => {
    const updateResult = await venues.update({ ...req.body }, {
        where: { id: req.params.id },
        fields: ["name", "loaction", "capacity"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ error: "Venues not found" })
    }
    res.status(202)
        .location(`${getBaseurl(req)}/venues/${req.params.id}`)
        .send()
}
// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await venues.destroy({
        where: { id: req.params.id }
    })
    if (deletedAmount === 0) {
        return res.status(404).send({ error: "Venue not found" })
    }
    res.status(204).send()
}
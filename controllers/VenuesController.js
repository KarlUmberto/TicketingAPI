const venues = require("../venues/data")
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ error: "Required parameter 'name' is missing" })
    }
    const createdVenue = venues.create({
        name: req.body.name
    })
    res.status(201)
        .location(`${getBaseurl(req)}/venues/${createdVenue.id}`)
        .send(createdVenue)
}
// READ
exports.getAll = (req, res) => {
    res.send(venues.getAll())
}
exports.getById = (req, res) => {
    const foundVenue = venues.getById(req.params.id)
    if (foundVenue === undefined) {
        return res.status(404).send({ error: `Venue not found` })
    }
    res.send(foundVenue)
}
// UPDATE
exports.editById = (req, res) => {

}
// DELETE
exports.deleteById = (req, res) => {
    if (venues.delete(req.params.id) === undefined) {
        return res.status(404).send({ error: "Venue not found" })
    }
    res.status(204).send()
}
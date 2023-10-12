const events = require("../events/data")
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = (req, res) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ error: "One or all required parameters are missing" })
    }
    const createdEvent = events.create({
        name: req.body.name,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    })
    res.status(201)
        .location(`${getBaseurl(req)}/events/${createdEvent.id}`)
        .send(createdEvent)
}
// READ
exports.getAll = (req, res) => {
    res.send(events.getAll())
}
exports.getById = (req, res) => {
    const foundEvent = events.getById(req.params.id)
    if (foundEvent === undefined) {
        return res.status(404).send({ error: `Event not found` })
    }
    res.send(foundEvent)
}
// UPDATE
exports.editById = (req, res) => {

}
// DELETE
exports.deleteById = (req, res) => {
    if (events.delete(req.params.id) === undefined) {
        return res.status(404).send({ error: "Event not found" })
    }
    res.status(204).send()
}
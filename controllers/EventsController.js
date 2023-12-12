const { db } = require("../db")
const events = db.events
const { getBaseurl } = require("./helpers")


const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];
};

// CREATE
exports.createNew = async (req, res) => {
    if (!req.body.name || !req.body.description || !req.body.startDate || !req.body.endDate || !req.body.VenueId ) {
        return res.status(400).send({ error: "One or all required parameters are missing" })
    }
    const createdEvent = await events.create(req.body, {
        fields: ["name", "description", "startDate", "endDate", "VenueId"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/events/${createdEvent.id}`)
        .json(createdEvent)
}

// READ
exports.getAll = async (req, res) => {
    const result = await events.findAll({ 
        include: [db.venues]
    })
    res.json(result)
}

exports.getById = async (req, res) => {
    const foundEvent = await events.findByPk(req.params.id,{
        include: [db.venues]
    })
    if (foundEvent === null) {
        return res.status(404).send({ error: 'Event not found`'})
    }
    res.send(foundEvent)
}
// UPDATE
exports.editById = async (req, res) => {
    console.log("Update: ", req.params, req.body)
    const updateResult = await events.update({ ...req.body}, {
        where: {id:req.body.id},
        fields: ["name", "description", "startDate", "endDate", "VenueId"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ error: "Event not found" })
    }

    res.status(200)
        .location(`${getBaseurl(req)}/events/${req.params.id}`)
        .send()
}

// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await events.destroy({
        where: {id: req.params.id } 
    })

    if (deletedAmount === 0) {
        return res.status(404).send({ error: "Event not found"})
    }

    res.status(204).send()
}
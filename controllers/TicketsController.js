const { db } = require("../db")
const tickets = db.tickets
const events = db.events
const { getBaseurl } = require("./helpers")


// CREATE
exports.createNew = async (req, res) => {
    if (!req.body.price || !req.body.purchaseDate || !req.body.EventId ) {
        return res.status(400).send({ error: "One or all required parameters are missing" })
    }
    const eventExists = await events.findOne({
        where: {
            id: req.body.EventId,
        },
    });

    if (!eventExists) {
        return res.status(404).send({ error: "Event with the specified EventId does not exist" });
    }
    const createdTicket = await tickets.create(req.body, {
        fields: ["price", "purchaseDate", "EventId"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/tickets/${createdTicket.id}`)
        .json(createdTicket)
}

// READ
exports.getAll = async (req, res) => {
    const result = await tickets.findAll({ 
        include: [db.events]
    })
    res.json(result)
}

exports.getById = async (req, res) => {
    const foundTicket = await tickets.findByPk(req.params.id,{
        include: [db.events]
    })
    if (foundTicket === null) {
        return res.status(404).send({ error: 'Ticket not found`'})
    }
    res.send(foundTicket)
}
// UPDATE
exports.editById = async (req, res) => {
    console.log("Update: ", req.params, req.body)
    const updateResult = await tickets.update({ ...req.body}, {
        where: {id:req.body.id},
        fields: ["price", "purchaseDate", "EventId"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ error: "Ticket not found" })
    }

    res.status(200)
        .location(`${getBaseurl(req)}/tickets/${req.params.id}`)
        .send()
}

// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await tickets.destroy({
        where: {id: req.params.id } 
    })

    if (deletedAmount === 0) {
        return res.status(404).send({ error: "Ticket not found"})
    }

    res.status(204).send()
}
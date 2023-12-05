// TicketsController.js
const { db } = require("../db");
const tickets = db.tickets;
const { getBaseurl } = require("./helpers");

// CREATE
exports.createNew = async (req, res) => {
    if (!req.body.price || !req.body.purchaseDate || !req.body.EventId || !req.body.CustomerId) {
        return res.status(400).send({ error: "One or all required parameters are missing" });
    }

    try {
        const createdTicket = await tickets.create({
            price: req.body.price,
            purchaseDate: req.body.purchaseDate,
            EventId: req.body.EventId,
            CustomerId: req.body.CustomerId
        });

        res.status(201)
            .location(`${getBaseurl(req)}/tickets/${createdTicket.id}`)
            .json(createdTicket);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

// READ
exports.getAll = async (req, res) => {
    try {
        const result = await tickets.findAll({
            include: [db.events, db.customers]
        });

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

exports.getById = async (req, res) => {
    try {
        const foundTicket = await tickets.findByPk(req.params.id);

        if (!foundTicket) {
            return res.status(404).send({ error: "Ticket not found" });
        }

        res.json(foundTicket);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

// UPDATE
exports.editById = async (req, res) => {
    try {
        const updateResult = await tickets.update({ ...req.body }, {
            where: { id: req.params.id },
            fields: ["price", "purchaseDate"]
        });

        if (updateResult[0] === 0) {
            return res.status(404).send({ error: "Ticket not found" });
        }

        res.status(204)
            .location(`${getBaseurl(req)}/tickets/${req.params.id}`)
            .send();
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

// DELETE
exports.deleteById = async (req, res) => {
    try {
        const deletedAmount = await tickets.destroy({
            where: { id: req.params.id }
        });

        if (deletedAmount === 0) {
            return res.status(404).send({ error: "Ticket not found" });
        }

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

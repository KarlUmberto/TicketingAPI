const { db } = require("../db");
const customers = db.customers;
const { getBaseurl } = require("./helpers");

// CREATE
exports.createNew = async (req, res) => {
    if (!req.body.name || !req.body.email) {
        return res.status(400).send({ error: "One or all required parameters are missing" });
    }

    try {
        const createdCustomer = await customers.create({
            name: req.body.name,
            email: req.body.email
        });

        res.status(201)
            .location(`${getBaseurl(req)}/customers/${createdCustomer.id}`)
            .json(createdCustomer);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

// READ
exports.getAll = async (req, res) => {
    try {
        const result = await customers.findAll({ attributes: ["id", "name", "email"] });
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

exports.getById = async (req, res) => {
    try {
        const foundCustomer = await customers.findByPk(req.params.id);

        if (!foundCustomer) {
            return res.status(404).send({ error: "Customer not found" });
        }

        res.json(foundCustomer);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

// UPDATE
exports.editById = async (req, res) => {
    try {
        const updateResult = await customers.update({ ...req.body }, {
            where: { id: req.params.id },
            fields: ["name", "email"]
        });

        if (updateResult[0] === 0) {
            return res.status(404).send({ error: "Customer not found" });
        }

        res.status(204)
            .location(`${getBaseurl(req)}/customers/${req.params.id}`)
            .send();
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

// DELETE
exports.deleteById = async (req, res) => {
    try {
        const deletedAmount = await customers.destroy({
            where: { id: req.params.id }
        });

        if (deletedAmount === 0) {
            return res.status(404).send({ error: "Customer not found" });
        }

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

const customerController = require("../controllers/CustomersController.js")
module.exports = (app) => {
    app.route("/customers")
        .get(customerController.getAll)
        .post(customerController.createNew)      // Create
    app.route("/customers/:id")
        .get(customerController.getById)         // Read
        .put(customerController.editById)        // Update
        .delete(customerController.deleteById)   // Delete
} 
const ticketController = require("../controllers/TicketsController.js")
module.exports = (app) => {
    app.route("/tickets")
        .get(ticketController.getAll)
        .post(ticketController.createNew)      // Create
    app.route("/tickets/:id")
        .get(ticketController.getById)         // Read
        .put(ticketController.editById)        // Update
        .delete(ticketController.deleteById)   // Delete
}
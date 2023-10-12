const venuesController = require("../TicketingAPI/controllers/venueController.js")
module.exports = (app) => {
    app.route("/venues")
        .get(venuesController.getAll)
        .post(venuesController.createNew)      // Create
    app.route("/venues/:id")
        .get(venuesController.getById)         // Read
        .put(venuesController.editById)        // Update
        .delete(venuesController.deleteById)   // Delete
}
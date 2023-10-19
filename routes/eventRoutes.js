const eventsController = require("../controllers/EventsController.js")
module.exports = (app) => {
    app.route("/events")
        .get(eventsController.getAll)
        .post(eventsController.createNew)      // Create
    app.route("/events/:id")
        .get(eventsController.getById)         // Read
        .put(eventsController.editById)        // Update
        .delete(eventsController.deleteById)   // Delete
} 
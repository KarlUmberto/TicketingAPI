const { Sequelize } = require("sequelize")
const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mariadb",
    define: {
        timestamps: true
    },
    logging: console.log
})
try {
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
const db = {}
db.Sequelize = Sequelize
db.connection = sequelize
db.venues = require("./models/Venue")(sequelize, Sequelize)
db.events = require("./models/Event")(sequelize, Sequelize)
db.customers = require("./models/Customer")(sequelize, Sequelize)
db.tickets = require("./models/Ticket")(sequelize, Sequelize, db.events)

db.events.hasMany(db.tickets)
db.tickets.belongsTo(db.events)



sync = async () => {
    if (process.env.DROP_DB === "true") {
        console.log("Begin DROP")
        await db.connection.query('SET FOREIGN_KEY_CHECKS = 0')
        console.log("Checks disabled")
        await db.connection.sync({ force: true })
        console.log('Database synchronised.')
        await db.connection.query('SET FOREIGN_KEY_CHECKS = 1')
        console.log("Checks enabled")

        const [venue, createdG] = await db.venues.findOrCreate({
            where: {
                name: "D3"
            },
            defaults: {
                name: "D3",
                location: "Telliskivi 62/2",
                capacity: 1500,
            }
        })
        console.log("venue created: ", createdG)
        const [event, createdP] = await db.events.findOrCreate({
            where: {
                name: "Project X"
            },
            defaults: {
                name: "Project X",
                description: "Halb pidu",
                startDate: 10/20/2002,
                endDate: 11/20/2002,
            }
        })
        // console.log("event created: ", createdP)
        // const [venuePlay, createdGP] = await db.venuePlays.findOrCreate({
        //     where: {
        //         id: 1
        //     },
        //     defaults: {
        //         EventId: event.id,
        //         VenueId: venue.id,
        //         playtime: 55
        //     }
        // })
        // console.log("venuePlay created: ", createdGP)
    }
    else {
        console.log("Begin ALTER")
        await db.connection.sync({ alter: true }) // Alter existing to match the model
        console.log('Database synchronised.')
    }
}

module.exports = { db, sync }
const { Sequelize } = require("sequelize")
const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mariadb",
    define: {
        timestamps: true
    },
    logging: false // console.log
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
db.tickets = require("./models/Ticket")(sequelize, Sequelize, db.events, db.customers)

db.events.belongsToMany(db.customers, { through: db.tickets })
db.customers.belongsToMany(db.events, { through: db.tickets })
db.events.hasMany(db.tickets)
db.customers.hasMany(db.tickets)
db.tickets.belongsTo(db.events)
db.tickets.belongsTo(db.events)


sync = async () => {
    //await sequelize.sync({ force: true }) // Erase all and recreate
    await sequelize.sync({ alter: true }) // Alter existing to match the model
}

module.exports = { db, sync }
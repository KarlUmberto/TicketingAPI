module.exports = (dbConnection, Sequelize) => {
    const Venue = dbConnection.define("Venue", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false
        },
        capacity: {
            type: Sequelize.INTEGER
        }

    })
    return Venue
}
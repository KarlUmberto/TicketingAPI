module.exports = (dbConnection, Sequelize, Venue) => {
    const Event = dbConnection.define("Event", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        endDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        VenueId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Venue,
                key: "id"
            }
        }

    })
    return Event
}
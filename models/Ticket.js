module.exports = (dbConnection, Sequelize, Event, Customer) => {
    const Ticket = dbConnection.define("Ticket", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false    
        },
        purchaseDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        EventId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Event,
                key: "id"
            }
        },
        CustomerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Customer,
                key: "id"
            }
        },
    });

    // Associate Ticket with Event and Customer
    Ticket.belongsTo(Event);
    Ticket.belongsTo(Customer);

    return Ticket;
};

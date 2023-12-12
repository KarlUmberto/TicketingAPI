module.exports = (dbConnection, Sequelize, Ticket) => {
    const Customer = dbConnection.define("Customer", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        TicketId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Ticket,
                key: "id"
            }
        },
    });

    return Customer;
};

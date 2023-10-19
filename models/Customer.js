module.exports = (dbConnection, Sequelize) => {
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
        }
    })
    return Customer
}